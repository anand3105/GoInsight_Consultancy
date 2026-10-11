import { NextResponse } from "next/server";

// Trim env values: Vercel values pasted with a trailing newline break the
// Authorization header and the From address.
const CONTACT_EMAIL = process.env.CONTACT_EMAIL?.trim() || "gupta.anand3105@gmail.com";
const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim();
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL?.trim();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, page } = body;

    if (!email?.trim()) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const emailBody = [
      `New Demo Viewer Lead`,
      ``,
      `Email: ${email}`,
      page ? `Dashboard Viewed: ${page}` : null,
      `Submitted At: ${new Date().toISOString()}`,
    ]
      .filter(Boolean)
      .join("\n");

    if (RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from:
            RESEND_FROM_EMAIL ||
            "GoInsight <onboarding@resend.dev>",
          to: [CONTACT_EMAIL],
          reply_to: email,
          subject: `New Demo Lead: ${email}`,
          text: emailBody,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Resend error:", errorData);
        return NextResponse.json(
          { error: "Failed to send notification." },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true });
    }

    // Without an API key nothing is emailed. In production, report the
    // failure so the visitor is told to email directly instead of the lead
    // being silently lost.
    if (process.env.NODE_ENV === "production") {
      console.error("RESEND_API_KEY is not set; demo lead was not emailed.");
      return NextResponse.json(
        { error: "Email is not configured. Please email hello@goinsight.in directly." },
        { status: 500 }
      );
    }

    // Fallback: log during development
    console.log("=== NEW DEMO LEAD ===");
    console.log(`To: ${CONTACT_EMAIL}`);
    console.log(emailBody);
    console.log("=====================");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Demo lead error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
