import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const notificationEmails = process.env.NOTIFICATION_EMAIL?.split(",").map((e) => e.trim()).filter(Boolean) ?? [];

let resend: Resend | null = null;
if (resendApiKey) resend = new Resend(resendApiKey);

interface RSVPNotification {
  fullName: string;
  email: string;
  attending: boolean;
  guests: number;
  message?: string;
  isUpdate?: boolean;
  statusChanged?: boolean;
}

export async function sendRSVPNotification(data: RSVPNotification) {
  const { fullName, attending, guests, message, isUpdate, statusChanged } = data;

  if (!resend) {
    console.error("Resend email not sent: RESEND_API_KEY is not configured.");
    return { success: false, error: new Error("RESEND_API_KEY is not configured") };
  }

  if (notificationEmails.length === 0) {
    console.error("Resend email not sent: NOTIFICATION_EMAIL is not configured.");
    return { success: false, error: new Error("NOTIFICATION_EMAIL is not configured") };
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <tr>
          <td style="background: linear-gradient(135deg, #C8A96A, #b8985e); padding: 32px 24px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">💍 RSVP Confirmation</h1>
            <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">Paul &amp; Galyn Wedding</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 32px 24px;">
            <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 14px 12px; border-bottom: 1px solid #eee; font-weight: 600; color: #333; font-size: 14px; width: 120px;">Name</td>
                <td style="padding: 14px 12px; border-bottom: 1px solid #eee; color: #555; font-size: 14px;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 14px 12px; border-bottom: 1px solid #eee; font-weight: 600; color: #333; font-size: 14px;">Attending</td>
                <td style="padding: 14px 12px; border-bottom: 1px solid #eee; color: #555; font-size: 14px;">${
                  attending
                    ? '<span style="color: #22c55e;">✅ Yes</span>'
                    : '<span style="color: #ef4444;">❌ No</span>'
                }</td>
              </tr>
              <tr>
                <td style="padding: 14px 12px; border-bottom: 1px solid #eee; font-weight: 600; color: #333; font-size: 14px;">Guests</td>
                <td style="padding: 14px 12px; border-bottom: 1px solid #eee; color: #555; font-size: 14px;">${guests}</td>
              </tr>
              ${
                message
                  ? `<tr>
                <td style="padding: 14px 12px; border-bottom: 1px solid #eee; font-weight: 600; color: #333; font-size: 14px; vertical-align: top;">Message</td>
                <td style="padding: 14px 12px; border-bottom: 1px solid #eee; color: #555; font-size: 14px;">${message}</td>
              </tr>`
                  : ""
              }
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px 24px; background-color: #fafafa; text-align: center; border-top: 1px solid #eee;">
            <p style="margin: 0; color: #999; font-size: 12px;">
              Sent from <strong>Paul &amp; Galyn Wedding Website</strong>
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    const { error } = await resend.emails.send({
      from: "Paul & Galyn Wedding <onboarding@resend.dev>",
      to: notificationEmails[0],
      subject: `💍 RSVP ${isUpdate ? "Updated" : "Response"} — ${attending ? `✅ Accepted (${guests} guest${guests > 1 ? "s" : ""})` : "❌ Declined"}${statusChanged ? " 🔄 [Status Changed]" : ""} | ${fullName}`,
      html,
    });

    if (error) {
      console.error("Resend API error:", error);
      return { success: false, error };
    }

    console.log("Email sent to:", notificationEmails[0]);
    return { success: true };
  } catch (error) {
    console.error("Resend email exception:", error);
    return { success: false, error };
  }
}

export interface RSVPSummaryEntry {
  full_name: string;
  email: string;
  attending: boolean;
  guests: number;
  message?: string | null;
  created_at: string;
  updated_at?: string | null;
  changed_from?: boolean | null;
}

export interface RSVPSummary {
  total: number;
  accepted: number;
  declined: number;
  totalGuests: number;
  statusChanges: Array<{
    full_name: string;
    email: string;
    from: string;
    to: string;
  }>;
  duplicates: Array<{
    full_name: string;
    email: string;
    count: number;
  }>;
  entries: RSVPSummaryEntry[];
}

export async function sendRSVPSummaryEmail(data: RSVPSummary) {
  const { total, accepted, declined, totalGuests, statusChanges, duplicates } = data;

  if (!resend) {
    console.error("Summary email not sent: RESEND_API_KEY is not configured.");
    return { success: false, error: new Error("RESEND_API_KEY is not configured") };
  }

  if (notificationEmails.length === 0) {
    console.error("Summary email not sent: NOTIFICATION_EMAIL is not configured.");
    return { success: false, error: new Error("NOTIFICATION_EMAIL is not configured") };
  }

  const statusChangeRows =
    statusChanges.length > 0
      ? statusChanges
          .map(
            (c) => `
              <tr>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #555; font-size: 14px;">${c.full_name}</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #555; font-size: 14px;">${c.email}</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #555; font-size: 14px;">${c.from}</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #555; font-size: 14px;">${c.to}</td>
              </tr>`
          )
          .join("")
      : `<tr><td colspan="4" style="padding: 12px; color: #999; font-size: 14px; text-align:center;">No status changes today.</td></tr>`;

  const duplicateRows =
    duplicates.length > 0
      ? duplicates
          .map(
            (d) => `
              <tr>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #555; font-size: 14px;">${d.full_name}</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #555; font-size: 14px;">${d.email}</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #555; font-size: 14px;">${d.count}</td>
              </tr>`
          )
          .join("")
      : `<tr><td colspan="3" style="padding: 12px; color: #999; font-size: 14px; text-align:center;">No duplicates detected.</td></tr>`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <tr>
          <td style="background: linear-gradient(135deg, #C8A96A, #b8985e); padding: 32px 24px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">📊 Daily RSVP Summary</h1>
            <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">Paul &amp; Galyn Wedding</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 32px 24px;">
            <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 14px 12px; border-bottom: 1px solid #eee; font-weight: 600; color: #333; font-size: 16px; width: 150px;">Total RSVPs</td>
                <td style="padding: 14px 12px; border-bottom: 1px solid #eee; color: #333; font-size: 16px;">${total}</td>
              </tr>
              <tr>
                <td style="padding: 14px 12px; border-bottom: 1px solid #eee; font-weight: 600; color: #16a34a; font-size: 16px;">✅ Accepted</td>
                <td style="padding: 14px 12px; border-bottom: 1px solid #eee; color: #333; font-size: 16px;">${accepted}</td>
              </tr>
              <tr>
                <td style="padding: 14px 12px; border-bottom: 1px solid #eee; font-weight: 600; color: #ef4444; font-size: 16px;">❌ Declined</td>
                <td style="padding: 14px 12px; border-bottom: 1px solid #eee; color: #333; font-size: 16px;">${declined}</td>
              </tr>
              <tr>
                <td style="padding: 14px 12px; border-bottom: 1px solid #eee; font-weight: 600; color: #333; font-size: 16px;">👥 Total Guests</td>
                <td style="padding: 14px 12px; border-bottom: 1px solid #eee; color: #333; font-size: 16px;">${totalGuests}</td>
              </tr>
            </table>

            <h2 style="margin: 28px 0 12px; color: #333; font-size: 18px;">🔄 Status Changes (Today)</h2>
            <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
              <tr style="background-color: #fafafa;">
                <th style="padding: 10px 12px; text-align:left; color:#666; font-size:13px; font-weight:600;">Name</th>
                <th style="padding: 10px 12px; text-align:left; color:#666; font-size:13px; font-weight:600;">Email</th>
                <th style="padding: 10px 12px; text-align:left; color:#666; font-size:13px; font-weight:600;">From</th>
                <th style="padding: 10px 12px; text-align:left; color:#666; font-size:13px; font-weight:600;">To</th>
              </tr>
              ${statusChangeRows}
            </table>

            <h2 style="margin: 28px 0 12px; color: #333; font-size: 18px;">⚠️ Duplicate Entries</h2>
            <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
              <tr style="background-color: #fafafa;">
                <th style="padding: 10px 12px; text-align:left; color:#666; font-size:13px; font-weight:600;">Name</th>
                <th style="padding: 10px 12px; text-align:left; color:#666; font-size:13px; font-weight:600;">Email</th>
                <th style="padding: 10px 12px; text-align:left; color:#666; font-size:13px; font-weight:600;">Count</th>
              </tr>
              ${duplicateRows}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px 24px; background-color: #fafafa; text-align: center; border-top: 1px solid #eee;">
            <p style="margin: 0; color: #999; font-size: 12px;">
              Sent from <strong>Paul &amp; Galyn Wedding Website</strong>
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    const { error } = await resend.emails.send({
      from: "Paul & Galyn Wedding <onboarding@resend.dev>",
      to: notificationEmails[0],
      subject: `📊 Daily RSVP Summary — ${accepted} Accepted / ${declined} Declined (${totalGuests} Guests)`,
      html,
    });

    if (error) {
      console.error("Resend summary email error:", error);
      return { success: false, error };
    }

    console.log("Summary email sent to:", notificationEmails[0]);
    return { success: true };
  } catch (error) {
    console.error("Resend summary email exception:", error);
    return { success: false, error };
  }
}
