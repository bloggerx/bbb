import { type NextRequest, NextResponse } from "next/server"
import sql from "@/lib/db"
import { sendViasendGrid } from "@/lib/email-service" // Declare the variable before using it

const EMAIL_SERVICE = process.env.EMAIL_SERVICE || "sendgrid" // or 'ses'
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
const SES_REGION = process.env.AWS_SES_REGION || "us-east-1"

export async function POST(req: NextRequest) {
  try {
    const { to, registrationId, name, ticketType, paymentRef, qrCodeUrl } = await req.json()

    if (!to || !registrationId || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate HTML email
    const { generateTicketEmailHTML } = await import("@/lib/email-service")
    const htmlContent = generateTicketEmailHTML({
      to,
      registrationId,
      name,
      ticketType,
      paymentRef,
      qrCodeUrl,
    })

    // Send via configured email service
    if (EMAIL_SERVICE === "sendgrid" && SENDGRID_API_KEY) {
      await sendViasendGrid(to, registrationId, name, htmlContent)
    } else {
      // Fallback to console log for development
      console.log("Email would be sent to:", to)
      console.log("Content:", htmlContent)
    }

    // Log email in database
    await sql`
      INSERT INTO email_logs (registration_id, recipient, subject, status, sent_at)
      VALUES (${registrationId}, ${to}, 'Your Chess Event Ticket', 'sent', NOW())
    `

    return NextResponse.json({
      success: true,
      message: "Ticket email sent successfully",
    })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}

// async function sendViasendGrid(
//   to: string,
//   registrationId: string,
//   name: string,
//   htmlContent: string
// ) {
//   const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       personalizations: [
//         {
//           to: [{ email: to }],
//           subject: `Your Chess Event Ticket - ${registrationId}`,
//         },
//       ],
//       from: {
//         email: process.env.SENDGRID_FROM_EMAIL || 'noreply@chessevent.com',
//         name: 'Chess Event 2025',
//       },
//       content: [
//         {
//           type: 'text/html',
//           value: htmlContent,
//         },
//       ],
//     }),
//   });

//   if (!response.ok) {
//     throw new Error('SendGrid API error');
//   }
// }
