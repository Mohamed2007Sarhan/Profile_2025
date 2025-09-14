"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Eye, 
  EyeOff, 
  Trash2, 
  Edit, 
  Check, 
  X, 
  Settings, 
  MessageSquare, 
  FolderOpen,
  Shield,
  Code2,
  Brain,
  Smartphone
} from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface Feedback {
  id: string
  name: string
  email: string
  message: string
  rating: number
  category: string
  timestamp: string
  status: string
}

interface Project {
  id: string
  title: string
  titleAr: string
  visible: boolean
}

export function AdminControls() {
  const { language } = useLanguage()
  const [isAdmin, setIsAdmin] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedTab, setSelectedTab] = useState<'feedbacks' | 'projects' | 'settings'>('feedbacks')

  useEffect(() => {
    // Check if user is admin (simple check)
    const adminKey = localStorage.getItem('admin-key')
    if (adminKey === 'mohamed-admin-2024') {
      setIsAdmin(true)
    }
    
    // Load feedbacks
    const savedFeedbacks = JSON.parse(localStorage.getItem('portfolio-feedbacks') || '[]')
    setFeedbacks(savedFeedbacks)
    
    // Load projects visibility
    const savedProjects = JSON.parse(localStorage.getItem('admin-projects') || '[]')
    if (savedProjects.length === 0) {
      // Initialize with all projects visible
      const initialProjects = [
        { id: 'ibrand-frontend', title: 'iBrand Frontend', titleAr: 'iBrand Frontend', visible: true },
        { id: 'ibrand-data', title: 'iBrand Data', titleAr: 'iBrand Data', visible: true },
        // { id: 'emailpro', title: 'EmailPro', titleAr: 'EmailPro', visible: true },
        { id: 'workspace-frontend', title: 'Workspace Frontend', titleAr: 'Workspace Frontend', visible: true },
        { id: 'ai-maker', title: 'AI.Maker', titleAr: 'AI.Maker', visible: true },
        { id: 'ghostmeet-ai', title: 'GhostMeet.AI', titleAr: 'GhostMeet.AI', visible: true },
        { id: 'new-profile2025', title: 'New Profile 2025', titleAr: 'الملف الشخصي الجديد 2025', visible: true },
        { id: 'nextjs-app-bootstrap', title: 'Next.js App Bootstrap', titleAr: 'Next.js App Bootstrap', visible: true },
        { id: 'proteamhub', title: 'ProTeamHub', titleAr: 'ProTeamHub', visible: true },
        { id: 'profile-mohamed-sarhan', title: 'Profile Mohamed Sarhan', titleAr: 'الملف الشخصي محمد سرحان', visible: true },
        { id: 'pov-wormgpt-library', title: 'POV WormGPT Library', titleAr: 'مكتبة POV WormGPT', visible: true },
        { id: 'dr-hoda', title: 'Dr. Hoda', titleAr: 'د. هدى', visible: true },
        { id: 'profile-php', title: 'Profile PHP', titleAr: 'الملف الشخصي PHP', visible: true },
        { id: 'teacher-php', title: 'Teacher PHP', titleAr: 'معلم PHP', visible: true }
      ]
      setProjects(initialProjects)
      localStorage.setItem('admin-projects', JSON.stringify(initialProjects))
    } else {
      setProjects(savedProjects)
    }
  }, [])

  const handleAdminLogin = () => {
    const key = prompt(language === "en" ? "Enter admin key:" : "أدخل مفتاح الإدارة:")
    if (key === 'mohamed-admin-2024') {
      setIsAdmin(true)
      localStorage.setItem('admin-key', key)
    } else {
      alert(language === "en" ? "Invalid admin key!" : "مفتاح إدارة غير صحيح!")
    }
  }

  const toggleFeedbackVisibility = (id: string) => {
    const updatedFeedbacks = feedbacks.map(feedback => 
      feedback.id === id 
        ? { ...feedback, status: feedback.status === 'visible' ? 'hidden' : 'visible' }
        : feedback
    )
    setFeedbacks(updatedFeedbacks)
    localStorage.setItem('portfolio-feedbacks', JSON.stringify(updatedFeedbacks))
  }

  const deleteFeedback = (id: string) => {
    const updatedFeedbacks = feedbacks.filter(feedback => feedback.id !== id)
    setFeedbacks(updatedFeedbacks)
    localStorage.setItem('portfolio-feedbacks', JSON.stringify(updatedFeedbacks))
  }

  const toggleProjectVisibility = (id: string) => {
    const updatedProjects = projects.map(project => 
      project.id === id 
        ? { ...project, visible: !project.visible }
        : project
    )
    setProjects(updatedProjects)
    localStorage.setItem('admin-projects', JSON.stringify(updatedProjects))
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'general': return MessageSquare
      case 'project': return FolderOpen
      case 'service': return Shield
      case 'suggestion': return Code2
      default: return MessageSquare
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'general': return 'text-blue-500'
      case 'project': return 'text-green-500'
      case 'service': return 'text-red-500'
      case 'suggestion': return 'text-yellow-500'
      default: return 'text-gray-500'
    }
  }

  if (!isAdmin) {
    return (
      <motion.button
        onClick={handleAdminLogin}
        className="fixed bottom-4 right-4 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Settings className="w-5 h-5" />
      </motion.button>
    )
  }

  return (
    <>
      {/* Admin Toggle Button */}
      <motion.button
        onClick={() => setShowAdmin(!showAdmin)}
        className="fixed bottom-4 right-4 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Settings className="w-5 h-5" />
      </motion.button>

      {/* Admin Panel */}
      <AnimatePresence>
        {showAdmin && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-0 right-0 h-full w-96 bg-background border-l border-border shadow-2xl z-40 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                  {language === "en" ? "Admin Panel" : "لوحة الإدارة"}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdmin(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                <Button
                  variant={selectedTab === 'feedbacks' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTab('feedbacks')}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {language === "en" ? "Feedbacks" : "الملاحظات"}
                </Button>
                <Button
                  variant={selectedTab === 'projects' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTab('projects')}
                >
                  <FolderOpen className="w-4 h-4 mr-2" />
                  {language === "en" ? "Projects" : "المشاريع"}
                </Button>
                <Button
                  variant={selectedTab === 'settings' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTab('settings')}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {language === "en" ? "Settings" : "الإعدادات"}
                </Button>
              </div>

              {/* Feedbacks Tab */}
              {selectedTab === 'feedbacks' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    {language === "en" ? "Manage Feedbacks" : "إدارة الملاحظات"}
                  </h3>
                  {feedbacks.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      {language === "en" ? "No feedbacks yet" : "لا توجد ملاحظات بعد"}
                    </p>
                  ) : (
                    feedbacks.map((feedback) => {
                      const CategoryIcon = getCategoryIcon(feedback.category)
                      return (
                        <Card key={feedback.id} className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <CategoryIcon className={`w-4 h-4 ${getCategoryColor(feedback.category)}`} />
                              <span className="font-medium">{feedback.name}</span>
                              <Badge variant={feedback.status === 'visible' ? 'default' : 'secondary'}>
                                {feedback.status === 'visible' 
                                  ? (language === "en" ? "Visible" : "مرئي")
                                  : (language === "en" ? "Hidden" : "مخفي")
                                }
                              </Badge>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => toggleFeedbackVisibility(feedback.id)}
                              >
                                {feedback.status === 'visible' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteFeedback(feedback.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{feedback.message}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{feedback.email}</span>
                            <span>•</span>
                            <span>{feedback.rating}/5 ⭐</span>
                            <span>•</span>
                            <span>{new Date(feedback.timestamp).toLocaleDateString()}</span>
                          </div>
                        </Card>
                      )
                    })
                  )}
                </div>
              )}

              {/* Projects Tab */}
              {selectedTab === 'projects' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    {language === "en" ? "Manage Projects" : "إدارة المشاريع"}
                  </h3>
                  {projects.map((project) => (
                    <Card key={project.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">
                            {language === "en" ? project.title : project.titleAr}
                          </h4>
                          <p className="text-sm text-muted-foreground">{project.id}</p>
                        </div>
                        <Button
                          size="sm"
                          variant={project.visible ? "default" : "outline"}
                          onClick={() => toggleProjectVisibility(project.id)}
                        >
                          {project.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* Settings Tab */}
              {selectedTab === 'settings' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    {language === "en" ? "Settings" : "الإعدادات"}
                  </h3>
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">
                      {language === "en" ? "Animation Controls" : "تحكم الرسوم المتحركة"}
                    </h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">
                          {language === "en" ? "Enable Hero Animations" : "تفعيل رسوم الهيرو"}
                        </span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">
                          {language === "en" ? "Enable Project Animations" : "تفعيل رسوم المشاريع"}
                        </span>
                      </label>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}







