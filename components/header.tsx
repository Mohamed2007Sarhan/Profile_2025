"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Globe, Menu, X, Settings } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/hooks/use-language"
import Link from "next/link"

const navigation = [
  { name: "Home", href: "#home", nameAr: "الرئيسية" },
  { name: "About", href: "#about", nameAr: "نبذة" },
  { name: "Skills", href: "#skills", nameAr: "المهارات" },
  { name: "Projects", href: "#projects", nameAr: "المشاريع" },
  { name: "Services", href: "#services", nameAr: "الخدمات" },
  { name: "Certifications", href: "#certifications", nameAr: "الشهادات" },
  { name: "Testimonials", href: "#testimonials", nameAr: "الشهادات" },
  { name: "Achievements", href: "#achievements", nameAr: "الإنجازات" },
  { name: "Feedback", href: "#feedback", nameAr: "الملاحظات" },
  { name: "Contact", href: "#contact", nameAr: "التواصل" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const { language, toggleLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const handleSectionChange = () => {
      const sections = navigation.map((item) => item.href.slice(1))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("scroll", handleSectionChange)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("scroll", handleSectionChange)
    }
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    // Close menu only on mobile after a delay
    setTimeout(() => {
      setIsMenuOpen(false)
    }, 300)
  }

  const handleLogoClick = () => {
    setClickCount(prev => prev + 1)
    if (clickCount >= 2) {
      window.location.href = '/management'
    }
    setTimeout(() => setClickCount(0), 1000)
  }

  if (!mounted) {
    return null
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                handleLogoClick()
                scrollToSection("#home")
              }}
              className="text-2xl font-serif font-bold text-primary cursor-pointer"
            >
              {language === "en" ? "Mohamed" : "محمد"}
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    activeSection === item.href.slice(1)
                      ? "text-primary bg-primary/10 shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                  whileHover={{ 
                    scale: 1.05,
                    y: -2,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    textShadow: activeSection === item.href.slice(1) 
                      ? "0 0 8px rgba(59, 130, 246, 0.5)" 
                      : "0 0 0px rgba(0,0,0,0)"
                  }}
                >
                  {language === "en" ? item.name : item.nameAr}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Theme and Language Toggles */}
          <div className="flex items-center space-x-2">
            {/* Hidden admin link - accessible via triple click on logo */}
            <Link href="/management" className="hidden">
              <motion.div
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="ghost" size="sm" className="opacity-0 pointer-events-none">
                  <Settings className="h-4 w-4" />
                </Button>
              </motion.div>
            </Link>

            <motion.div
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="ghost" size="sm" onClick={toggleLanguage} className="hidden sm:flex hover:bg-accent/50">
                <Globe className="h-4 w-4" />
                <span className="ml-1 text-xs">{language === "en" ? "AR" : "EN"}</span>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="hover:bg-accent/50">
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </motion.div>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-16 left-0 right-0 z-40"
          >
            <div className="mx-4 px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md rounded-lg border border-border shadow-lg">
              {navigation.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    activeSection === item.href.slice(1)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {language === "en" ? item.name : item.nameAr}
                </motion.a>
              ))}
              <div className="pt-2 border-t border-border">
                <Button variant="ghost" size="sm" onClick={toggleLanguage} className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  {language === "en" ? "العربية" : "English"}
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </nav>
    </motion.header>
  )
}
