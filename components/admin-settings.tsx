"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Save, RefreshCw } from "lucide-react"

interface AdminSettings {
  showFeedback: boolean
  showProjects: boolean
  showServices: boolean
  siteTitle: string
  siteTitleAr: string
  siteDescription: string
  siteDescriptionAr: string
  siteKeywords?: string
  siteKeywordsAr?: string
  contactEmail?: string
  contactPhone?: string
  socialLinks?: {
    github?: string
    linkedin?: string
    twitter?: string
  }
  analytics?: {
    googleAnalytics?: string
    googleTagManager?: string
  }
  seo?: {
    metaDescription?: string
    metaDescriptionAr?: string
    ogImage?: string
    twitterCard?: string
  }
}

export function AdminSettings() {
  const [settings, setSettings] = useState<AdminSettings>({
    showFeedback: true,
    showProjects: true,
    showServices: true,
    siteTitle: 'Mohamed Sarhan',
    siteTitleAr: 'محمد سرحان',
    siteDescription: 'Full Stack Developer & AI Engineer',
    siteDescriptionAr: 'مطور Full Stack ومهندس ذكاء اصطناعي',
    siteKeywords: 'web development, mobile development, AI, machine learning, full stack',
    siteKeywordsAr: 'تطوير مواقع, تطوير تطبيقات, ذكاء اصطناعي, تعلم آلة, مطور كامل',
    contactEmail: 'mohamed@example.com',
    contactPhone: '+1234567890',
    socialLinks: {
      github: 'https://github.com/Mohamed2007Sarhan',
      linkedin: 'https://linkedin.com/in/mohamed-sarhan',
      twitter: 'https://twitter.com/mohamed_sarhan'
    },
    analytics: {
      googleAnalytics: '',
      googleTagManager: ''
    },
    seo: {
      metaDescription: 'Professional portfolio of Mohamed Sarhan - Full Stack Developer specializing in web development, mobile apps, and AI solutions.',
      metaDescriptionAr: 'الملف الشخصي المهني لمحمد سرحان - مطور Full Stack متخصص في تطوير المواقع والتطبيقات وحلول الذكاء الاصطناعي.',
      ogImage: '/images/og-image.jpg',
      twitterCard: 'summary_large_image'
    }
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings')
      const data = await response.json()
      setSettings(data)
    } catch (error) {
      console.error('Error loading settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateSettings = async (newSettings: Partial<AdminSettings>) => {
    const updatedSettings = { ...settings, ...newSettings }
    setSettings(updatedSettings)
  }

  const saveSettings = async () => {
    setSaving(true)
    try {
      await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })
      // Show success message or notification
      console.log('Settings saved successfully')
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div>Loading settings...</div>
  }

  return (
    <div className="space-y-6">
      {/* Basic Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Settings</CardTitle>
          <CardDescription>
            Configure basic site information and visibility
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="siteTitle">Site Title (English)</Label>
                <Input
                  id="siteTitle"
                  value={settings.siteTitle}
                  onChange={(e) => updateSettings({ siteTitle: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="siteTitleAr">Site Title (Arabic)</Label>
                <Input
                  id="siteTitleAr"
                  value={settings.siteTitleAr}
                  onChange={(e) => updateSettings({ siteTitleAr: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="siteDescription">Site Description (English)</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => updateSettings({ siteDescription: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="siteDescriptionAr">Site Description (Arabic)</Label>
                <Textarea
                  id="siteDescriptionAr"
                  value={settings.siteDescriptionAr}
                  onChange={(e) => updateSettings({ siteDescriptionAr: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Visibility Controls</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showFeedback">Show Feedbacks Section</Label>
                  <p className="text-sm text-gray-600">Display the feedbacks section on the main site</p>
                </div>
                <Switch
                  id="showFeedback"
                  checked={settings.showFeedback}
                  onCheckedChange={(checked) => updateSettings({ showFeedback: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showProjects">Show Projects Section</Label>
                  <p className="text-sm text-gray-600">Display the projects section on the main site</p>
                </div>
                <Switch
                  id="showProjects"
                  checked={settings.showProjects}
                  onCheckedChange={(checked) => updateSettings({ showProjects: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showServices">Show Services Section</Label>
                  <p className="text-sm text-gray-600">Display the services section on the main site</p>
                </div>
                <Switch
                  id="showServices"
                  checked={settings.showServices}
                  onCheckedChange={(checked) => updateSettings({ showServices: checked })}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            Update contact details and social media links
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="contactEmail">Email Address</Label>
              <Input
                id="contactEmail"
                type="email"
                value={settings.contactEmail || ''}
                onChange={(e) => updateSettings({ contactEmail: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="contactPhone">Phone Number</Label>
              <Input
                id="contactPhone"
                value={settings.contactPhone || ''}
                onChange={(e) => updateSettings({ contactPhone: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Social Media Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  value={settings.socialLinks?.github || ''}
                  onChange={(e) => updateSettings({ 
                    socialLinks: { ...settings.socialLinks, github: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={settings.socialLinks?.linkedin || ''}
                  onChange={(e) => updateSettings({ 
                    socialLinks: { ...settings.socialLinks, linkedin: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  value={settings.socialLinks?.twitter || ''}
                  onChange={(e) => updateSettings({ 
                    socialLinks: { ...settings.socialLinks, twitter: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Settings */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Settings</CardTitle>
          <CardDescription>
            Configure search engine optimization settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="metaDescription">Meta Description (English)</Label>
              <Textarea
                id="metaDescription"
                value={settings.seo?.metaDescription || ''}
                onChange={(e) => updateSettings({ 
                  seo: { ...settings.seo, metaDescription: e.target.value }
                })}
              />
            </div>
            <div>
              <Label htmlFor="metaDescriptionAr">Meta Description (Arabic)</Label>
              <Textarea
                id="metaDescriptionAr"
                value={settings.seo?.metaDescriptionAr || ''}
                onChange={(e) => updateSettings({ 
                  seo: { ...settings.seo, metaDescriptionAr: e.target.value }
                })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="siteKeywords">Keywords (English)</Label>
              <Input
                id="siteKeywords"
                value={settings.siteKeywords || ''}
                onChange={(e) => updateSettings({ siteKeywords: e.target.value })}
                placeholder="web development, mobile development, AI"
              />
            </div>
            <div>
              <Label htmlFor="siteKeywordsAr">Keywords (Arabic)</Label>
              <Input
                id="siteKeywordsAr"
                value={settings.siteKeywordsAr || ''}
                onChange={(e) => updateSettings({ siteKeywordsAr: e.target.value })}
                placeholder="تطوير مواقع, تطوير تطبيقات, ذكاء اصطناعي"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
          <CardDescription>
            Configure analytics and tracking
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="googleAnalytics">Google Analytics ID</Label>
              <Input
                id="googleAnalytics"
                value={settings.analytics?.googleAnalytics || ''}
                onChange={(e) => updateSettings({ 
                  analytics: { ...settings.analytics, googleAnalytics: e.target.value }
                })}
                placeholder="GA-XXXXXXXXX"
              />
            </div>
            <div>
              <Label htmlFor="googleTagManager">Google Tag Manager ID</Label>
              <Input
                id="googleTagManager"
                value={settings.analytics?.googleTagManager || ''}
                onChange={(e) => updateSettings({ 
                  analytics: { ...settings.analytics, googleTagManager: e.target.value }
                })}
                placeholder="GTM-XXXXXXX"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={saveSettings} disabled={saving}>
          {saving ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  )
}







