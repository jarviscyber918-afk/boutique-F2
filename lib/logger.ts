// lib/logger.ts

export type LogLevel = "INFO" | "WARN" | "ERROR" | "SECURITY_ALERT" | "AUDIT";

export interface SecurityLogPayload {
  level: LogLevel;
  event: string;
  ip?: string;
  userAgent?: string;
  details?: Record<string, unknown>;
  timestamp?: string;
}

// Redact sensitive patterns (credit cards, passwords, secret keys)
function sanitizeLogDetails(obj: unknown): unknown {
  if (!obj || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map(sanitizeLogDetails);
  }

  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    const lowerKey = key.toLowerCase();
    if (
      lowerKey.includes("password") ||
      lowerKey.includes("secret") ||
      lowerKey.includes("token") ||
      lowerKey.includes("authorization") ||
      lowerKey.includes("card") ||
      lowerKey.includes("cvv")
    ) {
      sanitized[key] = "[REDACTED]";
    } else if (typeof value === "object" && value !== null) {
      sanitized[key] = sanitizeLogDetails(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

export function logSecurityEvent({
  level,
  event,
  ip = "unknown",
  userAgent = "unknown",
  details = {},
}: SecurityLogPayload) {
  const timestamp = new Date().toISOString();
  const entry = {
    timestamp,
    level,
    event,
    ip,
    userAgent: userAgent.substring(0, 150),
    details: sanitizeLogDetails(details),
  };

  const jsonLog = JSON.stringify(entry);

  switch (level) {
    case "SECURITY_ALERT":
      console.warn(`🚨 [SECURITY_ALERT] ${jsonLog}`);
      break;
    case "ERROR":
      console.error(`❌ [ERROR] ${jsonLog}`);
      break;
    case "WARN":
      console.warn(`⚠️ [WARN] ${jsonLog}`);
      break;
    case "AUDIT":
      console.info(`🔒 [AUDIT] ${jsonLog}`);
      break;
    default:
      console.log(`ℹ️ [INFO] ${jsonLog}`);
  }
}
