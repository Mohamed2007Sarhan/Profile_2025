"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ExternalLink, 
  Github, 
  Star, 
  Eye,
  Code,
  Shield,
  Brain,
  Globe,
  Database,
  Zap
} from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import projectsData from "@/data/projects.json"

const projectIcons = {
  "ai-maker": Brain,
  "stream-rtc": Globe,
  "cyber-recon": Shield,
  "ibrand-frontend": Code,
  "courses-web": Database,
}

const projectColors = {
  "ai-maker": "text-purple-500",
  "stream-rtc": "text-blue-500", 
  "cyber-recon": "text-red-500",
  "ibrand-frontend": "text-green-500",
  "courses-web": "text-orange-500",
}

export function ProjectsShowcase() {
  const { language } = useLanguage()
  const [selectedProject, setSelectedProject] = useState(0)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const getProjectIcon = (projectId: string) => {
    return projectIcons[projectId as keyof typeof projectIcons] || Code
  }

  const getProjectColor = (projectId: string) => {
    return projectColors[projectId as keyof typeof projectColors] || "text-blue-500"
  }

  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-cyan-500/20 rounded-lg">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      
      {/* Floating Tech Elements */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-16 h-16 bg-gradient-to-br from-blue-500/10 to-cyan-400/10 rounded-lg border border-blue-400/20 backdrop-blur-sm"
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -30, 50, 0],
            rotate: [0, 90, -90, 0],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + i * 8}%`,
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl font-serif font-bold text-foreground mb-2">
            {language === "en" ? "Featured Projects" : "المشاريع المميزة"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {language === "en" ? "Explore my latest work and innovations" : "استكشف أحدث أعمالي وابتكاراتي"}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          {projectsData.map((project, index) => {
            const IconComponent = getProjectIcon(project.id)
            const colorClass = getProjectColor(project.id)
            const isSelected = selectedProject === index
            const isHovered = hoveredProject === index

            return (
              <motion.div
                key={project.id}
                className="relative"
                animate={{
                  scale: isSelected ? 1.02 : 1,
                  zIndex: isSelected ? 10 : 1,
                }}
                transition={{ duration: 0.3 }}
                onHoverStart={() => setHoveredProject(index)}
                onHoverEnd={() => setHoveredProject(null)}
                onClick={() => setSelectedProject(index)}
              >
                <Card 
                  className={`h-full cursor-pointer transition-all duration-300 ${
                    isSelected 
                      ? 'bg-card/80 backdrop-blur-sm border-primary/50 shadow-lg' 
                      : 'bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70'
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-primary/10`}>
                        <IconComponent className={`w-5 h-5 ${colorClass}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">
                          {language === "en" ? project.title : project.titleAr}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {language === "en" ? project.short : project.shortAr}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 bg-muted/50 rounded-lg">
                        <div className="text-xs text-muted-foreground">
                          {language === "en" ? "Performance" : "الأداء"}
                        </div>
                        <div className="text-sm font-semibold">
                          {project.stats.perf}
                        </div>
                      </div>
                      <div className="p-2 bg-muted/50 rounded-lg">
                        <div className="text-xs text-muted-foreground">
                          {language === "en" ? "Users" : "المستخدمين"}
                        </div>
                        <div className="text-sm font-semibold">
                          {project.stats.users}
                        </div>
                      </div>
                      <div className="p-2 bg-muted/50 rounded-lg">
                        <div className="text-xs text-muted-foreground">
                          {language === "en" ? "Impact" : "التأثير"}
                        </div>
                        <div className="text-sm font-semibold">
                          {project.stats.impact}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(project.live, '_blank')
                        }}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        {language === "en" ? "Live" : "مباشر"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(project.repo, '_blank')
                        }}
                      >
                        <Github className="w-3 h-3 mr-1" />
                        {language === "en" ? "Code" : "كود"}
                      </Button>
                    </div>
                  </CardContent>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <motion.div
                      className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}

                  {/* Hover Effect */}
                  {isHovered && !isSelected && (
                    <motion.div
                      className="absolute inset-0 bg-primary/5 rounded-lg pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Project Navigation */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {projectsData.map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                selectedProject === index ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
              animate={{
                scale: selectedProject === index ? 1.2 : 1,
              }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedProject(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
