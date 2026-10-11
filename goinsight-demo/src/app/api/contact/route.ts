import { NextResponse } from "next/server";

// Trim env values: Vercel values pasted with a trailing newline break the
// Authorization header and the From address.
const CONTACT_EMAIL = process.env.CONTACT_EMAIL?.trim() || "gupta.anand3105@gmail.com";
const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim();
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL?.trim();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      countryCode,
      phone,
      company,
      companySize,
      preferredDate,
      preferredTime,
      service,
      message,
    } = body;

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Build the email body
    const emailBody = [
      `New enquiry from the GoInsight website`,
      ``,
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${countryCode} ${phone}` : null,
      company ? `Company: ${company}` : null,
      companySize ? `Company Size: ${companySize}` : null,
      preferredDate ? `Preferred Date: ${preferredDate}` : null,
      preferredTime ? `Preferred Time: ${preferredTime}` : null,
      service ? `Service Interest: ${service}` : null,
      ``,
      `Message:`,
      message,
    ]
      .filter(Boolean)
      .join("\n");

    // Send email using Resend (or any transactional email service)
    // For now, we use a mailto-based fallback via fetch to an external service
    // You can replace this with Resend, SendGrid, Nodemailer, etc.

    // If RESEND_API_KEY is configured, use Resend
    if (RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: RESEND_FROM_EMAIL || "GoInsight <onboarding@resend.dev>",
          to: [CONTACT_EMAIL],
          reply_to: email,
          subject: `New Enquiry from ${name}${company ? ` - ${company}` : ""}`,
          text: emailBody,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Resend error:", errorData);
        return NextResponse.json(
          { error: "Failed to send email. Please try again." },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true });
    }

    // Without an API key nothing is emailed. In production, report the
    // failure so the visitor is told to email directly instead of the lead
    // being silently lost.
    if (process.env.NODE_ENV === "production") {
      console.error("RESEND_API_KEY is not set; contact enquiry was not emailed.");
      return NextResponse.json(
        { error: "Email is not configured. Please email hello@goinsight.in directly." },
        { status: 500 }
      );
    }

    // Fallback: log the enquiry (useful during development)
    console.log("=== NEW CONTACT ENQUIRY ===");
    console.log(`To: ${CONTACT_EMAIL}`);
    console.log(emailBody);
    console.log("===========================");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
