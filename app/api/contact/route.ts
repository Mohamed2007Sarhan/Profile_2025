import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message, honeypot } = body

    // Honeypot spam protection
    if (honeypot) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 })
    }

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Store locally (existing functionality)
    console.log("Contact form submission:", {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    })

    // Send to Formspree (new functionality)
    try {
      const formspreeResponse = await fetch('https://formspree.io/f/mblkdlga', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          _replyto: email,
          _subject: `New Contact Form: ${subject}`,
        }),
      })

      if (formspreeResponse.ok) {
        console.log("Message sent to Formspree successfully")
      } else {
        console.error("Formspree error:", await formspreeResponse.text())
      }
    } catch (formspreeError) {
      console.error("Formspree submission error:", formspreeError)
      // Don't fail the request if Formspree fails
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
