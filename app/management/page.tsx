"use client"

import { AdminPanel } from "@/components/admin-panel"
import { SiteSettingsProvider } from "@/components/site-settings-provider"

export default function ManagementPage() {
  return (
    <SiteSettingsProvider>
      <div className="min-h-screen">
        <AdminPanel />
      </div>
    </SiteSettingsProvider>
  )
}



