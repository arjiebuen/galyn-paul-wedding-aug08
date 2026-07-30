import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendRSVPNotification } from "@/lib/email";
import { sanitizeName, sanitizeMessage } from "@/lib/sanitize";

// ─── Rate Limiting (in-memory store) ─────────────────────────────────────────
// WARNING: In-memory rate limiting resets on server restart. For production
// with multiple instances, use a distributed store like Redis or Upstash.
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // max 10 requests per window per IP
const requestCounts = new Map<string, { count: number; resetAt: number }>();

function getRateLimitInfo(ip: string): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now > record.resetAt) {
    // First request or window expired: reset
    requestCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetAt: record.resetAt };
  }

  record.count += 1;
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - record.count, resetAt: record.resetAt };
}

// ─── Request size limit ──────────────────────────────────────────────────────
const MAX_BODY_SIZE_BYTES = 10_240; // 10 KB — more than enough for an RSVP form

// ─── Allowed origins for CSRF protection ─────────────────────────────────────
function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  try {
    const url = new URL(origin);
    const allowedHosts = [
      "localhost",
      "paul-galyn-wedding.vercel.app",
      "paulgalynwedding.com",
      "www.paulgalynwedding.com",
    ];
    return allowedHosts.some(
      (host) => url.hostname === host || url.hostname.endsWith(`.${host}`)
    );
  } catch {
    return false;
  }
}

// ─── POST handler ────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    // ── 0. CSRF / Origin Check ─────────────────────────────────────────
    const origin = req.headers.get("origin");
    const referer = req.headers.get("referer");

    // In production, reject requests without a valid origin/referer (CSRF)
    if (process.env.NODE_ENV === "production") {
      const originOk = origin ? isAllowedOrigin(origin) : false;
      const refererOk = referer ? isAllowedOrigin(referer) : false;
      if (!originOk && !refererOk) {
        return NextResponse.json(
          { success: false, error: "Forbidden" },
          { status: 403 }
        );
      }
    }

    // ── 1. Rate limiting ───────────────────────────────────────────────
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const rateLimit = getRateLimitInfo(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": String(
              Math.ceil((rateLimit.resetAt - Date.now()) / 1000)
            ),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    // ── 2. Request body size check ─────────────────────────────────────
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE_BYTES) {
      return NextResponse.json(
        { success: false, error: "Request body too large" },
        { status: 413 }
      );
    }

    // ── 3. Parse & validate body ───────────────────────────────────────
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { fullName, email, attending, guests, message } = body as {
      fullName?: unknown;
      email?: unknown;
      attending?: unknown;
      guests?: unknown;
      message?: unknown;
    };

    // Validate required fields (type checking before sanitization)
    if (
      typeof fullName !== "string" ||
      typeof email !== "string" ||
      typeof attending !== "boolean" ||
      typeof guests !== "number"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing required fields: fullName (string), email (string), attending (boolean), guests (number)",
        },
        { status: 400 }
      );
    }

    // ── 4. Sanitize all user inputs BEFORE storage ─────────────────────
    const sanitizedFullName = sanitizeName(fullName, 100);
    const sanitizedEmail = email.trim().toLowerCase().slice(0, 254);
    const sanitizedGuests = Number.isFinite(guests)
      ? Math.max(1, Math.min(10, Math.round(guests)))
      : 1;
    const sanitizedMessage =
      typeof message === "string" && message.trim().length > 0
        ? sanitizeMessage(message, 1000)
        : null;

    // Double-check required fields after sanitization
    if (sanitizedFullName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Name must be at least 2 characters" },
        { status: 400 }
      );
    }

    // Validate email format after sanitization
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // ── 5. Store in Supabase ───────────────────────────────────────────
    const { data, error } = await supabase.from("rsvps").insert([
      {
        full_name: sanitizedFullName,
        email: sanitizedEmail,
        attending,
        guests: sanitizedGuests,
        message: sanitizedMessage,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", JSON.stringify(error));
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    // ── 6. Send email notification via Resend ──────────────────────────
    // Note: RSVP is saved regardless of email success — the email is a
    // notification to the couple.
    try {
      const emailResult = await sendRSVPNotification({
        fullName: sanitizedFullName,
        email: sanitizedEmail,
        attending,
        guests: sanitizedGuests,
        message: sanitizedMessage ?? undefined,
      });

      if (!emailResult.success) {
        console.warn(
          "Email notification failed, but RSVP was saved to database:",
          emailResult.error
        );
      }
    } catch (emailError) {
      // Don't fail the request if email fails — RSVP data is already saved
      console.error("Email notification error (non-fatal):", emailError);
    }

    return NextResponse.json(
      { success: true, data },
      {
        headers: {
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      }
    );
  } catch (error) {
    console.error("RSVP Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
