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

    const now = new Date().toISOString();

    // 1. Check if this guest already submitted an RSVP (by email)
    const { data: existing, error: fetchError } = await supabase
      .from("rsvps")
      .select("id, attending")
      .eq("email", email)
      .maybeSingle();

    if (fetchError) {
      console.error("Supabase fetch error:", JSON.stringify(fetchError));
      return NextResponse.json(
        { success: false, error: fetchError.message },
        { status: 500 }
      );
    }

    let data;
    let responseChanged = false;

    if (existing) {
      // Guest already responded — UPDATE their response instead of creating a duplicate.
      // Track whether their attending status changed (e.g. declined -> accepted).
      const statusChanged = existing.attending !== attending;
      const { data: updated, error: updateError } = await supabase
        .from("rsvps")
        .update({
          full_name: fullName,
          attending,
          guests,
          message: message || null,
          updated_at: now,
          changed_from: statusChanged ? existing.attending : null,
        })
        .eq("id", existing.id)
        .select()
        .single();

      if (updateError) {
        console.error("Supabase update error:", JSON.stringify(updateError));
        return NextResponse.json(
          { success: false, error: updateError.message },
          { status: 500 }
        );
      }
      data = updated;
      responseChanged = statusChanged;
    } else {
      // New guest — INSERT a new record
      const { data: inserted, error: insertError } = await supabase
        .from("rsvps")
        .insert([
          {
            full_name: fullName,
            email,
            attending,
            guests,
            message: message || null,
            created_at: now,
            updated_at: now,
          },
        ])
        .select()
        .single();

      if (insertError) {
        console.error("Supabase insert error:", JSON.stringify(insertError));
        return NextResponse.json(
          { success: false, error: insertError.message },
          { status: 500 }
        );
      }
      data = inserted;
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
        isUpdate: !!existing,
        statusChanged: responseChanged,
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
