// lib/whatsapp.ts
import { Language, TRANSLATIONS } from "./translations";
import { buildVerifiedOrder } from "./security";
import { STORE_CONFIG } from "./products";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  sku: string;
  selectedColor: string;
  selectedSize: string;
  priceDZD: number;
  priceEUR: number;
  quantity: number;
  image: string;
}

export interface CustomerOrderDetails {
  customerName?: string;
  phone?: string;
  shippingAddress?: string;
  city?: string;
  notes?: string;
}

// 1-Click Direct Card WhatsApp Order with Cryptographic Anti-Tampering Signature
export function generateSingleItemWhatsAppUrl(
  phoneNumber: string,
  productName: string,
  size: string,
  color: string,
  priceDZD: number,
  priceEUR: number,
  lang: Language = "fr",
  productId?: string
): string {
  const t = TRANSLATIONS[lang]?.whatsapp || TRANSLATIONS.fr.whatsapp;

  // Canonical server price resolution & cryptographic signature
  const verified = buildVerifiedOrder([
    {
      productId: productId || "",
      selectedColor: color,
      selectedSize: size,
      quantity: 1,
      clientPriceDZD: priceDZD,
    },
  ]);

  const item = verified.items[0];
  const canonicalName = item?.name || productName;
  const canonicalPriceDZD = item?.serverPriceDZD || priceDZD;
  const canonicalPriceEUR = item?.serverPriceEUR || priceEUR;

  let message = `*🔥 ${t.directOrderTitle}*\n`;
  message += `*${t.refLabel}* ${verified.orderId} | *Sig:* \`${verified.signature}\`\n\n`;
  message += `*${t.itemLabel}* ${canonicalName}\n`;
  message += `*${t.sizeLabel}* ${size} | *${t.colorLabel}* ${color}\n`;
  message += `*${t.priceLabel}* ${canonicalPriceDZD.toLocaleString()} DZD (${canonicalPriceEUR} €)\n\n`;
  message += `⚡ _${t.confirmRequest}_`;

  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

// Multi-item cart checkout with Cryptographic Signature and Language Support
export function generateWhatsAppCheckoutUrl(
  phoneNumber: string,
  items: CartItem[],
  orderDetails?: CustomerOrderDetails,
  lang: Language = "fr"
): string {
  const t = TRANSLATIONS[lang]?.whatsapp || TRANSLATIONS.fr.whatsapp;

  // Enforce canonical price calculation & anti-tampering signature
  const verified = buildVerifiedOrder(
    items.map((i) => ({
      productId: i.productId,
      selectedColor: i.selectedColor,
      selectedSize: i.selectedSize,
      quantity: i.quantity,
      clientPriceDZD: i.priceDZD,
    }))
  );

  const now = new Date();
  const locale = lang === "ar" ? "ar-DZ" : lang === "en" ? "en-US" : "fr-FR";
  const timestamp =
    now.toLocaleDateString(locale, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }) +
    " · " +
    now.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
    });

  let message = `*🔥 ${t.cartOrderTitle}: ${verified.orderId}*\n`;
  message += `*🔒 Verification Sig:* \`${verified.signature}\`\n`;
  message += `_Date: ${timestamp}_\n\n`;
  message += `*══════ ${t.cartDetailsTitle} ══════*\n`;

  verified.items.forEach((item, index) => {
    message += `*${index + 1}. ${item.name}*\n`;
    message += `   • ${t.sizeLabel} *${item.selectedSize}* | ${t.colorLabel} *${item.selectedColor}*\n`;
    message += `   • Qte: *${item.quantity}* × ${item.serverPriceDZD.toLocaleString()} DZD\n`;
    message += `   • Total: *${(item.serverPriceDZD * item.quantity).toLocaleString()} DZD*\n\n`;
  });

  message += `*════════ ${t.totalOrderTitle} ════════*\n`;
  message += `*Sous-total:* ${verified.subtotalDZD.toLocaleString()} DZD\n`;
  message += `*Livraison:* ${verified.deliveryFeeDZD === 0 ? "Gratuite (58 Wilayas)" : "600 DZD"}\n`;
  message += `*Total Réel:* *${verified.totalDZD.toLocaleString()} DZD* (~${verified.totalEUR} €)\n\n`;

  if (
    orderDetails?.customerName ||
    orderDetails?.phone ||
    orderDetails?.shippingAddress ||
    orderDetails?.city ||
    orderDetails?.notes
  ) {
    message += `*═════ ${t.clientDetailsTitle} ═════*\n`;
    if (orderDetails.customerName) message += `*Nom / الاسم:* ${orderDetails.customerName}\n`;
    if (orderDetails.phone) message += `*Tél / الهاتف:* ${orderDetails.phone}\n`;
    if (orderDetails.city) message += `*Ville / الولاية:* ${orderDetails.city}\n`;
    if (orderDetails.shippingAddress) message += `*Adresse / العنوان:* ${orderDetails.shippingAddress}\n`;
    if (orderDetails.notes) message += `*Note / ملاحظة:* ${orderDetails.notes}\n\n`;
  }

  message += `⚡ _${t.confirmRequest}_`;

  const cleanPhone = (phoneNumber || STORE_CONFIG.whatsAppPhone).replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function formatOrderSummaryText(
  items: CartItem[],
  orderDetails?: CustomerOrderDetails,
  lang: Language = "fr"
): string {
  const t = TRANSLATIONS[lang]?.whatsapp || TRANSLATIONS.fr.whatsapp;
  const verified = buildVerifiedOrder(
    items.map((i) => ({
      productId: i.productId,
      selectedColor: i.selectedColor,
      selectedSize: i.selectedSize,
      quantity: i.quantity,
      clientPriceDZD: i.priceDZD,
    }))
  );

  let text = `COMMANDE RÉF: ${verified.orderId} | SIG: ${verified.signature}\n`;
  text += `TOTAL: ${verified.totalDZD.toLocaleString()} DZD\n\n`;
  verified.items.forEach((item, index) => {
    text += `${index + 1}. ${item.name} (${item.selectedSize} / ${item.selectedColor}) x${item.quantity} - ${(item.serverPriceDZD * item.quantity).toLocaleString()} DZD\n`;
  });

  if (orderDetails?.customerName) {
    text += `\nClient: ${orderDetails.customerName}`;
    if (orderDetails.city) text += `, ${orderDetails.city}`;
    if (orderDetails.shippingAddress) text += ` (${orderDetails.shippingAddress})`;
  }

  return text;
}
