import { NextRequest, NextResponse } from 'next/server'

// Mock user database - في التطبيق الحقيقي استخدم قاعدة بيانات
const users = [
  {
    id: 1,
    username: 'Mohamed',
    password: 'Mohamed2007', // في التطبيق الحقيقي استخدم hash
    role: 'admin'
  }
]

// Generate secure token
function generateToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Get user device info
async function getUserDeviceInfo(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || ''
  
  // Get real IP from ip.me
  let realIP = ''
  try {
    const ipResponse = await fetch('https://api.ipify.org?format=text')
    const ipText = await ipResponse.text()
    realIP = ipText.trim()
  } catch (error) {
    console.error('Error fetching IP:', error)
    // Fallback to forwarded IP
    realIP = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown'
  }

  // Detect device type
  let deviceType = 'desktop'
  if (userAgent.includes('Mobile') || userAgent.includes('Android')) {
    deviceType = 'mobile'
  } else if (userAgent.includes('Tablet') || userAgent.includes('iPad')) {
    deviceType = 'tablet'
  }

  // Detect browser
  let browser = 'unknown'
  if (userAgent.includes('Chrome')) browser = 'Chrome'
  else if (userAgent.includes('Firefox')) browser = 'Firefox'
  else if (userAgent.includes('Safari')) browser = 'Safari'
  else if (userAgent.includes('Edge')) browser = 'Edge'

  // Detect OS
  let os = 'unknown'
  if (userAgent.includes('Windows')) os = 'Windows'
  else if (userAgent.includes('Mac')) os = 'macOS'
  else if (userAgent.includes('Linux')) os = 'Linux'
  else if (userAgent.includes('Android')) os = 'Android'
  else if (userAgent.includes('iOS')) os = 'iOS'

  return {
    ip: realIP,
    userAgent,
    deviceType,
    browser,
    os,
    timestamp: new Date().toISOString()
  }
}

// Send login notification to Formspree
async function sendLoginNotification(userInfo: any, deviceInfo: any) {
  try {
    const formData = new FormData()
    formData.append('name', `Admin Login - ${userInfo.username}`)
    formData.append('email', 'admin@portfolio.com')
    formData.append('message', `
🔐 تسجيل دخول جديد إلى لوحة الإدارة

👤 المستخدم: ${userInfo.username}
🕐 الوقت: ${new Date().toLocaleString('ar-SA')}
🌐 العنوان: ${deviceInfo.ip}
💻 الجهاز: ${deviceInfo.deviceType}
🌍 المتصفح: ${deviceInfo.browser}
💿 نظام التشغيل: ${deviceInfo.os}
📱 User Agent: ${deviceInfo.userAgent}

⚠️ تأكد من أن هذا التسجيل آمن!
    `)

    await fetch('https://formspree.io/f/mblkdlga', {
      method: 'POST',
      body: formData
    })
  } catch (error) {
    console.error('Error sending login notification:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Validate credentials
    const user = users.find(u => u.username === username && u.password === password)
    
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid username or password' 
      }, { status: 401 })
    }

    // Get device info
    const deviceInfo = await getUserDeviceInfo(request)
    
    // Generate token
    const token = generateToken()
    
    // Send notification to Formspree
    await sendLoginNotification(user, deviceInfo)

    // Store session (in real app, use database)
    const sessionData = {
      userId: user.id,
      username: user.username,
      token,
      deviceInfo,
      loginTime: new Date().toISOString()
    }

    // In real app, store in database
    console.log('New admin login:', sessionData)

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      },
      deviceInfo
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Server error' 
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ 
        success: false, 
        error: 'Token required' 
      }, { status: 401 })
    }

    // In real app, validate token from database
    // For now, just check if it exists
    if (token) {
      return NextResponse.json({
        success: true,
        message: 'Valid token'
      })
    }

    return NextResponse.json({ 
      success: false, 
      error: 'Invalid token' 
    }, { status: 401 })

  } catch (error) {
    console.error('Token validation error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Server error' 
    }, { status: 500 })
  }
}
