import sql from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"
import { generateRegistrationId } from "@/lib/utils"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, chapterName, category, contactNo, email } = body

    // Validate required fields
    if (!name || !chapterName || !category || !contactNo || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const registrationId = generateRegistrationId()

    const result = await sql`
      INSERT INTO registrations (
        registration_id, name, chapter_name, category, 
        contact_no, email, ticket_type, payment_status
      )
      VALUES (
        ${registrationId}, ${name}, ${chapterName}, ${category},
        ${contactNo}, ${email}, 'pending', 'pending'
      )
      RETURNING id, registration_id, email, created_at
    `

    return NextResponse.json({
      success: true,
      registrationId: result[0]?.registration_id,
      message: "Registration created successfully",
    })
  } catch (error) {
    console.error("Error creating registration:", error)
    return NextResponse.json({ error: "Failed to create registration" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const result = await sql`
      SELECT * FROM registrations WHERE email = ${email}
      ORDER BY created_at DESC
      LIMIT 1
    `

    return NextResponse.json(result[0] || null)
  } catch (error) {
    console.error("Error fetching registration:", error)
    return NextResponse.json({ error: "Failed to fetch registration" }, { status: 500 })
  }
}
