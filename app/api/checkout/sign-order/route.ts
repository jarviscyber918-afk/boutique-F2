// app/api/checkout/sign-order/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { buildVerifiedOrder } from "@/lib/security";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { logSecurityEvent } from "@/lib/logger";
import { STORE_CONFIG } from "@/lib/products";
import { Language, TRANSLATIONS } from "@/lib/translations";

const OrderItemSchema = z.object({
  productId: z.string().min(1).max(50),
  selectedColor: z.string().min(1).max(50),
  selectedSize: z.string().min(1).max(20),
  quantity: z.number().int().min(1).max(10),
  clientPriceDZD: z.number().positive().optional(),
});

const SignOrderRequestSchema = z.object({
  items: z.array(OrderItemSchema).min(1).max(20),
  orderDetails: z
    .object({
      customerName: z.string().max(100).optional(),
      phone: z.string().max(30).optional(),
      city: z.string().max(100).optional(),
      shippingAddress: z.string().max(250).optional(),
      notes: z.string().max(300).optional(),
    })
    .optional(),
  language: z.enum(["fr", "ar", "en"]).default("fr"),
});

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const userAgent = req.headers.get("user-agent") || "unknown";

  // 1. Rate Limiting Check (15 order signings per minute per IP)
  const rateLimit = checkRateLimit(`sign-order:${ip}`, { limit: 15, windowMs: 60 * 1000 });
  if (!rateLimit.success) {
    logSecurityEvent({
      level: "WARN",
      event: "RATE_LIMIT_EXCEEDED",
      ip,
      userAgent,
      details: { route: "/api/checkout/sign-order", limit: rateLimit.limit },
    });
    return NextResponse.json(
      { error: "Too many checkout requests. Please wait a moment." },
      {
        status: 429,
        headers: {
          "Retry-After": "60",
          "X-RateLimit-Limit": rateLimit.limit.toString(),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  try {
    // 2. Body Parsing & Zod Schema Validation
    const rawBody = await req.json();
    const parseResult = SignOrderRequestSchema.safeParse(rawBody);

    if (!parseResult.success) {
      logSecurityEvent({
        level: "WARN",
        event: "INVALID_ORDER_PAYLOAD",
        ip,
        userAgent,
        details: { errors: parseResult.error.flatten() },
      });
      return NextResponse.json(
        { error: "Invalid order parameters.", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const { items, orderDetails, language } = parseResult.data;

    // 3. Compute Canonical Prices & Generate Cryptographic HMAC Signature
    const verifiedOrder = buildVerifiedOrder(items);

    if (verifiedOrder.tamperingDetected) {
      logSecurityEvent({
        level: "SECURITY_ALERT",
        event: "PRICE_TAMPERING_ATTEMPT_BLOCKED",
        ip,
        userAgent,
        details: {
          warnings: verifiedOrder.warnings,
          submittedItems: items,
          canonicalTotalDZD: verifiedOrder.totalDZD,
        },
      });
    } else {
      logSecurityEvent({
        level: "AUDIT",
        event: "ORDER_SIGNED",
        ip,
        userAgent,
        details: {
          orderId: verifiedOrder.orderId,
          signature: verifiedOrder.signature,
          totalDZD: verifiedOrder.totalDZD,
          itemCount: verifiedOrder.items.length,
        },
      });
    }

    // 4. Construct Authenticated WhatsApp URL with Server Signature
    const t = TRANSLATIONS[language as Language]?.whatsapp || TRANSLATIONS.fr.whatsapp;
    const cleanPhone = STORE_CONFIG.whatsAppPhone.replace(/[^0-9]/g, "");

    let message = "";
    if (verifiedOrder.items.length === 1) {
      const item = verifiedOrder.items[0];
      message = `*🔥 ${t.directOrderTitle}*\n`;
      message += `*${t.refLabel}* ${verifiedOrder.orderId} | *Sig:* ${verifiedOrder.signature}\n\n`;
      message += `*${t.itemLabel}* ${item.name}\n`;
      message += `*${t.sizeLabel}* ${item.selectedSize} | *${t.colorLabel}* ${item.selectedColor}\n`;
      message += `*Qte:* ${item.quantity}\n`;
      message += `*${t.priceLabel}* ${(item.serverPriceDZD * item.quantity).toLocaleString()} DZD (~${(item.serverPriceEUR * item.quantity).toFixed(0)} €)\n\n`;
      message += `⚡ _${t.confirmRequest}_`;
    } else {
      message = `*🔥 ${t.cartOrderTitle}: ${verifiedOrder.orderId}*\n`;
      message += `*🔒 Verification Sig:* \`${verifiedOrder.signature}\`\n\n`;
      message += `*══════ ${t.cartDetailsTitle} ══════*\n`;

      verifiedOrder.items.forEach((item, index) => {
        message += `*${index + 1}. ${item.name}*\n`;
        message += `   • ${t.sizeLabel} *${item.selectedSize}* | ${t.colorLabel} *${item.selectedColor}*\n`;
        message += `   • Qte: *${item.quantity}* × ${item.serverPriceDZD.toLocaleString()} DZD\n`;
        message += `   • Total: *${(item.serverPriceDZD * item.quantity).toLocaleString()} DZD*\n\n`;
      });

      message += `*════════ ${t.totalOrderTitle} ════════*\n`;
      message += `*Sous-total:* ${verifiedOrder.subtotalDZD.toLocaleString()} DZD\n`;
      message += `*Livraison:* ${verifiedOrder.deliveryFeeDZD === 0 ? "Gratuite (58 Wilayas)" : "600 DZD"}\n`;
      message += `*Total Réel:* *${verifiedOrder.totalDZD.toLocaleString()} DZD* (~${verifiedOrder.totalEUR} €)\n\n`;

      if (orderDetails) {
        message += `*═════ ${t.clientDetailsTitle} ═════*\n`;
        if (orderDetails.customerName) message += `*Nom / الاسم:* ${orderDetails.customerName}\n`;
        if (orderDetails.phone) message += `*Tél / الهاتف:* ${orderDetails.phone}\n`;
        if (orderDetails.city) message += `*Ville / الولاية:* ${orderDetails.city}\n`;
        if (orderDetails.shippingAddress) message += `*Adresse / العنوان:* ${orderDetails.shippingAddress}\n`;
        if (orderDetails.notes) message += `*Note / ملاحظة:* ${orderDetails.notes}\n\n`;
      }

      message += `⚡ _${t.confirmRequest}_`;
    }

    const whatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

    return NextResponse.json(
      {
        success: true,
        orderId: verifiedOrder.orderId,
        signature: verifiedOrder.signature,
        timestamp: verifiedOrder.timestamp,
        totalDZD: verifiedOrder.totalDZD,
        subtotalDZD: verifiedOrder.subtotalDZD,
        deliveryFeeDZD: verifiedOrder.deliveryFeeDZD,
        totalEUR: verifiedOrder.totalEUR,
        items: verifiedOrder.items,
        whatsAppUrl,
        tamperingDetected: verifiedOrder.tamperingDetected,
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": rateLimit.limit.toString(),
          "X-RateLimit-Remaining": rateLimit.remaining.toString(),
        },
      }
    );
  } catch (err) {
    logSecurityEvent({
      level: "ERROR",
      event: "SIGN_ORDER_EXCEPTION",
      ip,
      userAgent,
      details: { error: err instanceof Error ? err.message : String(err) },
    });
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
