"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Code2, Palette, Database, Zap, BarChart3, Settings, Grid3X3, List, Eye, Users } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { useTranslation } from "@/lib/i18n"
import { useState } from "react"

const skillCategories = [
  {
    id: "cybersecurity",
    title: "Cybersecurity & Penetration Testing",
    titleAr: "الأمن السيبراني واختبار الاختراق",
    icon: Zap,
    color: "text-red-600",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    skills: [
      { name: "Penetration Testing", level: 95, experience: "Expert" },
      { name: "Ethical Hacking", level: 90, experience: "Expert" },
      { name: "Network Security", level: 88, experience: "Advanced" },
      { name: "Vulnerability Assessment", level: 85, experience: "Advanced" },
      { name: "Security Auditing", level: 82, experience: "Advanced" },
      { name: "Incident Response", level: 80, experience: "Advanced" },
      { name: "Forensics", level: 78, experience: "Advanced" },
      { name: "Security Tools", level: 92, experience: "Expert" },
    ],
  },
  {
    id: "programming",
    title: "Programming Languages",
    titleAr: "لغات البرمجة",
    icon: Code2,
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    skills: [
      { name: "Python", level: 95, experience: "Expert" },
      { name: "JavaScript", level: 90, experience: "Expert" },
      { name: "C++", level: 88, experience: "Advanced" },
      { name: "C#", level: 85, experience: "Advanced" },
      { name: "Java", level: 82, experience: "Advanced" },
      { name: "PHP", level: 80, experience: "Advanced" },
      { name: "Kotlin", level: 78, experience: "Advanced" },
      { name: "TypeScript", level: 92, experience: "Expert" },
    ],
  },
  {
    id: "web-frameworks",
    title: "Web Frameworks & Tools",
    titleAr: "أطر عمل الويب والأدوات",
    icon: Settings,
    color: "text-green-600",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    skills: [
      { name: "React", level: 95, experience: "Expert" },
      { name: "Next.js", level: 90, experience: "Expert" },
      { name: "Node.js", level: 88, experience: "Advanced" },
      { name: "FastAPI", level: 85, experience: "Advanced" },
      { name: "Docker", level: 80, experience: "Advanced" },
      { name: "Linux", level: 92, experience: "Expert" },
    ],
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    titleAr: "الذكاء الاصطناعي والتعلم الآلي",
    icon: Database,
    color: "text-orange-600",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    skills: [
      { name: "OpenAI API", level: 90, experience: "Expert" },
      { name: "Machine Learning", level: 85, experience: "Advanced" },
      { name: "Natural Language Processing", level: 80, experience: "Advanced" },
      { name: "Computer Vision", level: 75, experience: "Advanced" },
      { name: "AI Model Training", level: 78, experience: "Advanced" },
      { name: "Data Analysis", level: 82, experience: "Advanced" },
    ],
  },
  {
    id: "design",
    title: "Design & UX",
    titleAr: "التصميم وتجربة المستخدم",
    icon: Palette,
    color: "text-pink-600",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/20",
    skills: [
      { name: "Figma", level: 85, experience: "Advanced" },
      { name: "Adobe Creative Suite", level: 75, experience: "Advanced" },
      { name: "UI/UX Design", level: 80, experience: "Advanced" },
      { name: "Design Systems", level: 88, experience: "Advanced" },
      { name: "Responsive Design", level: 95, experience: "Expert" },
      { name: "Accessibility (WCAG)", level: 85, experience: "Advanced" },
    ],
  },
  {
    id: "performance",
    title: "Performance & SEO",
    titleAr: "الأداء وتحسين محركات البحث",
    icon: BarChart3,
    color: "text-cyan-600",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    skills: [
      { name: "Core Web Vitals", level: 90, experience: "Expert" },
      { name: "Lighthouse Optimization", level: 88, experience: "Advanced" },
      { name: "SEO", level: 82, experience: "Advanced" },
      { name: "Bundle Optimization", level: 85, experience: "Advanced" },
      { name: "Caching Strategies", level: 78, experience: "Advanced" },
      { name: "PWA Development", level: 80, experience: "Advanced" },
    ],
  },
  {
    id: "dentistry",
    title: "Dentistry & Medical Technology",
    titleAr: "طب الأسنان والتكنولوجيا الطبية",
    icon: Users,
    color: "text-emerald-600",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    skills: [
      { name: "Dental Anatomy", level: 85, experience: "Advanced" },
      { name: "Oral Pathology", level: 80, experience: "Advanced" },
      { name: "Dental Technology", level: 88, experience: "Advanced" },
      { name: "Digital Dentistry", level: 90, experience: "Expert" },
      { name: "3D Dental Modeling", level: 85, experience: "Advanced" },
      { name: "Medical Software Development", level: 92, experience: "Expert" },
    ],
  },
]

type ViewMode = "grid" | "list" | "detailed"

export function Skills() {
  const { language } = useLanguage()
  const t = useTranslation(language)
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const getExperienceColor = (level: number) => {
    if (level >= 90) return "text-green-600"
    if (level >= 80) return "text-blue-600"
    if (level >= 70) return "text-yellow-600"
    return "text-gray-600"
  }

  const getExperienceText = (experience: string) => {
    const translations = {
      Expert: language === "en" ? "Expert" : "خبير",
      Advanced: language === "en" ? "Advanced" : "متقدم",
      Intermediate: language === "en" ? "Intermediate" : "متوسط",
    }
    return translations[experience as keyof typeof translations] || experience
  }

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">{t.skillsTitle}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">{t.skillsDescription}</p>
        </motion.div>

        {/* View Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8"
            >
              <Grid3X3 className="w-4 h-4 mr-1" />
              {language === "en" ? "Grid" : "شبكة"}
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-8"
            >
              <List className="w-4 h-4 mr-1" />
              {language === "en" ? "List" : "قائمة"}
            </Button>
            <Button
              variant={viewMode === "detailed" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("detailed")}
              className="h-8"
            >
              <Eye className="w-4 h-4 mr-1" />
              {language === "en" ? "Detailed" : "مفصل"}
            </Button>
          </div>
        </motion.div>

        {/* Skills Content */}
        {viewMode === "grid" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`h-full bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:scale-105 group ${category.bgColor} ${category.borderColor} hover:border-opacity-50`}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`p-2 rounded-lg ${category.bgColor} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <category.icon className={`w-6 h-6 ${category.color}`} />
                      </motion.div>
                      <span className="text-lg group-hover:text-primary transition-colors duration-300">
                        {language === "en" ? category.title : category.titleAr}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.slice(0, 4).map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: skillIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Badge 
                            variant="secondary" 
                            className={`text-xs hover:scale-105 transition-transform duration-200 ${category.bgColor} ${category.borderColor} text-white`}
                          >
                            {skill.name}
                          </Badge>
                        </motion.div>
                      ))}
                      {category.skills.length > 4 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 }}
                          viewport={{ once: true }}
                        >
                          <Badge variant="outline" className="text-xs hover:scale-105 transition-transform duration-200">
                            +{category.skills.length - 4} {language === "en" ? "more" : "أكثر"}
                          </Badge>
                        </motion.div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {viewMode === "list" && (
          <div className="space-y-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <category.icon className={`w-6 h-6 ${category.color}`} />
                      <span>{language === "en" ? category.title : category.titleAr}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.skills.map((skill) => (
                        <div key={skill.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <span className="font-medium">{skill.name}</span>
                          <Badge variant="outline" className={`text-xs ${getExperienceColor(skill.level)}`}>
                            {getExperienceText(skill.experience)}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {viewMode === "detailed" && (
          <div className="space-y-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <category.icon className={`w-6 h-6 ${category.color}`} />
                      <span>{language === "en" ? category.title : category.titleAr}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.skills.map((skill) => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{skill.name}</span>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className={`text-xs ${getExperienceColor(skill.level)}`}>
                                {getExperienceText(skill.experience)}
                              </Badge>
                              <span className="text-sm text-muted-foreground">{skill.level}%</span>
                            </div>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
