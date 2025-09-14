import { NextResponse } from 'next/server'
import { readAdminData, addFeedback, updateFeedback, deleteFeedback, writeAdminData } from '@/lib/admin-data'

export async function GET() {
  try {
    const data = readAdminData()
    return NextResponse.json(data.feedbacks)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load feedbacks' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = addFeedback(body)
    return NextResponse.json({ success: true, feedback: data.feedbacks[0] })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add feedback' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    
    // If body is an array, update all feedbacks
    if (Array.isArray(body)) {
      const data = readAdminData()
      data.feedbacks = body
      writeAdminData(data)
      return NextResponse.json({ success: true, feedbacks: data.feedbacks })
    }
    
    // If body has id, update specific feedback
    if (body.id) {
      const { id, ...updates } = body
      const data = updateFeedback(id, updates)
      return NextResponse.json({ success: true, feedbacks: data.feedbacks })
    }
    
    // If no id, treat as bulk update
    const data = readAdminData()
    data.feedbacks = body
    writeAdminData(data)
    return NextResponse.json({ success: true, feedbacks: data.feedbacks })
  } catch (error) {
    console.error('Error updating feedback:', error)
    return NextResponse.json({ error: 'Failed to update feedback' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Feedback ID is required' }, { status: 400 })
    }
    
    const data = deleteFeedback(id)
    return NextResponse.json({ success: true, feedbacks: data.feedbacks })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete feedback' }, { status: 500 })
  }
}