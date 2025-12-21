"use client"

import { motion } from "framer-motion"
import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  MapPin,
  Building,
  Award,
  Code,
  Shield,
  Brain,
  Globe,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

const experiences = [
  {
    year: "2024",
    yearAr: "٢٠٢٤",
    title: "Software Engineer (R&D & Embedded Systems)",
    titleAr: "مهندس برمجيات (بحث وتطوير وأنظمة مدمجة)",
    company: "Horus University",
    companyAr: "جامعة حورس",
    location: "New Damietta, Egypt",
    locationAr: "دمياط الجديدة، مصر",
    description: "Leading R&D engineering initiatives, focusing on embedded systems and ML core development. Engineering custom security solutions and hardware interfacing.",
    descriptionAr: "قيادة مبادرات البحث والتطوير الهندسي، مع التركيز على الأنظمة المدمجة وتطوير أنوية التعلم الآلي. هندسة حلول الأمان المخصصة وواجهات الأجهزة.",
    technologies: ["Python", "C++", "Embedded C", "TensorFlow", "Raspberry Pi", "ML Core"],
    achievements: ["R&D Leadership", "Custom ML Core", "Hardware Security"],
    icon: Shield,
    color: "text-red-500",
    bgColor: "bg-red-500/10"
  },
  {
    year: "2023",
    yearAr: "٢٠٢٣",
    title: "Full Stack Developer (On-site & Red Team)",
    titleAr: "مطور شامل (موقعي وفريق أحمر)",
    company: "Athr",
    companyAr: "أثر",
    location: "Saudi Arabia (Remote/On-site)",
    locationAr: "المملكة العربية السعودية (عن بُعد/موقعي)",
    description: "Led full-stack development while conducting red team operations. Identified critical vulnerabilities and hardened infrastructure against advanced persistent threats.",
    descriptionAr: "قيادة التطوير الشامل أثناء إجراء عمليات الفريق الأحمر. تحديد الثغرات الحرجة وتقوية البنية التحتية ضد التهديدات المستمرة المتقدمة.",
    technologies: ["React", "Node.js", "Red Teaming", "Burp Suite", "Docker", "AWS"],
    achievements: ["Red Team Ops", "Secure Architecture", "Infrastructure Hardening"],
    icon: Globe,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    year: "2022",
    yearAr: "٢٠٢٢",
    title: "Frontend Software Engineer (On-site)",
    titleAr: "مهندس برمجيات واجهة أمامية (موقعي)",
    company: "iBrand",
    companyAr: "آي براند",
    location: "Riyadh, Saudi Arabia",
    locationAr: "الرياض، المملكة العربية السعودية",
    description: "Engineered high-performance frontend architectures for large-scale e-commerce platforms. Implemented advanced state management and optimization techniques.",
    descriptionAr: "هندسة معماريات واجهة أمامية عالية الأداء لمنصات التجارة الإلكترونية واسعة النطاق. تنفيذ إدارة حالة متقدمة وتقنيات التحسين.",
    technologies: ["React", "TypeScript", "Next.js", "Redux", "Performance Optimization"],
    achievements: ["High-Traffic Architecture", "Component Systems", "Performance Tuning"],
    icon: Code,
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    year: "2021",
    yearAr: "٢٠٢١",
    title: "Security Researcher & Tool Developer",
    titleAr: "باحث أمني ومطور أدوات",
    company: "Independent",
    companyAr: "مستقل",
    location: "Global",
    locationAr: "عالمي",
    description: "Developed custom security tools and exploits. Conducted vulnerability research on open-source software and reported findings to maintainers.",
    descriptionAr: "تطوير أدوات أمان واستغلالات مخصصة. إجراء أبحاث الثغرات على البرمجيات مفتوحة المصدر وإبلاغ المطورين بالنتائج.",
    technologies: ["Python", "Exploit Dev", "Bash", "Linux", "Reverse Engineering"],
    achievements: ["CVE Discoveries", "Custom Tools", "Security Research"],
    icon: Award,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  }
]

export function ExperienceTimeline() {
  const { language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-rotate through experiences
  React.useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % experiences.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextExperience = () => {
    setCurrentIndex((prev) => (prev + 1) % experiences.length)
    setIsAutoPlaying(false)
  }

  const prevExperience = () => {
    setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length)
    setIsAutoPlaying(false)
  }

  const currentExp = experiences[currentIndex]

  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-cyan-500/20 rounded-lg">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      {/* Floating Elements */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-12 h-12 bg-gradient-to-br from-blue-500/10 to-cyan-400/10 rounded-full border border-blue-400/20 backdrop-blur-sm"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
            rotate: [0, 180, -180, 0],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: `${15 + i * 20}%`,
            top: `${25 + i * 15}%`,
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-serif font-bold text-foreground mb-1">
              {language === "en" ? "Professional Journey" : "الرحلة المهنية"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {language === "en" ? "9+ years of growth and innovation" : "أكثر من 9 سنوات من النمو والابتكار"}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevExperience}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextExperience}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Experience Card */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50, scale: 0.9, rotateY: -15 }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
            rotateY: [0, 3, 0],
          }}
          exit={{ opacity: 0, x: -50, scale: 0.9, rotateY: 15 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            rotateY: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="flex-1"
        >
          <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6 h-full flex flex-col">
              {/* Experience Header */}
              <motion.div
                className="flex items-start gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <motion.div
                  className={`p-3 rounded-lg ${currentExp.bgColor}`}
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <currentExp.icon className={`w-6 h-6 ${currentExp.color}`} />
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {language === "en" ? currentExp.year : currentExp.yearAr}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{language === "en" ? currentExp.location : currentExp.locationAr}</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold mb-1">
                    {language === "en" ? currentExp.title : currentExp.titleAr}
                  </h4>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Building className="w-3 h-3" />
                    <span>{language === "en" ? currentExp.company : currentExp.companyAr}</span>
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                {language === "en" ? currentExp.description : currentExp.descriptionAr}
              </p>

              {/* Technologies */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <h5 className="text-sm font-semibold mb-3">
                  {language === "en" ? "Technologies Used" : "التقنيات المستخدمة"}
                </h5>
                <div className="flex flex-wrap gap-2">
                  {currentExp.technologies.map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.5 + index * 0.1,
                        duration: 0.4,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      <Badge
                        variant="outline"
                        className="text-xs hover:scale-110 transition-transform cursor-pointer"
                      >
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Achievements */}
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <h5 className="text-sm font-semibold mb-3">
                  {language === "en" ? "Key Achievements" : "الإنجازات الرئيسية"}
                </h5>
                <div className="space-y-2">
                  {currentExp.achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement}
                      initial={{ opacity: 0, x: 20, scale: 0.9 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        rotate: [0, 1, 0]
                      }}
                      transition={{
                        delay: 0.7 + index * 0.15,
                        duration: 0.5,
                        rotate: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                      className="flex items-center gap-2 text-sm hover:bg-muted/50 p-2 rounded transition-colors cursor-pointer"
                    >
                      <motion.div
                        className="w-1.5 h-1.5 bg-primary rounded-full"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.2
                        }}
                      />
                      <span>{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Timeline Navigation */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {experiences.map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${currentIndex === index ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
              animate={{
                scale: currentIndex === index ? 1.2 : 1,
              }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoPlaying(false)
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
