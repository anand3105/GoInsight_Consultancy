import { NextResponse } from "next/server";

const CONTACT_EMAIL = "hello@goinsight.in";

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

    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from:
            process.env.RESEND_FROM_EMAIL ||
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
