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
    const applications = await prisma.jobApplication.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(
      { success: true, data: applications },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error) {
    console.error("Database fetch error (Job Applications):", error);
    return NextResponse.json(
      { success: false, data: [] },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, message, resumeUrl, resumeBase64, resumeName } = body;

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { success: false, message: "Full name, email and phone number are required." },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const application = await prisma.jobApplication.create({
      data: {
        id: `app-${Date.now()}`,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message ? message.trim() : null,
        resumeUrl: resumeUrl || null,
        status: "New",
      },
    });

    // 1. Determine HR Email recipient (from .env or fallback)
    let hrRecipient = process.env.HR_EMAIL || "hr@kumarpower.com";

    // 2. Dispatch Email notification to HR
    let emailSent = false;
    let emailError = null;
    const smtpData = getTransporter();

    if (smtpData && hrRecipient) {
      try {
        const recipients = hrRecipient
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean);

        const attachments: any[] = [];
        if (resumeBase64 && resumeName) {
          const base64Clean = resumeBase64.replace(/^data:[^;]+;base64,/, "");
          attachments.push({
            filename: resumeName,
            content: Buffer.from(base64Clean, "base64"),
          });
        }

        const htmlBody = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #222; max-width: 650px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
            <div style="background-color: #111827; padding: 28px; text-align: center; border-bottom: 4px solid #2D6FBA;">
              <h2 style="color: #ffffff; margin: 0; font-size: 22px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 800;">New Candidate Resume Submission</h2>
              <p style="color: #2D6FBA; margin: 8px 0 0 0; font-weight: bold; font-size: 15px;">Kumar Power Career Portal</p>
            </div>
            
            <div style="padding: 28px;">
              <h3 style="margin-top: 0; color: #111827; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px;">Candidate Information</h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
                <tr>
                  <td style="padding: 10px 0; width: 35%; font-weight: bold; color: #6b7280;">Full Name:</td>
                  <td style="padding: 10px 0; color: #111827; font-weight: 600;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #6b7280;">Email Address:</td>
                  <td style="padding: 10px 0; color: #111827;"><a href="mailto:${email}" style="color: #2D6FBA; text-decoration: none; font-weight: 500;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #6b7280;">Phone Number:</td>
                  <td style="padding: 10px 0; color: #111827;"><a href="tel:${phone}" style="color: #111827; text-decoration: none; font-weight: 600;">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #6b7280;">Attached Resume:</td>
                  <td style="padding: 10px 0; color: #111827;">
                    ${
                      resumeUrl
                        ? `<a href="${resumeUrl}" target="_blank" style="display:inline-block; padding: 6px 14px; background-color: #2D6FBA; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: bold;">📄 View / Download Resume</a>`
                        : (resumeName ? `📎 <strong>${resumeName}</strong> (attached)` : "No resume file attached")
                    }
                  </td>
                </tr>
              </table>

              ${
                message
                  ? `
                <div style="background: #f9fafb; border-left: 4px solid #2D6FBA; padding: 16px 20px; margin: 24px 0; border-radius: 0 8px 8px 0;">
                  <strong style="display: block; margin-bottom: 6px; color: #111827; font-size: 13px; text-transform: uppercase;">Candidate Message / Notes:</strong>
                  <p style="margin: 0; white-space: pre-wrap; color: #374151; font-size: 14px; line-height: 1.6;">${message}</p>
                </div>
              `
                  : ""
              }

              <div style="margin-top: 30px; padding-top: 16px; border-top: 1px solid #f3f4f6; text-align: center;">
                <p style="font-size: 12px; color: #9ca3af; margin: 0;">
                  Received via <strong>Kumar Power Drop Your Resume Section</strong> on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST.
                </p>
              </div>
            </div>
          </div>
        `;

        await smtpData.transporter.sendMail({
          from: smtpData.fromAddress,
          to: recipients,
          replyTo: email,
          subject: `[New Job Application] ${fullName} - Resume Submission`,
          html: htmlBody,
          attachments: attachments.length > 0 ? attachments : undefined,
        });

        emailSent = true;
      } catch (err: any) {
        console.error("Nodemailer error sending application email:", err);
        emailError = err.message;
      }
    }

    return NextResponse.json(
      { success: true, data: application, emailSent, emailError: emailError || undefined },
      { status: 201, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error) {
    console.error("Database save error (Job Application):", error);
    return NextResponse.json(
      { success: false, message: "Failed to save application." },
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
        { success: false, message: "id and status are required." },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const updated = await prisma.jobApplication.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(
      { success: true, data: updated },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error) {
    console.error("Database update error (Job Application):", error);
    return NextResponse.json(
      { success: false, message: "Failed to update status." },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idFromQuery = searchParams.get("id");
    let id = idFromQuery;

    if (!id) {
      try {
        const body = await req.json();
        id = body?.id;
      } catch {}
    }

    if (!id) {
      return NextResponse.json(
        { success: false, message: "id is required." },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    await prisma.jobApplication.delete({
      where: { id },
    });

    return NextResponse.json(
      { success: true, message: "Application deleted successfully." },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error) {
    console.error("Database delete error (Job Application):", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete application." },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
