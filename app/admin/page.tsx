'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Settings, 
  Eye, 
  EyeOff, 
  ArrowUp, 
  ArrowDown, 
  Edit, 
  Trash2, 
  Save, 
  BarChart3,
  FileText,
  Star,
  Terminal,
  Code,
  Monitor,
  Shield,
  Users,
  LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AdminStats } from '@/components/admin-stats';
import { AdminFileEditor } from '@/components/admin-file-editor';
import { AdminTerminal } from '@/components/admin-terminal';
import { AdminUsers } from '@/components/admin-users';

interface Project {
  id: string;
  title: string;
  titleAr: string;
  short: string;
  shortAr: string;
  cover: string;
  tags: string[];
  year: number;
  live: string;
  repo: string;
  order: number;
  visible: boolean;
}

interface Service {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  icon: string;
  order: number;
  visible: boolean;
}

interface Feedback {
  id: string;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  content: string;
  contentAr: string;
  avatar: string;
  rating: number;
  visible: boolean;
  order: number;
  status?: string;
  email?: string;
  message?: string;
  createdAt?: string;
}

interface AdminSettings {
  showFeedback: boolean;
  showProjects: boolean;
  showServices: boolean;
  siteTitle: string;
  siteTitleAr: string;
  siteDescription: string;
  siteDescriptionAr: string;
  contactEmail?: string;
  contactPhone?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export default function AdminDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [settings, setSettings] = useState<AdminSettings>({
    showFeedback: true,
    showProjects: true,
    showServices: true,
    siteTitle: 'Mohamed Sarhan',
    siteTitleAr: 'محمد سرحان',
    siteDescription: 'Full Stack Developer',
    siteDescriptionAr: 'مطور Full Stack'
  });
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedFile, setSelectedFile] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [terminalCommand, setTerminalCommand] = useState('');
  const [terminalOutput, setTerminalOutput] = useState('');

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem('admin-auth')
    sessionStorage.removeItem('admin-session')
    document.cookie = 'admin-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    
    // Redirect to login
    router.push('/admin/login')
  }

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('admin-auth') || 
                  sessionStorage.getItem('admin-session') ||
                  document.cookie.includes('admin-auth')
    
    if (token) {
      setAuthenticated(true)
      loadData()
      
      // Track user login
      trackUserLogin()
    } else {
      router.push('/admin/login')
    }
  }, [router]);

  const trackUserLogin = async () => {
    try {
      // Get device info
      const deviceInfo = {
        ip: 'Loading...', // Will be updated by server
        userAgent: navigator.userAgent,
        deviceType: /Mobile|Android/i.test(navigator.userAgent) ? 'mobile' : 
                   /Tablet|iPad/i.test(navigator.userAgent) ? 'tablet' : 'desktop',
        browser: navigator.userAgent.includes('Chrome') ? 'Chrome' :
                navigator.userAgent.includes('Firefox') ? 'Firefox' :
                navigator.userAgent.includes('Safari') ? 'Safari' :
                navigator.userAgent.includes('Edge') ? 'Edge' : 'Unknown',
        os: navigator.userAgent.includes('Windows') ? 'Windows' :
            navigator.userAgent.includes('Mac') ? 'macOS' :
            navigator.userAgent.includes('Linux') ? 'Linux' :
            navigator.userAgent.includes('Android') ? 'Android' :
            navigator.userAgent.includes('iOS') ? 'iOS' : 'Unknown',
        timestamp: new Date().toISOString()
      }

      // Send to server
      await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'Mohamed',
          deviceInfo
        })
      })
    } catch (error) {
      console.error('Error tracking user login:', error)
    }
  }

  const loadData = async () => {
    try {
      setLoading(true);
      // Load projects
      const projectsRes = await fetch('/api/admin/projects');
      const projectsData = await projectsRes.json();
      setProjects(projectsData);

      // Load services
      const servicesRes = await fetch('/api/admin/services');
      const servicesData = await servicesRes.json();
      setServices(servicesData);

      // Load feedbacks
      const feedbacksRes = await fetch('/api/admin/feedbacks');
      const feedbacksData = await feedbacksRes.json();
      setFeedbacks(feedbacksData);

      // Load settings
      const settingsRes = await fetch('/api/admin/settings');
      const settingsData = await settingsRes.json();
      setSettings(settingsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProjectOrder = async (projectId: string, direction: 'up' | 'down') => {
    try {
    const projectIndex = projects.findIndex(p => p.id === projectId);
    if (projectIndex === -1) return;

    const newProjects = [...projects];
    const targetIndex = direction === 'up' ? projectIndex - 1 : projectIndex + 1;
    
    if (targetIndex < 0 || targetIndex >= newProjects.length) return;

    [newProjects[projectIndex], newProjects[targetIndex]] = [newProjects[targetIndex], newProjects[projectIndex]];
    
    // Update order numbers
    newProjects.forEach((project, index) => {
      project.order = index;
    });

    setProjects(newProjects);
      
      const response = await fetch('/api/admin/projects', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProjects)
    });
      
      if (!response.ok) {
        throw new Error('Failed to update project order');
      }
      
      console.log('Project order updated successfully');
    } catch (error) {
      console.error('Error updating project order:', error);
      alert('Error updating project order');
    }
  };

  const toggleProjectVisibility = async (projectId: string) => {
    try {
    const newProjects = projects.map(p => 
      p.id === projectId ? { ...p, visible: !p.visible } : p
    );
    setProjects(newProjects);
      
      const response = await fetch('/api/admin/projects', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProjects)
    });
      
      if (!response.ok) {
        throw new Error('Failed to update project visibility');
      }
      
      console.log('Project visibility updated successfully');
    } catch (error) {
      console.error('Error updating project visibility:', error);
      alert('Error updating project visibility');
    }
  };

  const toggleFeedbackVisibility = async (feedbackId: string) => {
    try {
    const newFeedbacks = feedbacks.map(f => 
      f.id === feedbackId ? { ...f, visible: !f.visible } : f
    );
    setFeedbacks(newFeedbacks);
      
      const response = await fetch('/api/admin/feedbacks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFeedbacks)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update feedback');
      }
      
      console.log('Feedback visibility updated successfully');
    } catch (error) {
      console.error('Error updating feedback visibility:', error);
      alert('Error updating feedback visibility');
    }
  };

  const deleteFeedback = async (feedbackId: string) => {
    try {
      const newFeedbacks = feedbacks.filter(f => f.id !== feedbackId);
      setFeedbacks(newFeedbacks);
      
      const response = await fetch('/api/admin/feedbacks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFeedbacks)
    });
      
      if (!response.ok) {
        throw new Error('Failed to delete feedback');
      }
      
      console.log('Feedback deleted successfully');
    } catch (error) {
      console.error('Error deleting feedback:', error);
      alert('Error deleting feedback');
    }
  };

  const updateSettings = async (newSettings: Partial<AdminSettings>) => {
    try {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
      
      const response = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedSettings)
    });
      
      if (!response.ok) {
        throw new Error('Failed to update settings');
      }
      
      console.log('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Error updating settings');
    }
  };

  // No logout needed - open access

  const executeTerminalCommand = async (command: string) => {
    setTerminalOutput(prev => prev + `$ ${command}\n`);
    // Simulate command execution
    setTimeout(() => {
      setTerminalOutput(prev => prev + `Command executed: ${command}\n`);
    }, 1000);
  };

  const loadFile = async (filePath: string) => {
    try {
      const response = await fetch(`/api/admin/files?path=${encodeURIComponent(filePath)}`);
      const data = await response.json();
      
      if (data.error) {
        alert(`Error loading file: ${data.error}`);
        return;
      }
      
      setFileContent(data.content);
      setSelectedFile(filePath);
      console.log('File loaded successfully');
    } catch (error) {
      console.error('Error loading file:', error);
      alert('Error loading file');
    }
  };

  const saveFile = async () => {
    try {
      const response = await fetch('/api/admin/files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: selectedFile, content: fileContent })
      });
      
      const data = await response.json();
      
      if (data.error) {
        alert(`Error saving file: ${data.error}`);
        return;
      }
      
      alert('File saved successfully!');
      console.log('File saved successfully');
    } catch (error) {
      console.error('Error saving file:', error);
      alert('Error saving file');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Checking authentication...</p>
              </div>
              </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
              <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading Admin Dashboard...</p>
              </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-gray-700 z-50">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          </div>
          
          <nav className="space-y-2">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'projects', label: 'Projects', icon: FileText },
              { id: 'services', label: 'Services', icon: Settings },
              { id: 'feedbacks', label: 'Feedbacks', icon: Star },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'settings', label: 'Settings', icon: Monitor },
              { id: 'files', label: 'File Editor', icon: Code },
              { id: 'terminal', label: 'Terminal', icon: Terminal }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === id 
                    ? "bg-blue-600 text-white" 
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </nav>
          
          <div className="mt-8 pt-8 border-t border-gray-700">
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="w-full flex items-center gap-2 text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
            >
              <LogOut className="w-4 h-4" />
              تسجيل الخروج
            </Button>
            <div className="text-center text-sm text-gray-400 mt-4">
              <p>لوحة الإدارة الآمنة</p>
              <p>Secure Admin Panel</p>
            </div>
          </div>
        </div>
        </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-white mb-2">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Dashboard
            </h2>
            <p className="text-gray-400">
              Manage your portfolio content and settings
            </p>
          </motion.div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <AdminStats 
              projects={projects} 
              services={services} 
              feedbacks={feedbacks} 
            />
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Manage Projects</CardTitle>
                <CardDescription className="text-gray-400">
                  Control project visibility and ordering
                </CardDescription>
                </CardHeader>
                <CardContent>
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-6 bg-gray-700/50 border border-gray-600 rounded-xl hover:bg-gray-700 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <FileText className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white text-lg">{project.title}</h3>
                          <p className="text-sm text-gray-300 line-clamp-2">{project.short}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                            <span>Year: {project.year}</span>
                            <span>Order: {project.order}</span>
                            <Badge 
                              variant={project.visible ? "default" : "secondary"}
                              className={project.visible 
                                ? "bg-green-500/20 text-green-400 border-green-500/30" 
                                : "bg-red-500/20 text-red-400 border-red-500/30"
                              }
                            >
                              {project.visible ? 'Visible' : 'Hidden'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateProjectOrder(project.id, 'up')}
                          disabled={index === 0}
                          className="border-gray-500 text-gray-300 hover:bg-gray-600"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateProjectOrder(project.id, 'down')}
                          disabled={index === projects.length - 1}
                          className="border-gray-500 text-gray-300 hover:bg-gray-600"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleProjectVisibility(project.id)}
                          className={`border-gray-500 text-gray-300 hover:bg-gray-600 ${
                            project.visible 
                              ? 'text-green-400 hover:text-green-300' 
                              : 'text-red-400 hover:text-red-300'
                          }`}
                        >
                          {project.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-gray-500 text-gray-300 hover:bg-gray-600"
                          onClick={() => {
                            console.log('Edit project:', project.id);
                            // TODO: Implement edit functionality
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                </CardContent>
              </Card>
          )}

          {/* Feedbacks Tab */}
          {activeTab === 'feedbacks' && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Manage Feedbacks</CardTitle>
                <CardDescription className="text-gray-400">
                  Control feedback visibility and manage reviews
                </CardDescription>
                </CardHeader>
                <CardContent>
                <div className="space-y-4">
                  {feedbacks.map((feedback) => (
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
                          <Button 
                            size="sm" 
                            variant="outline"
                            className={`border-green-500/50 hover:bg-green-500/10 ${
                              feedback.visible 
                                ? 'text-green-400 bg-green-500/20' 
                                : 'text-gray-400'
                            }`}
                            onClick={() => toggleFeedbackVisibility(feedback.id)}
                          >
                            {feedback.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                            onClick={() => deleteFeedback(feedback.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                </CardContent>
              </Card>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Manage Services</CardTitle>
                <CardDescription className="text-gray-400">
                  Control service visibility and ordering
                </CardDescription>
                </CardHeader>
                <CardContent>
                <div className="space-y-4">
                  {services.map((service) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-6 bg-gray-700/50 border border-gray-600 rounded-xl hover:bg-gray-700 transition-all duration-300"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{service.icon}</span>
                          <h3 className="font-semibold text-white text-lg">{service.title}</h3>
                          <Badge 
                            variant={service.visible ? "default" : "secondary"}
                            className={service.visible 
                              ? "bg-green-500/20 text-green-400 border-green-500/30" 
                              : "bg-red-500/20 text-red-400 border-red-500/30"
                            }
                          >
                            {service.visible ? 'Visible' : 'Hidden'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-300">{service.description}</p>
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
                  ))}
                </div>
                </CardContent>
              </Card>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-2xl">General Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Configure site settings and preferences
                </CardDescription>
                </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-300">Site Title</label>
                    <Input 
                      value={settings.siteTitle}
                      onChange={(e) => updateSettings({ siteTitle: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-300">Contact Email</label>
                    <Input 
                      value={settings.contactEmail || ''}
                      onChange={(e) => updateSettings({ contactEmail: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-300">Phone Number</label>
                    <Input 
                      value={settings.contactPhone || ''}
                      onChange={(e) => updateSettings({ contactPhone: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-300">LinkedIn URL</label>
                    <Input 
                      value={settings.socialLinks?.linkedin || ''}
                      onChange={(e) => updateSettings({ 
                        socialLinks: { ...settings.socialLinks, linkedin: e.target.value }
                      })}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-300">Show Feedbacks</label>
                      <p className="text-xs text-gray-400">Display feedback section on website</p>
                    </div>
                    <Switch
                      checked={settings.showFeedback}
                      onCheckedChange={(checked) => updateSettings({ showFeedback: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-300">Show Projects</label>
                      <p className="text-xs text-gray-400">Display projects section on website</p>
                    </div>
                    <Switch
                      checked={settings.showProjects}
                      onCheckedChange={(checked) => updateSettings({ showProjects: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-300">Show Services</label>
                      <p className="text-xs text-gray-400">Display services section on website</p>
                    </div>
                    <Switch
                      checked={settings.showServices}
                      onCheckedChange={(checked) => updateSettings({ showServices: checked })}
                    />
                  </div>
                </div>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    console.log('Saving settings:', settings);
                    updateSettings(settings);
                  }}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
                </CardContent>
              </Card>
          )}

          {/* File Editor Tab */}
          {activeTab === 'files' && (
            <AdminFileEditor />
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <AdminUsers />
          )}

          {/* Terminal Tab */}
          {activeTab === 'terminal' && (
            <AdminTerminal />
          )}
            </div>
      </div>
    </div>
  );
}
