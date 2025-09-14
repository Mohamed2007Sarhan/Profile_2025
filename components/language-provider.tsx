"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Get language from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en"
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)

    // Update document direction for RTL support
    document.documentElement.dir = newLanguage === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = newLanguage
  }

  useEffect(() => {
    if (mounted) {
      // Set initial direction and language
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
      document.documentElement.lang = language
    }
  }, [language, mounted])

  const value = {
    language,
    setLanguage,
    toggleLanguage,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
