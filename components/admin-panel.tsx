"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Settings, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  X, 
  Eye,
  MessageCircle,
  Star,
  User,
  Project,
  Shield
} from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

// Data will be loaded from API

export function AdminPanel() {
  const { language } = useLanguage()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [activeTab, setActiveTab] = useState("projects")
  const [editingProject, setEditingProject] = useState(null)
  const [newProject, setNewProject] = useState({ title: "", description: "", status: "draft" })
  const [projects, setProjects] = useState<any[]>([])
  const [feedbacks, setFeedbacks] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Simple authentication
  const handleLogin = () => {
    if (password === "admin123") {
      setIsAuthenticated(true)
    } else {
      alert(language === "en" ? "Invalid password" : "كلمة مرور غير صحيحة")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword("")
  }

  // Load data from API
  useEffect(() => {
    if (isAuthenticated) {
      loadData()
    }
  }, [isAuthenticated])

  const loadData = async () => {
    try {
      setIsLoading(true)
      
      // Load projects
      const projectsRes = await fetch('/api/admin/projects')
      const projectsData = await projectsRes.json()
      setProjects(projectsData)
      
      // Load feedbacks
      const feedbacksRes = await fetch('/api/admin/feedbacks')
      const feedbacksData = await feedbacksRes.json()
      setFeedbacks(feedbacksData)
      
      // Load services
      const servicesRes = await fetch('/api/admin/services')
      const servicesData = await servicesRes.json()
      setServices(servicesData)
      
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddProject = async () => {
    try {
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([...projects, { ...newProject, id: Date.now() }])
      })
      
      if (response.ok) {
        loadData() // Reload data
        setNewProject({ title: "", description: "", status: "draft" })
      }
    } catch (error) {
      console.error('Error adding project:', error)
    }
  }

  const handleDeleteProject = async (id: number) => {
    try {
      const updatedProjects = projects.filter(p => p.id !== id)
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProjects)
      })
      
      if (response.ok) {
        loadData() // Reload data
      }
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  const handleDeleteFeedback = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/feedbacks?id=${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        loadData() // Reload data
      }
    } catch (error) {
      console.error('Error deleting feedback:', error)
    }
  }

  const handleApproveFeedback = async (id: string) => {
    try {
      const response = await fetch('/api/admin/feedbacks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'approved' })
      })
      
      if (response.ok) {
        loadData() // Reload data
      }
    } catch (error) {
      console.error('Error approving feedback:', error)
    }
  }

  if (!isAuthenticated) {
    return (
      <section id="admin" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-center flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  {language === "en" ? "Admin Login" : "تسجيل دخول الإدارة"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {language === "en" ? "Password" : "كلمة المرور"}
                  </label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={language === "en" ? "Enter admin password" : "أدخل كلمة مرور الإدارة"}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  />
                </div>
                <Button onClick={handleLogin} className="w-full">
                  {language === "en" ? "Login" : "تسجيل الدخول"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  {language === "en" ? "Demo password: admin123" : "كلمة المرور التجريبية: admin123"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-gray-700 z-50">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          </div>
          
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("projects")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "projects" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <Project className="w-5 h-5" />
              {language === "en" ? "Projects" : "المشاريع"}
            </button>
            
            <button
              onClick={() => setActiveTab("services")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "services" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <Settings className="w-5 h-5" />
              {language === "en" ? "Services" : "الخدمات"}
            </button>
            
            <button
              onClick={() => setActiveTab("feedbacks")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "feedbacks" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <MessageCircle className="w-5 h-5" />
              {language === "en" ? "Feedbacks" : "الملاحظات"}
            </button>
            
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "settings" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <Settings className="w-5 h-5" />
              {language === "en" ? "Settings" : "الإعدادات"}
            </button>
          </nav>
          
          <div className="mt-8 pt-8 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-400 hover:bg-red-900/20 transition-colors"
            >
              <X className="w-5 h-5" />
              {language === "en" ? "Logout" : "تسجيل الخروج"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-white mb-2">
              {language === "en" ? "Dashboard" : "لوحة التحكم"}
            </h2>
            <p className="text-gray-400">
              {language === "en" ? "Manage your portfolio content" : "إدارة محتوى ملفك الشخصي"}
            </p>
        </motion.div>

          {/* Content based on active tab */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                  <CardTitle className="flex items-center justify-between text-white">
                    <span className="text-2xl">{language === "en" ? "Manage Projects" : "إدارة المشاريع"}</span>
                    <Button 
                      onClick={() => setEditingProject({})} 
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                    >
                    <Plus className="w-4 h-4" />
                    {language === "en" ? "Add Project" : "إضافة مشروع"}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="space-y-4">
                    {isLoading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="text-gray-400 mt-2">Loading projects...</p>
                      </div>
                    ) : projects.length === 0 ? (
                      <div className="text-center py-8">
                        <Project className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400">No projects found</p>
                      </div>
                    ) : (
                      projects.map((project) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between p-6 bg-gray-700/50 border border-gray-600 rounded-xl hover:bg-gray-700 transition-all duration-300"
                        >
                          <div className="flex-1">
                            <h3 className="font-semibold text-white text-lg">{project.title || project.titleAr}</h3>
                            <div className="flex items-center gap-6 text-sm text-gray-300 mt-2">
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {project.views || 0} {language === "en" ? "views" : "مشاهدة"}
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="w-4 h-4" />
                                {project.likes || 0} {language === "en" ? "likes" : "إعجاب"}
                              </span>
                              <Badge 
                                variant={project.visible ? "default" : "secondary"}
                                className={project.visible 
                                  ? "bg-green-500/20 text-green-400 border-green-500/30" 
                                  : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                }
                              >
                                {project.visible ? "visible" : "hidden"}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-gray-500 text-gray-300 hover:bg-gray-600"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                              onClick={() => handleDeleteProject(project.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))
                    )}
                </div>
              </CardContent>
            </Card>
            </div>
          )}

          {/* Feedbacks Tab */}
          {activeTab === "feedbacks" && (
            <div className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">{language === "en" ? "Manage Feedbacks" : "إدارة الملاحظات"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {isLoading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="text-gray-400 mt-2">Loading feedbacks...</p>
                      </div>
                    ) : feedbacks.length === 0 ? (
                      <div className="text-center py-8">
                        <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400">No feedbacks found</p>
                      </div>
                    ) : (
                      feedbacks.map((feedback) => (
                        <motion.div
                          key={feedback.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-6 bg-gray-700/50 border border-gray-600 rounded-xl hover:bg-gray-700 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <h3 className="font-semibold text-white text-lg">{feedback.name}</h3>
                                <Badge 
                                  variant={feedback.status === "new" ? "default" : "secondary"}
                                  className={feedback.status === "new" 
                                    ? "bg-green-500/20 text-green-400 border-green-500/30" 
                                    : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                                  }
                                >
                                  {feedback.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-300 mb-3">{feedback.email}</p>
                              <div className="flex items-center gap-1 mb-3">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-5 h-5 ${
                                      star <= feedback.rating
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-500"
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="text-sm text-gray-200">{feedback.message}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {feedback.status === "new" && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="border-green-500/50 text-green-400 hover:bg-green-500/10"
                                  onClick={() => handleApproveFeedback(feedback.id)}
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                              )}
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                                onClick={() => handleDeleteFeedback(feedback.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === "services" && (
            <div className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">{language === "en" ? "Manage Services" : "إدارة الخدمات"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {isLoading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="text-gray-400 mt-2">Loading services...</p>
                      </div>
                    ) : services.length === 0 ? (
                      <div className="text-center py-8">
                        <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400">No services found</p>
                      </div>
                    ) : (
                      services.map((service) => (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between p-6 bg-gray-700/50 border border-gray-600 rounded-xl hover:bg-gray-700 transition-all duration-300"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">{service.icon}</span>
                              <h3 className="font-semibold text-white text-lg">{language === "en" ? service.title : service.titleAr}</h3>
                              <Badge 
                                variant={service.visible ? "default" : "secondary"}
                                className={service.visible 
                                  ? "bg-green-500/20 text-green-400 border-green-500/30" 
                                  : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                }
                              >
                                {service.visible ? "visible" : "hidden"}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-300">{language === "en" ? service.description : service.descriptionAr}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-gray-500 text-gray-300 hover:bg-gray-600"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">{language === "en" ? "General Settings" : "الإعدادات العامة"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-300">
                        {language === "en" ? "Site Title" : "عنوان الموقع"}
                      </label>
                      <Input 
                        placeholder="Mohamed Sarhan Portfolio" 
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-300">
                        {language === "en" ? "Contact Email" : "بريد التواصل"}
                      </label>
                      <Input 
                        placeholder="prof7mohamedsarhan@gmail.com" 
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-300">
                        {language === "en" ? "Phone Number" : "رقم الهاتف"}
                      </label>
                      <Input 
                        placeholder="+201040922321" 
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-300">
                        {language === "en" ? "LinkedIn URL" : "رابط لينكد إن"}
                      </label>
                      <Input 
                        placeholder="https://www.linkedin.com/in/mohamed-sarhan" 
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    {language === "en" ? "Save Settings" : "حفظ الإعدادات"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
