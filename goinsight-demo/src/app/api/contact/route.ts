import { NextResponse } from "next/server";

const CONTACT_EMAIL = "hello@goinsight.in";

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
    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || "GoInsight <onboarding@resend.dev>",
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
