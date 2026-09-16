// lib/security.ts
import crypto from "crypto";
import { PRODUCTS, Product, STORE_CONFIG } from "./products";

// Fallback secure salt if ORDER_SIGNING_SECRET is not configured in env
const SERVER_SIGNING_SECRET =
  process.env.ORDER_SIGNING_SECRET ||
  "boutique_sec_d894f71a93b26c04f98127390a1b8c2d_drop04";

/**
 * Sanitize untrusted text input (Arabic, French, English)
 * - Limits length
 * - Strips dangerous HTML tags and script injections
 * - Normalizes Unicode diacritics
 * - Strips control characters
 */
export function sanitizeSearchQuery(input: string, maxLength: number = 100): string {
  if (!input || typeof input !== "string") return "";

  return input
    .normalize("NFC")
    .replace(/[<>'"`;(){}[\]\\/]/g, "") // Remove XSS injection characters
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Remove control characters
    .trim()
    .slice(0, maxLength);
}

/**
 * Sanitize general form string values
 */
export function sanitizeString(input: string, maxLength: number = 200): string {
  if (!input || typeof input !== "string") return "";

  return input
    .normalize("NFC")
    .replace(/[<>'"`;]/g, "")
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
    .trim()
    .slice(0, maxLength);
}

export interface CanonicalOrderItem {
  productId: string;
  name: string;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  serverPriceDZD: number;
  serverPriceEUR: number;
}

export interface VerifiedOrderResult {
  orderId: string;
  signature: string;
  timestamp: number;
  items: CanonicalOrderItem[];
  subtotalDZD: number;
  deliveryFeeDZD: number;
  totalDZD: number;
  totalEUR: number;
  tamperingDetected: boolean;
  warnings: string[];
}

/**
 * Validate and compute canonical prices strictly from server-side product catalog
 */
export function buildVerifiedOrder(
  submittedItems: Array<{
    productId: string;
    selectedColor: string;
    selectedSize: string;
    quantity: number;
    clientPriceDZD?: number;
  }>,
  customOrderId?: string
): VerifiedOrderResult {
  const orderId =
    customOrderId && /^DROP-\d{6}$/.test(customOrderId)
      ? customOrderId
      : `DROP-${Math.floor(100000 + Math.random() * 900000)}`;

  const canonicalItems: CanonicalOrderItem[] = [];
  let tamperingDetected = false;
  const warnings: string[] = [];

  for (const item of submittedItems) {
    const product = PRODUCTS.find((p) => p.id === item.productId);

    if (!product) {
      warnings.push(`Unknown product ID: ${item.productId}`);
      continue;
    }

    // Sanitize quantity (min 1, max 10 to prevent inventory hoarding)
    const validQty = Math.max(1, Math.min(10, Math.floor(Number(item.quantity) || 1)));

    // Verify color validity
    const colorExists = product.colors.some((c) => c.name === item.selectedColor);
    const validColor = colorExists ? item.selectedColor : product.colors[0]?.name || "Default";

    // Verify size validity
    const sizeExists = product.sizes.includes(item.selectedSize);
    const validSize = sizeExists ? item.selectedSize : product.sizes[0] || "Standard";

    // Detect price tampering if client provided a manipulated price
    if (
      item.clientPriceDZD !== undefined &&
      Math.abs(item.clientPriceDZD - product.priceDZD) > 0.01
    ) {
      tamperingDetected = true;
      warnings.push(
        `Price mismatch for ${product.name}: client sent ${item.clientPriceDZD} DZD, server canonical is ${product.priceDZD} DZD`
      );
    }

    canonicalItems.push({
      productId: product.id,
      name: product.name,
      selectedColor: validColor,
      selectedSize: validSize,
      quantity: validQty,
      serverPriceDZD: product.priceDZD,
      serverPriceEUR: product.priceEUR,
    });
  }

  const subtotalDZD = canonicalItems.reduce(
    (sum, item) => sum + item.serverPriceDZD * item.quantity,
    0
  );
  const totalEUR = canonicalItems.reduce(
    (sum, item) => sum + item.serverPriceEUR * item.quantity,
    0
  );

  const deliveryFeeDZD =
    subtotalDZD >= STORE_CONFIG.freeShippingThresholdDZD || subtotalDZD === 0 ? 0 : 600;
  const totalDZD = subtotalDZD + deliveryFeeDZD;
  const timestamp = Date.now();

  // Generate HMAC-SHA256 signature binding the order items, prices, and timestamp
  const signaturePayload = [
    orderId,
    timestamp,
    totalDZD,
    canonicalItems.map((i) => `${i.productId}:${i.selectedSize}:${i.quantity}:${i.serverPriceDZD}`).join("|"),
  ].join("::");

  const hmac = crypto.createHmac("sha256", SERVER_SIGNING_SECRET);
  hmac.update(signaturePayload);
  const signature = hmac.digest("hex").substring(0, 12); // Compact 12-char hex verification tag

  return {
    orderId,
    signature,
    timestamp,
    items: canonicalItems,
    subtotalDZD,
    deliveryFeeDZD,
    totalDZD,
    totalEUR,
    tamperingDetected,
    warnings,
  };
}

/**
 * Verify if an HMAC signature is authentic
 */
export function verifyOrderSignature(
  orderId: string,
  timestamp: number,
  totalDZD: number,
  itemFingerprint: string,
  signature: string
): boolean {
  try {
    const signaturePayload = [orderId, timestamp, totalDZD, itemFingerprint].join("::");
    const hmac = crypto.createHmac("sha256", SERVER_SIGNING_SECRET);
    hmac.update(signaturePayload);
    const expectedSig = hmac.digest("hex").substring(0, 12);

    return crypto.timingSafeEqual(
      Buffer.from(signature, "utf-8"),
      Buffer.from(expectedSig, "utf-8")
    );
  } catch {
    return false;
  }
}
