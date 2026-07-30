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
}

export async function sendRSVPNotification(data: RSVPNotification) {
  const { fullName, attending, guests, message } = data;

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
      subject: `💍 New RSVP Response — ${attending ? `✅ RSVP Accepted (${guests} guest${guests > 1 ? "s" : ""})` : "❌ RSVP Declined"} | ${fullName}`,
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
