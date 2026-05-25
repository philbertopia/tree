import { NextResponse } from "next/server";

type RateLimitConfig = {
  key: string;
  limit: number;
  windowMs: number;
};

const buckets = new Map<string, { count: number; resetAt: number }>();

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const vercelIp = request.headers.get("x-vercel-forwarded-for");
  return (forwardedFor || vercelIp || realIp || "unknown").split(",")[0]?.trim() || "unknown";
}

export function rateLimit({ key, limit, windowMs }: RateLimitConfig) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (bucket.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: bucket.resetAt };
  }

  bucket.count += 1;
  return { allowed: true, remaining: limit - bucket.count, resetAt: bucket.resetAt };
}

export function rateLimitResponse(resetAt: number) {
  const retryAfter = Math.max(1, Math.ceil((resetAt - Date.now()) / 1000));
  return NextResponse.json(
    { ok: false, error: "Too many requests. Please wait a moment and try again." },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfter)
      }
    }
  );
}

export async function readLimitedJson<T>(request: Request, maxBytes: number): Promise<T> {
  const text = await request.text();

  if (new TextEncoder().encode(text).length > maxBytes) {
    throw new RequestBodyTooLargeError();
  }

  return JSON.parse(text) as T;
}

export function textField(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

export function redactedEmail(value: string) {
  const [name = "", domain = ""] = value.split("@");
  if (!name || !domain) return "invalid-email";
  return `${name.slice(0, 2)}***@${domain}`;
}

export class RequestBodyTooLargeError extends Error {
  constructor() {
    super("Request body too large");
  }
}
