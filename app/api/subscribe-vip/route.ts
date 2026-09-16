// app/api/subscribe-vip/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { logSecurityEvent } from "@/lib/logger";
import { sanitizeString } from "@/lib/security";

const SubscribeVipSchema = z.object({
  phone: z
    .string()
    .min(6, "Phone number too short")
    .max(25, "Phone number too long")
    .regex(/^[0-9+\s().-]+$/, "Invalid phone format"),
});

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const userAgent = req.headers.get("user-agent") || "unknown";

  // Rate limit: 5 subscription attempts per 10 minutes per IP
  const rateLimit = checkRateLimit(`subscribe-vip:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!rateLimit.success) {
    logSecurityEvent({
      level: "WARN",
      event: "RATE_LIMIT_EXCEEDED",
      ip,
      userAgent,
      details: { route: "/api/subscribe-vip", limit: rateLimit.limit },
    });
    return NextResponse.json(
      { error: "Trop de tentatives. Veuillez patienter quelques minutes." },
      {
        status: 429,
        headers: {
          "Retry-After": "600",
          "X-RateLimit-Limit": rateLimit.limit.toString(),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  try {
    const rawBody = await req.json();
    const parseResult = SubscribeVipSchema.safeParse(rawBody);

    if (!parseResult.success) {
      logSecurityEvent({
        level: "WARN",
        event: "INVALID_VIP_SUBSCRIBE_PAYLOAD",
        ip,
        userAgent,
        details: { errors: parseResult.error.flatten() },
      });
      return NextResponse.json(
        { error: "Numéro de téléphone invalide." },
        { status: 400 }
      );
    }

    const sanitizedPhone = sanitizeString(parseResult.data.phone, 30);

    logSecurityEvent({
      level: "AUDIT",
      event: "VIP_ALERT_SUBSCRIBED",
      ip,
      userAgent,
      details: { phoneLength: sanitizedPhone.length },
    });

    return NextResponse.json(
      { success: true, message: "Inscription VIP confirmée." },
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
      event: "VIP_SUBSCRIBE_EXCEPTION",
      ip,
      userAgent,
      details: { error: err instanceof Error ? err.message : String(err) },
    });
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
