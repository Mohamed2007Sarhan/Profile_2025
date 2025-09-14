import { NextResponse } from 'next/server'
import { readAdminData, updateServices } from '@/lib/admin-data'

export async function GET() {
  try {
    const data = readAdminData()
    return NextResponse.json(data.services)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load services' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const data = updateServices(body)
    return NextResponse.json({ success: true, services: data.services })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update services' }, { status: 500 })
  }
}