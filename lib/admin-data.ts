import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'admin-data.json')

export interface AdminData {
  settings: {
    showFeedback: boolean
    showProjects: boolean
    showServices: boolean
    siteTitle: string
    siteTitleAr: string
    siteDescription: string
    siteDescriptionAr: string
    contactEmail?: string
    contactPhone?: string
    socialLinks?: {
      github?: string
      linkedin?: string
      twitter?: string
    }
  }
  projects: any[]
  services: any[]
  feedbacks: any[]
}

export function readAdminData(): AdminData {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    // Return default data if file doesn't exist
    return {
      settings: {
        showFeedback: true,
        showProjects: true,
        showServices: true,
        siteTitle: 'Mohamed Sarhan',
        siteTitleAr: 'محمد سرحان',
        siteDescription: 'Full Stack Developer & AI Engineer',
        siteDescriptionAr: 'مطور Full Stack ومهندس ذكاء اصطناعي'
      },
      projects: [],
      services: [],
      feedbacks: []
    }
  }
}

export function writeAdminData(data: AdminData): void {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error writing admin data:', error)
    throw new Error('Failed to save data')
  }
}

export function updateSettings(newSettings: Partial<AdminData['settings']>): AdminData {
  const data = readAdminData()
  data.settings = { ...data.settings, ...newSettings }
  writeAdminData(data)
  return data
}

export function updateProjects(projects: any[]): AdminData {
  const data = readAdminData()
  data.projects = projects
  writeAdminData(data)
  return data
}

export function updateServices(services: any[]): AdminData {
  const data = readAdminData()
  data.services = services
  writeAdminData(data)
  return data
}

export function addFeedback(feedback: any): AdminData {
  const data = readAdminData()
  feedback.id = Date.now().toString()
  feedback.createdAt = new Date().toISOString()
  data.feedbacks.unshift(feedback)
  writeAdminData(data)
  return data
}

export function updateFeedback(id: string, updates: any): AdminData {
  const data = readAdminData()
  const index = data.feedbacks.findIndex(f => f.id === id)
  if (index !== -1) {
    data.feedbacks[index] = { ...data.feedbacks[index], ...updates }
    writeAdminData(data)
  }
  return data
}

export function deleteFeedback(id: string): AdminData {
  const data = readAdminData()
  data.feedbacks = data.feedbacks.filter(f => f.id !== id)
  writeAdminData(data)
  return data
}



