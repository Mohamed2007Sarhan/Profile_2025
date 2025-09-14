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
    title: "Full Stack Developer & Cybersecurity Specialist",
    titleAr: "مطور شامل ومتخصص أمن سيبراني",
    company: "Haworth University & Cyber Investigations",
    companyAr: "جامعة هوورث والتحقيقات السيبرانية",
    location: "New Damietta, Egypt",
    locationAr: "دمياط الجديدة، مصر",
    description: "Working as a Full Stack Developer and Cybersecurity Specialist with expertise in AI development, penetration testing, and modern web technologies. Building AI tools, real-time applications, and security solutions.",
    descriptionAr: "العمل كمطور شامل ومتخصص أمن سيبراني مع خبرة في تطوير الذكاء الاصطناعي واختبار الاختراق وتقنيات الويب الحديثة. بناء أدوات الذكاء الاصطناعي والتطبيقات الفورية وحلول الأمان.",
    technologies: ["Python", "React", "TypeScript", "AI/ML", "Cybersecurity", "Penetration Testing"],
    achievements: ["22+ GitHub Repositories", "AI Tool Development", "Security Solutions"],
    icon: Shield,
    color: "text-red-500",
    bgColor: "bg-red-500/10"
  },
  {
    year: "2022",
    yearAr: "٢٠٢٢",
    title: "3D Graphics Developer",
    titleAr: "مطور رسوميات ثلاثية الأبعاد",
    company: "Creative Studio",
    companyAr: "استوديو إبداعي",
    location: "Remote",
    locationAr: "عن بُعد",
    description: "Developed 3D models, animations, and interactive experiences using Three.js, WebGL, and modern web technologies. Created immersive gaming experiences.",
    descriptionAr: "تطوير نماذج ثلاثية الأبعاد ورسوم متحركة وتجارب تفاعلية باستخدام Three.js و WebGL وتقنيات الويب الحديثة. إنشاء تجارب ألعاب غامرة.",
    technologies: ["Three.js", "WebGL", "JavaScript", "3D Modeling", "Animation"],
    achievements: ["3D Model Creation", "Interactive Experiences", "Gaming Development"],
    icon: Globe,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    year: "2020",
    yearAr: "٢٠٢٠",
    title: "Full-Stack Developer",
    titleAr: "مطور شامل",
    company: "Tech Solutions",
    companyAr: "حلول تقنية",
    location: "Remote",
    locationAr: "عن بُعد",
    description: "Built full-stack applications with React, Node.js, and modern databases. Integrated 3D elements into web applications and created interactive dashboards.",
    descriptionAr: "بناء تطبيقات شاملة باستخدام React و Node.js وقواعد البيانات الحديثة. دمج عناصر ثلاثية الأبعاد في تطبيقات الويب وإنشاء لوحات تحكم تفاعلية.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Full-Stack"],
    achievements: ["Full-Stack Applications", "Database Integration", "Interactive Dashboards"],
    icon: Code,
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    year: "2019",
    yearAr: "٢٠١٩",
    title: "Frontend Developer",
    titleAr: "مطور واجهات أمامية",
    company: "Digital Agency",
    companyAr: "وكالة رقمية",
    location: "Remote",
    locationAr: "عن بُعد",
    description: "Started career in web development, learned modern frameworks, and began exploring 3D graphics and animation technologies.",
    descriptionAr: "بدء المسيرة المهنية في تطوير الويب، وتعلم الأطر الحديثة، وبدء استكشاف تقنيات الرسوميات والرسوم المتحركة ثلاثية الأبعاد.",
    technologies: ["HTML", "CSS", "JavaScript", "React", "Web Development"],
    achievements: ["Career Start", "Framework Learning", "3D Exploration"],
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
              {language === "en" ? "8+ years of growth and innovation" : "أكثر من 8 سنوات من النمو والابتكار"}
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
              className={`w-2 h-2 rounded-full transition-colors ${
                currentIndex === index ? 'bg-primary' : 'bg-muted-foreground/30'
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
