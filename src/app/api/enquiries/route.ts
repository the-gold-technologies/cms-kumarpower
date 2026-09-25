import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getTransporter } from "@/lib/mailer";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function GET() {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(
      { success: true, data: enquiries },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error) {
    console.error("Database fetch error:", error);
    return NextResponse.json(
      { success: false, data: [] },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = body.name || "Anonymous Client";
    const email = body.email || "client@example.com";
    const phone = body.phone || "";
    const company = body.company || body.department || "";
    const interestedIn = body.interestedIn || body.productOrService || body.subject || "General Inquiry";
    const message = body.message || "";
    const callback = Boolean(body.callback);

    const enquiry = await prisma.enquiry.create({
      data: {
        id: `enq-${Date.now()}`,
        name,
        email,
        phone: phone || "+91 98110 00000",
        company: company || "N/A",
        interestedIn,
        message,
        status: "New",
      },
    });

    // 1. Determine Sales / Inquiries Email recipient
    let salesRecipient = process.env.SALES_EMAIL;
    if (!salesRecipient) {
      try {
        const contactPage = await prisma.page.findUnique({
          where: { slug: "contact" },
          include: { sections: true },
        });
        const infoSection = contactPage?.sections.find(
          (s: any) => s.type === "info" || s.id === "sec-contact-info"
        );
        if (infoSection && typeof infoSection.content === "object") {
          const content = infoSection.content as any;
          salesRecipient = content?.emailSales || content?.emailMain;
        }
      } catch (e) {}
    }
    if (!salesRecipient) {
      salesRecipient = "Sales@kumarpower.com";
    }

    // 2. Dispatch Email notification to Sales
    let emailSent = false;
    let emailError = null;
    const smtpData = getTransporter();

    if (smtpData && salesRecipient) {
      try {
        const recipients = salesRecipient
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean);

        const htmlBody = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #222; max-width: 650px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
            <div style="background-color: #111827; padding: 28px; text-align: center; border-bottom: 4px solid #2D6FBA;">
              <h2 style="color: #ffffff; margin: 0; font-size: 22px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 800;">New Customer Inquiry</h2>
              <p style="color: #2D6FBA; margin: 8px 0 0 0; font-weight: bold; font-size: 15px;">Kumar Power Website Lead</p>
            </div>
            
            <div style="padding: 28px;">
              <h3 style="margin-top: 0; color: #111827; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px;">Customer Details</h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
                <tr>
                  <td style="padding: 10px 0; width: 35%; font-weight: bold; color: #6b7280;">Full Name:</td>
                  <td style="padding: 10px 0; color: #111827; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #6b7280;">Email Address:</td>
                  <td style="padding: 10px 0; color: #111827;"><a href="mailto:${email}" style="color: #2D6FBA; text-decoration: none; font-weight: 500;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #6b7280;">Phone Number:</td>
                  <td style="padding: 10px 0; color: #111827;"><a href="tel:${phone}" style="color: #111827; text-decoration: none; font-weight: 600;">${phone || "Not provided"}</a></td>
                </tr>
                ${company ? `<tr><td style="padding: 10px 0; font-weight: bold; color: #6b7280;">Company / Department:</td><td style="padding: 10px 0; color: #111827;">${company}</td></tr>` : ""}
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #6b7280;">Interested In / Subject:</td>
                  <td style="padding: 10px 0; color: #111827; font-weight: bold;">${interestedIn}</td>
                </tr>
                ${callback ? `<tr><td style="padding: 10px 0; font-weight: bold; color: #6b7280;">Callback Requested:</td><td style="padding: 10px 0; color: #16a34a; font-weight: bold;">✓ Yes, Please Call Back</td></tr>` : ""}
              </table>

              ${
                message
                  ? `
                <div style="background: #f9fafb; border-left: 4px solid #2D6FBA; padding: 16px 20px; margin: 24px 0; border-radius: 0 8px 8px 0;">
                  <strong style="display: block; margin-bottom: 6px; color: #111827; font-size: 13px; text-transform: uppercase;">Message / Requirements:</strong>
                  <p style="margin: 0; white-space: pre-wrap; color: #374151; font-size: 14px; line-height: 1.6;">${message}</p>
                </div>
              `
                  : ""
              }

              <div style="margin-top: 30px; padding-top: 16px; border-top: 1px solid #f3f4f6; text-align: center;">
                <p style="font-size: 12px; color: #9ca3af; margin: 0;">
                  Received via <strong>Kumar Power Website</strong> on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST.
                </p>
              </div>
            </div>
          </div>
        `;

        await smtpData.transporter.sendMail({
          from: smtpData.fromAddress,
          to: recipients,
          replyTo: email,
          subject: `[New Inquiry] ${name} - ${interestedIn}`,
          html: htmlBody,
        });

        emailSent = true;
      } catch (err: any) {
        console.error("Nodemailer error sending enquiry email:", err);
        emailError = err.message;
      }
    }

    return NextResponse.json(
      { success: true, data: enquiry, emailSent, emailError: emailError || undefined },
      { status: 201, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error) {
    console.error("Database save error:", error);
    return NextResponse.json(
      { success: false, message: "Database save error" },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "id and status required" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }
    const updated = await prisma.enquiry.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json(
      { success: true, data: updated },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error) {
    console.error("Database update error:", error);
    return NextResponse.json(
      { success: false, message: "Database update error" },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
