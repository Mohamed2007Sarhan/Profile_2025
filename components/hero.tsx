"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download, ArrowDown, Play } from "lucide-react"
import { Suspense } from "react"
import { useLanguage } from "@/hooks/use-language"
import { useTranslation } from "@/lib/i18n"
import { Typewriter, MultiLineTypewriter } from "@/components/typewriter"
import { InteractiveCodingDemo } from "@/components/interactive-coding-demo"
import { ComputerAnimation } from "@/components/computer-animation"
import { DentalAnimation } from "@/components/dental-animation"
import { VideoBackground } from "@/components/video-background"
import { VSCodeAnimation } from "@/components/hero-animations/vscode-animation"
import { RealisticGearAnimation } from "@/components/hero-animations/realistic-gear-animation"
import { PenetrationTestAnimation } from "@/components/hero-animations/penetration-test-animation"
import { SecurityShieldAnimation } from "@/components/hero-animations/security-shield-animation"
import dynamic from "next/dynamic"

// Use enhanced scene with better animations and 3D effects
const ThreeScene = dynamic(() => import("@/components/three-scene/enhanced-scene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-cyan-400/10 rounded-lg flex items-center justify-center">
      <div className="animate-pulse text-blue-400">Loading Enhanced Scene...</div>
    </div>
  ),
})

export function Hero() {
  const { language } = useLanguage()
  const t = useTranslation(language)
  const [isClient, setIsClient] = useState(false)
  const [isVideoApproved, setIsVideoApproved] = useState(false)
  const [currentAnimation, setCurrentAnimation] = useState(0)
  const heroRef = useRef<HTMLElement>(null)

  const animations = [
    { component: VSCodeAnimation, title: "Coding in VSCode" },
    { component: RealisticGearAnimation, title: "Realistic 3D Gears" },
    { component: PenetrationTestAnimation, title: "Penetration Testing" },
    { component: SecurityShieldAnimation, title: "Security Protection" }
  ]

  useEffect(() => {
    setIsClient(true)
    // Always skip video background
    setIsVideoApproved(false)
  }, [])

  // Cycle through animations every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnimation(prev => (prev + 1) % animations.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [animations.length])

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const downloadResume = () => {
    // In a real implementation, this would download the actual resume
    const link = document.createElement("a")
    link.href = "/resume-mohamed.pdf"
    link.download = "Mohamed-Resume.pdf"
    link.click()
  }

  const handleVideoApproval = (approved: boolean) => {
    setIsVideoApproved(approved)
    localStorage.setItem('video-background-approved', approved.toString())
  }

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5"
    >

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`space-y-8 ${language === "ar" ? "text-right" : "text-left"}`}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
            >
              <div className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse" />
              {language === "en" ? "Available for new opportunities" : "متاح لفرص جديدة"}
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-balance"
              >
                <motion.span 
                  className="text-foreground"
                  animate={{ 
                    textShadow: [
                      "0 0 0px rgba(59, 130, 246, 0)",
                      "0 0 20px rgba(59, 130, 246, 0.3)",
                      "0 0 0px rgba(59, 130, 246, 0)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  Mohamed Sarhan Hamed
                </motion.span>
                <br />
                <motion.span 
                  className="text-primary"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4, #10b981, #f59e0b, #3b82f6)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}
                >
                  <Typewriter
                    texts={language === "en" 
                      ? [
                          "Software Engineer",
                          "Penetration Tester", 
                          "Web Developer",
                          "Desktop App Developer",
                          "Android Developer",
                          "AI Developer",
                          "Cybersecurity Specialist",
                          "Code Writer",
                          "Bug Hunter",
                          "System Architect"
                        ]
                      : [
                          "مهندس برمجيات",
                          "مختبر اختراق",
                          "مطور ويب",
                          "مطور تطبيقات سطح المكتب",
                          "مطور أندرويد",
                          "مطور ذكاء اصطناعي",
                          "متخصص أمن سيبراني",
                          "كاتب كود",
                          "صياد الثغرات",
                          "مهندس أنظمة"
                        ]
                    }
                    speed={80}
                    deleteSpeed={40}
                    pauseTime={1500}
                    className="text-primary"
                  />
                </motion.span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg sm:text-xl text-muted-foreground text-pretty max-w-2xl"
              >
                <Typewriter
                  texts={language === "en" 
                    ? [
                        "Building secure, high-performance applications",
                        "Creating innovative AI solutions",
                        "Developing robust cybersecurity systems",
                        "Crafting beautiful user experiences",
                        "Building scalable mobile applications"
                      ]
                    : [
                        "بناء تطبيقات آمنة وعالية الأداء",
                        "إنشاء حلول ذكاء اصطناعي مبتكرة",
                        "تطوير أنظمة أمن سيبراني قوية",
                        "صياغة تجارب مستخدم جميلة",
                        "بناء تطبيقات محمولة قابلة للتوسع"
                      ]
                  }
                  speed={80}
                  deleteSpeed={40}
                  pauseTime={2500}
                  className="text-lg sm:text-xl text-muted-foreground"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-base text-muted-foreground text-pretty max-w-xl"
              >
                {t.heroDescription}
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                onClick={scrollToProjects}
                className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <span className="relative z-10 flex items-center">
                  <Play className="w-4 h-4 mr-2" />
                  {t.viewWork}
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary to-accent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={downloadResume}
                className="group border-primary/20 hover:border-primary hover:bg-primary/5 bg-transparent"
              >
                <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                {t.downloadResume}
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-wrap gap-8 pt-8 border-t border-border/50"
            >
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-primary">8+</div>
                <div className="text-sm text-muted-foreground">
                  {language === "en" ? "Years Experience" : "سنوات خبرة"}
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-primary">22+</div>
                <div className="text-sm text-muted-foreground">
                  {language === "en" ? "GitHub Repositories" : "مستودع GitHub"}
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-primary">5+</div>
                <div className="text-sm text-muted-foreground">
                  {language === "en" ? "Programming Languages" : "لغة برمجة"}
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-primary">3</div>
                <div className="text-sm text-muted-foreground">
                  {language === "en" ? "Languages (EN/AR/DE)" : "لغات (إنجليزي/عربي/ألماني)"}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Dynamic Animations */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="relative h-[500px] lg:h-[600px]"
          >
            {isClient && (
              <motion.div 
                key={currentAnimation}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full rounded-2xl overflow-hidden shadow-2xl"
              >
                {(() => {
                  const CurrentAnimation = animations[currentAnimation].component
                  return <CurrentAnimation />
                })()}
              </motion.div>
            )}

            {/* Animation Title */}
            <motion.div
              key={`title-${currentAnimation}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-4 left-4 right-4 text-center"
            >
              <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm font-medium">
                {animations[currentAnimation].title}
              </div>
            </motion.div>

            {/* Animation Indicators */}
            <div className="absolute top-4 right-4 flex gap-2">
              {animations.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentAnimation ? 'bg-primary' : 'bg-white/30'
                  }`}
                  animate={{
                    scale: index === currentAnimation ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: index === currentAnimation ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-accent/20 rounded-full blur-xl"
            />
            <motion.div
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -180, -360],
                scale: [1, 0.9, 1]
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/20 rounded-full blur-xl"
            />
            <motion.div
              animate={{ 
                x: [0, 20, 0],
                y: [0, -15, 0],
                rotate: [0, 90, 180, 270, 360]
              }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
              className="absolute top-1/2 -right-8 w-12 h-12 bg-cyan-500/20 rounded-full blur-lg"
            />
            <motion.div
              animate={{ 
                x: [0, -15, 0],
                y: [0, 20, 0],
                rotate: [0, -90, -180, -270, -360]
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-1/3 -left-6 w-8 h-8 bg-purple-500/20 rounded-full blur-md"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToProjects}
          className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-foreground transition-colors group"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <span className="text-xs font-medium">{language === "en" ? "Scroll to explore" : "مرر للاستكشاف"}</span>
          <ArrowDown className="w-4 h-4 group-hover:text-primary transition-colors" />
        </motion.button>
      </motion.div>

    </section>
  )
}
