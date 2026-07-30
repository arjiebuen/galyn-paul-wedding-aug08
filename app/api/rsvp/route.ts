import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendRSVPNotification } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, attending, guests, message } = body;

    // Validate required fields
    if (!fullName || !email || typeof attending !== "boolean" || typeof guests !== "number") {
      return NextResponse.json(
        { success: false, error: "Missing required fields: fullName, attending, guests" },
        { status: 400 }
      );
    }

    // 1. Store in Supabase
    const { data, error } = await supabase.from("rsvps").insert([
      {
        full_name: fullName,
        attending,
        guests,
        message: message || null,
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

    // 2. Send email notification via Resend
    // Note: RSVP is saved regardless of email success — the email is a notification to the couple
    try {
      const emailResult = await sendRSVPNotification({
        fullName,
        email,
        attending,
        guests,
        message,
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

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("RSVP Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
