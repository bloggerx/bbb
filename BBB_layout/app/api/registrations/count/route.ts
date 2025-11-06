import sql from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const result = await sql`
      SELECT COUNT(*) as count FROM registrations 
      WHERE payment_status = 'success'
    `

    return NextResponse.json({
      count: result[0]?.count || 0,
    })
  } catch (error) {
    console.error("Error fetching count:", error)
    return NextResponse.json({ error: "Failed to fetch count" }, { status: 500 })
  }
}
