import { NextResponse } from 'next/server'
import { readAdminData, updateSettings } from '@/lib/admin-data'

export async function GET() {
  try {
    const data = readAdminData()
    return NextResponse.json(data.settings)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load settings' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const data = updateSettings(body)
    return NextResponse.json({ success: true, settings: data.settings })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}