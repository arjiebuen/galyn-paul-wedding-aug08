import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendRSVPSummaryEmail, type RSVPSummary, type RSVPSummaryEntry } from "@/lib/email";

// This route is protected by a CRON secret so it can only be triggered
// by Vercel Cron Jobs (or an authorized client with the secret).
export async function GET(req: Request) {
  try {
    // Verify the cron secret to prevent unauthorized access.
    const secret = process.env.CRON_SECRET;
    const authHeader = req.headers.get("authorization");

    if (secret && authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // Fetch all RSVP records from the database.
    const { data: rows, error } = await supabase
      .from("rsvps")
      .select("full_name, email, attending, guests, message, created_at, updated_at, changed_from")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Summary fetch error:", JSON.stringify(error));
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    const entries: RSVPSummaryEntry[] = (rows ?? []) as RSVPSummaryEntry[];

    // Compute totals
    const accepted = entries.filter((e) => e.attending === true).length;
    const declined = entries.filter((e) => e.attending === false).length;
    const totalGuests = entries
      .filter((e) => e.attending === true)
      .reduce((sum, e) => sum + (e.guests ?? 1), 0);

    // Detect duplicates by email (multiple rows with same email)
    const emailCount = new Map<string, number>();
    entries.forEach((e) => {
      emailCount.set(e.email, (emailCount.get(e.email) ?? 0) + 1);
    });

    const duplicates = Array.from(emailCount.entries())
      .filter(([, count]) => count > 1)
      .map(([email, count]) => {
        const row = entries.find((e) => e.email === email);
        return { full_name: row?.full_name ?? "", email, count };
      });

    // Detect status changes (changed_from populated means the guest changed their response)
    const statusChanges = entries
      .filter((e) => e.changed_from !== null && e.changed_from !== undefined)
      .map((e) => ({
        full_name: e.full_name,
        email: e.email,
        from: e.changed_from ? "Accepted" : "Declined",
        to: e.attending ? "Accepted" : "Declined",
      }));

    const summary: RSVPSummary = {
      total: entries.length,
      accepted,
      declined,
      totalGuests,
      statusChanges,
      duplicates,
      entries,
    };

    // Send the summary email to the owner (Galyn).
    const emailResult = await sendRSVPSummaryEmail(summary);

    if (!emailResult.success) {
      console.warn("Summary email failed to send:", emailResult.error);
      return NextResponse.json(
        { success: false, error: "Summary email failed to send" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, summary });
  } catch (error) {
    console.error("Summary Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
