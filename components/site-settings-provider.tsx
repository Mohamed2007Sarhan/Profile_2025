"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface SiteSettings {
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

const SiteSettingsContext = createContext<{
  settings: SiteSettings
  loading: boolean
}>({
  settings: {
    showFeedback: true,
    showProjects: true,
    showServices: true,
    siteTitle: 'Mohamed Sarhan',
    siteTitleAr: 'محمد سرحان',
    siteDescription: 'Full Stack Developer & AI Engineer',
    siteDescriptionAr: 'مطور Full Stack ومهندس ذكاء اصطناعي'
  },
  loading: true
})

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>({
    showFeedback: true,
    showProjects: true,
    showServices: true,
    siteTitle: 'Mohamed Sarhan',
    siteTitleAr: 'محمد سرحان',
    siteDescription: 'Full Stack Developer & AI Engineer',
    siteDescriptionAr: 'مطور Full Stack ومهندس ذكاء اصطناعي'
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch('/api/admin/settings')
        const data = await response.json()
        setSettings(data)
      } catch (error) {
        console.error('Error loading site settings:', error)
        // Use default settings if API fails
      } finally {
        setLoading(false)
      }
    }

    loadSettings()
  }, [])

  return (
    <SiteSettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext)
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider')
  }
  return context
}







