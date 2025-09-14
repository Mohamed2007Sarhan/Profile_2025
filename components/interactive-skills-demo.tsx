"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Code2, 
  Shield, 
  Brain, 
  Globe, 
  Database, 
  Zap,
  Play,
  Pause,
  RotateCcw
} from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

const skillCategories = [
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    titleAr: "الأمن السيبراني",
    icon: Shield,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    skills: ["Penetration Testing", "Ethical Hacking", "Network Security", "Vulnerability Assessment"]
  },
  {
    id: "programming",
    title: "Programming",
    titleAr: "البرمجة",
    icon: Code2,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    skills: ["Python", "JavaScript", "C++", "C#", "Java", "PHP", "Kotlin", "TypeScript"]
  },
  {
    id: "ai-ml",
    title: "AI & ML",
    titleAr: "الذكاء الاصطناعي",
    icon: Brain,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    skills: ["OpenAI API", "Machine Learning", "NLP", "Computer Vision", "AI Model Training"]
  },
  {
    id: "web-dev",
    title: "Web Development",
    titleAr: "تطوير الويب",
    icon: Globe,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    skills: ["React", "Next.js", "Node.js", "FastAPI", "Docker", "Linux"]
  },
  {
    id: "databases",
    title: "Databases",
    titleAr: "قواعد البيانات",
    icon: Database,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "SQLite"]
  },
  {
    id: "tools",
    title: "Tools & DevOps",
    titleAr: "الأدوات والعمليات",
    icon: Zap,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    skills: ["Git", "Docker", "Linux", "CI/CD", "AWS", "Azure"]
  }
]

export function InteractiveSkillsDemo() {
  const { language } = "en"
  const [activeCategory, setActiveCategory] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentSkill, setCurrentSkill] = useState(0)

  // Auto-rotate through categories
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % skillCategories.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isPlaying])

  // Auto-rotate through skills in current category
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skillCategories[activeCategory].skills.length)
    }, 1000)

    return () => clearInterval(interval)
  }, [activeCategory, isPlaying])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setActiveCategory(0)
    setCurrentSkill(0)
    setIsPlaying(true)
  }

  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-cyan-500/20 rounded-lg">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      
      {/* Floating Orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-full blur-xl"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 100, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-serif font-bold text-foreground mb-1">
              {language === "en" ? "Interactive Skills Demo" : "عرض تفاعلي للمهارات"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {language === "en" ? "Explore my expertise areas" : "استكشف مجالات خبرتي"}
            </p>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePlayPause}
              className="h-8 w-8 p-0"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="h-8 w-8 p-0"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.id}
              className="relative"
              animate={{
                scale: activeCategory === index ? 1.05 : 1,
                zIndex: activeCategory === index ? 10 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <Card 
                className={`h-full cursor-pointer transition-all duration-300 ${
                  activeCategory === index 
                    ? `${category.bgColor} ${category.borderColor} border-2 shadow-lg` 
                    : 'bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80'
                }`}
                onClick={() => setActiveCategory(index)}
              >
                <CardContent className="p-4 h-full flex flex-col">
                  {/* Category Icon & Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${category.bgColor}`}>
                      <category.icon className={`w-5 h-5 ${category.color}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">
                        {language === "en" ? category.title : category.titleAr}
                      </h4>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="flex-1 space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        animate={{
                          opacity: activeCategory === index && currentSkill === skillIndex ? 1 : 0.6,
                          scale: activeCategory === index && currentSkill === skillIndex ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <Badge 
                          variant={activeCategory === index && currentSkill === skillIndex ? "default" : "secondary"}
                          className={`text-xs w-full justify-start ${
                            activeCategory === index && currentSkill === skillIndex 
                              ? category.color.replace('text-', 'bg-').replace('-500', '-500/20')
                              : ''
                          }`}
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>

                  {/* Active Indicator */}
                  {activeCategory === index && (
                    <motion.div
                      className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {skillCategories.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                activeCategory === index ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
              animate={{
                scale: activeCategory === index ? 1.2 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
