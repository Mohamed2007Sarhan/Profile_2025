'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { RefreshCw, Trash2, Users, Globe, Monitor, Smartphone, Tablet, Clock } from 'lucide-react'

interface DeviceInfo {
  ip: string
  userAgent: string
  deviceType: 'mobile' | 'tablet' | 'desktop'
  browser: string
  os: string
  timestamp: string
}

interface User {
  id: number
  username: string
  deviceInfo: DeviceInfo
  loginTime: string
  isActive: boolean
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')

  const loadUsers = async () => {
    setIsLoading(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/admin/users')
      const data = await response.json()
      
      if (data.success) {
        setUsers(data.users)
      } else {
        setMessage(`Error: ${data.error}`)
      }
    } catch (error) {
      setMessage(`Error loading users: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const clearUsers = async () => {
    if (!confirm('هل أنت متأكد من مسح جميع المستخدمين؟')) return
    
    try {
      const response = await fetch('/api/admin/users', {
        method: 'DELETE'
      })
      const data = await response.json()
      
      if (data.success) {
        setUsers([])
        setMessage('تم مسح جميع المستخدمين')
      } else {
        setMessage(`Error: ${data.error}`)
      }
    } catch (error) {
      setMessage(`Error clearing users: ${error}`)
    }
  }

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile': return <Smartphone className="h-4 w-4" />
      case 'tablet': return <Tablet className="h-4 w-4" />
      case 'desktop': return <Monitor className="h-4 w-4" />
      default: return <Monitor className="h-4 w-4" />
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const getTimeAgo = (timestamp: string) => {
    const now = new Date()
    const loginTime = new Date(timestamp)
    const diffMs = now.getTime() - loginTime.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return 'الآن'
    if (diffMins < 60) return `منذ ${diffMins} دقيقة`
    if (diffHours < 24) return `منذ ${diffHours} ساعة`
    return `منذ ${diffDays} يوم`
  }

  useEffect(() => {
    loadUsers()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6" />
            المستخدمون النشطون
          </h2>
          <p className="text-gray-600">تتبع جميع المستخدمين الذين سجلوا دخولهم</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadUsers} disabled={isLoading} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            تحديث
          </Button>
          <Button onClick={clearUsers} variant="destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            مسح الكل
          </Button>
        </div>
      </div>

      {message && (
        <Alert>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4">
        {users.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">لا يوجد مستخدمون نشطون</p>
            </CardContent>
          </Card>
        ) : (
          users.map((user) => (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {getDeviceIcon(user.deviceInfo.deviceType)}
                      <CardTitle className="text-lg">{user.username}</CardTitle>
                    </div>
                    <Badge variant={user.isActive ? 'default' : 'secondary'}>
                      {user.isActive ? 'نشط' : 'غير نشط'}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {getTimeAgo(user.loginTime)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">العنوان:</span>
                      <span className="text-sm text-gray-600 font-mono">{user.deviceInfo.ip}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">الجهاز:</span>
                      <span className="text-sm text-gray-600">{user.deviceInfo.deviceType}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">المتصفح:</span>
                      <span className="text-sm text-gray-600">{user.deviceInfo.browser}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">نظام التشغيل:</span>
                      <span className="text-sm text-gray-600">{user.deviceInfo.os}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="text-sm text-gray-500">
                    <strong>وقت تسجيل الدخول:</strong> {formatTime(user.loginTime)}
                  </div>
                  <div className="text-xs text-gray-400 mt-1 font-mono break-all">
                    {user.deviceInfo.userAgent}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">إحصائيات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{users.length}</div>
              <div className="text-sm text-gray-600">إجمالي المستخدمين</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {users.filter(u => u.isActive).length}
              </div>
              <div className="text-sm text-gray-600">نشطون</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {new Set(users.map(u => u.deviceInfo.deviceType)).size}
              </div>
              <div className="text-sm text-gray-600">أنواع الأجهزة</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {new Set(users.map(u => u.deviceInfo.browser)).size}
              </div>
              <div className="text-sm text-gray-600">المتصفحات</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { AdminUsers }