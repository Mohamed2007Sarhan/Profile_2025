import { NextResponse } from 'next/server'
import { addFeedback } from '@/lib/admin-data'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Received feedback data:', body)
    
    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      console.log('Validation failed:', { name: body.name, email: body.email, message: body.message })
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
    }
    
    // Add feedback to admin data (existing functionality)
    const data = addFeedback({
      name: body.name,
      email: body.email,
      message: body.message,
      rating: body.rating || 5,
      category: body.category || 'general',
      status: 'new',
      visible: false, // Default to not visible until approved
      createdAt: new Date().toISOString(),
      timestamp: body.timestamp || new Date().toISOString()
    })

    // Send to Formspree (new functionality)
    try {
      const formspreeResponse = await fetch('https://formspree.io/f/mblkdlga', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: body.name,
          email: body.email,
          message: body.message,
          rating: body.rating || 5,
          category: body.category || 'general',
          type: 'feedback',
          _replyto: body.email,
          _subject: `New Feedback: ${body.name} (${body.rating || 5} stars) - ${body.category || 'general'}`,
        }),
      })

      if (formspreeResponse.ok) {
        console.log("Feedback sent to Formspree successfully")
      } else {
        console.error("Formspree error:", await formspreeResponse.text())
      }
    } catch (formspreeError) {
      console.error("Formspree submission error:", formspreeError)
      // Don't fail the request if Formspree fails
    }
    
    console.log('Feedback saved successfully:', data)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your feedback!' 
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 })
  }
}



