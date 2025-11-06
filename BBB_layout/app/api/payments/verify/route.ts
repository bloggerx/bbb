import { type NextRequest, NextResponse } from "next/server"
import { createHmac } from "crypto"
import sql from "@/lib/db"

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET

export async function POST(req: NextRequest) {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = await req.json()

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json({ error: "Missing payment details" }, { status: 400 })
    }

    if (!RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: "Razorpay credentials not configured" }, { status: 500 })
    }

    const signatureBody = `${razorpayOrderId}|${razorpayPaymentId}`
    const expectedSignature = createHmac("sha256", RAZORPAY_KEY_SECRET).update(signatureBody).digest("hex")

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json({ error: "Payment signature verification failed" }, { status: 400 })
    }

    // Update payment status in database
    const paymentResult = await sql`
      UPDATE payments
      SET status = 'success', razorpay_payment_id = ${razorpayPaymentId}, updated_at = NOW()
      WHERE razorpay_order_id = ${razorpayOrderId}
      RETURNING registration_id
    `

    if (paymentResult.length === 0) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 })
    }

    const registrationId = paymentResult[0].registration_id

    // Update registration payment status
    await sql`
      UPDATE registrations
      SET payment_status = 'success', payment_id = ${razorpayPaymentId}, payment_reference = ${razorpayOrderId}, updated_at = NOW()
      WHERE registration_id = ${registrationId}
    `

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      registrationId,
    })
  } catch (error) {
    console.error("Error verifying payment:", error)
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 })
  }
}
