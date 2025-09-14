import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const USERS_FILE = path.join(process.cwd(), 'data', 'admin-users.json')

// Initialize users file if it doesn't exist
function initializeUsersFile() {
  if (!fs.existsSync(USERS_FILE)) {
    const initialData = {
      users: [],
      lastUpdated: new Date().toISOString()
    }
    fs.writeFileSync(USERS_FILE, JSON.stringify(initialData, null, 2))
  }
}

// Get all users
export async function GET() {
  try {
    initializeUsersFile()
    
    const data = fs.readFileSync(USERS_FILE, 'utf8')
    const usersData = JSON.parse(data)
    
    return NextResponse.json({
      success: true,
      users: usersData.users,
      total: usersData.users.length,
      lastUpdated: usersData.lastUpdated
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'فشل في جلب المستخدمين' 
    }, { status: 500 })
  }
}

// Add new user session
export async function POST(request: NextRequest) {
  try {
    const { username, deviceInfo } = await request.json()
    
    initializeUsersFile()
    
    const data = fs.readFileSync(USERS_FILE, 'utf8')
    const usersData = JSON.parse(data)
    
    // Add new user session
    const newUser = {
      id: Date.now(),
      username,
      deviceInfo,
      loginTime: new Date().toISOString(),
      isActive: true
    }
    
    usersData.users.unshift(newUser)
    usersData.lastUpdated = new Date().toISOString()
    
    // Keep only last 50 sessions
    if (usersData.users.length > 50) {
      usersData.users = usersData.users.slice(0, 50)
    }
    
    fs.writeFileSync(USERS_FILE, JSON.stringify(usersData, null, 2))
    
    return NextResponse.json({
      success: true,
      user: newUser
    })
  } catch (error) {
    console.error('Error adding user:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'فشل في إضافة المستخدم' 
    }, { status: 500 })
  }
}

// Clear all users
export async function DELETE() {
  try {
    initializeUsersFile()
    
    const data = {
      users: [],
      lastUpdated: new Date().toISOString()
    }
    
    fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2))
    
    return NextResponse.json({
      success: true,
      message: 'تم مسح جميع المستخدمين'
    })
  } catch (error) {
    console.error('Error clearing users:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'فشل في مسح المستخدمين' 
    }, { status: 500 })
  }
}
