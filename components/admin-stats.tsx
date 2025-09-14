"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BarChart3, 
  Users, 
  FileText, 
  Star, 
  Eye, 
  TrendingUp,
  Activity,
  Database,
  Server,
  Globe
} from "lucide-react"

interface AdminStatsProps {
  projects: any[]
  services: any[]
  feedbacks: any[]
}

export function AdminStats({ projects, services, feedbacks }: AdminStatsProps) {
  const [stats, setStats] = useState({
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0,
    uptime: "99.9%",
    responseTime: "120ms",
    lastBackup: "2 hours ago"
  })

  useEffect(() => {
    // Calculate stats
    const totalViews = projects.reduce((sum, project) => sum + (project.views || 0), 0)
    const totalLikes = projects.reduce((sum, project) => sum + (project.likes || 0), 0)
    const totalComments = feedbacks.length

    setStats(prev => ({
      ...prev,
      totalViews,
      totalLikes,
      totalComments
    }))
  }, [projects, feedbacks])

  const statCards = [
    {
      title: "Total Projects",
      value: projects.length,
      subtitle: `${projects.filter(p => p.visible).length} visible`,
      icon: FileText,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30"
    },
    {
      title: "Total Services",
      value: services.length,
      subtitle: `${services.filter(s => s.visible).length} visible`,
      icon: Server,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30"
    },
    {
      title: "Total Feedbacks",
      value: feedbacks.length,
      subtitle: `${feedbacks.filter(f => f.visible).length} visible`,
      icon: Star,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20",
      borderColor: "border-yellow-500/30"
    },
    {
      title: "Total Views",
      value: stats.totalViews.toLocaleString(),
      subtitle: "All time",
      icon: Eye,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500/30"
    },
    {
      title: "Total Likes",
      value: stats.totalLikes.toLocaleString(),
      subtitle: "All time",
      icon: TrendingUp,
      color: "text-pink-400",
      bgColor: "bg-pink-500/20",
      borderColor: "border-pink-500/30"
    },
    {
      title: "Comments",
      value: stats.totalComments,
      subtitle: "Total feedback",
      icon: Users,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/20",
      borderColor: "border-cyan-500/30"
    }
  ]

  const systemStats = [
    {
      title: "System Uptime",
      value: stats.uptime,
      icon: Activity,
      color: "text-green-400"
    },
    {
      title: "Response Time",
      value: stats.responseTime,
      icon: Globe,
      color: "text-blue-400"
    },
    {
      title: "Last Backup",
      value: stats.lastBackup,
      icon: Database,
      color: "text-yellow-400"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className={`bg-gray-800 border-gray-700 ${stat.borderColor}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <p className="text-xs text-gray-400 mt-1">{stat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Stats */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-xl flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {systemStats.map((stat, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="p-2 bg-gray-700 rounded-lg">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-sm text-gray-400">{stat.title}</div>
                  <div className={`text-lg font-semibold ${stat.color}`}>{stat.value}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-xl">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "New feedback received", time: "2 minutes ago", type: "feedback" },
              { action: "Project 'AI.Maker' updated", time: "1 hour ago", type: "project" },
              { action: "Service 'Web Development' modified", time: "3 hours ago", type: "service" },
              { action: "Settings updated", time: "5 hours ago", type: "settings" },
              { action: "Backup completed", time: "1 day ago", type: "system" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'feedback' ? 'bg-green-400' :
                  activity.type === 'project' ? 'bg-blue-400' :
                  activity.type === 'service' ? 'bg-yellow-400' :
                  activity.type === 'settings' ? 'bg-purple-400' :
                  'bg-gray-400'
                }`} />
                <div className="flex-1">
                  <div className="text-white text-sm">{activity.action}</div>
                  <div className="text-gray-400 text-xs">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}



