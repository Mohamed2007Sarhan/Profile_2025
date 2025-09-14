"use client"

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, FileText, Filter, Grid, List, Star, GitFork, Eye, AlertCircle } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { useTranslation } from "@/lib/i18n"
import { useSiteSettings } from "@/components/site-settings-provider"
import projectsData from "@/data/projects.json"
import Link from "next/link"
import Image from "next/image"

const filterCategories = [
  { id: "all", name: "All", nameAr: "الكل" },
  { id: "web", name: "Web", nameAr: "ويب" },
  { id: "3d", name: "3D", nameAr: "ثلاثي الأبعاد" },
  { id: "ui", name: "UI", nameAr: "واجهة المستخدم" },
  { id: "opensource", name: "Open Source", nameAr: "مفتوح المصدر" },
]

type ViewMode = "grid" | "list"

export function Projects() {
  const { language } = useLanguage()
  const t = useTranslation(language)
  const { settings } = useSiteSettings()
  const [activeFilter, setActiveFilter] = useState("all")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [adminProjects, setAdminProjects] = useState<any[]>([])

  useEffect(() => {
    // Load admin projects
    const loadAdminProjects = async () => {
      try {
        const projectsRes = await fetch('/api/admin/projects')
        const projectsData = await projectsRes.json()
        setAdminProjects(projectsData)
      } catch (error) {
        console.error('Error loading admin projects:', error)
        // Fallback to local data
        setAdminProjects(projectsData.map((p, index) => ({ ...p, order: index, visible: true })))
      }
    }

    loadAdminProjects()
  }, [])

  const filteredProjects = useMemo(() => {
    if (!settings.showProjects) return []
    
    // Get visible projects from admin settings or fallback to local data
    const visibleProjects = adminProjects.length > 0 
      ? adminProjects
          .filter((p: any) => p.visible)
          .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
      : projectsData.map((p, index) => ({ ...p, order: index, visible: true }))

    // Apply category filter
    if (activeFilter === "all") return visibleProjects

    return visibleProjects.filter((project) => {
      const tags = project.tags.map((tag) => tag.toLowerCase())
      switch (activeFilter) {
        case "web":
          return tags.some((tag) => ["react", "next.js", "typescript", "javascript"].includes(tag))
        case "3d":
          return tags.some((tag) => ["three.js", "webgl", "framer motion"].includes(tag))
        case "ui":
          return tags.some((tag) => ["tailwind", "figma", "storybook"].includes(tag))
        case "opensource":
          return project.repo && project.repo.includes("github.com")
        default:
          return true
      }
    })
  }, [activeFilter, adminProjects, settings.showProjects])

  const getProjectCategory = (project: any) => {
    const tags = project.tags.map((tag: string) => tag.toLowerCase())
    if (tags.some((tag: string) => ["three.js", "webgl"].includes(tag))) return "3D"
    if (tags.some((tag: string) => ["react", "next.js"].includes(tag))) return "Web"
    if (tags.some((tag: string) => ["figma", "storybook"].includes(tag))) return "UI"
    return "Web"
  }

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">{t.projectsTitle}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">{t.projectsDescription}</p>
        </motion.div>

        {/* Filter and View Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.6,
            type: "spring",
            stiffness: 100
          }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
        >
          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground mr-2" />
            {filterCategories.map((category) => (
              <Button
                key={category.id}
                variant={activeFilter === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(category.id)}
                className="h-8"
              >
                {language === "en" ? category.name : category.nameAr}
              </Button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 p-1 bg-background rounded-lg border">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-8"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Projects Count */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-sm text-muted-foreground">
            {language === "en"
              ? `Showing ${filteredProjects.length} of ${projectsData.length} projects`
              : `عرض ${filteredProjects.length} من ${projectsData.length} مشروع`}
          </p>
        </motion.div>

        {/* Projects Grid/List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeFilter}-${viewMode}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6" : "space-y-4 md:space-y-6"}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className={viewMode === "list" ? "w-full" : ""}
              >
                <ProjectCard project={project} viewMode={viewMode} language={language} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {language === "en" ? "No projects found" : "لم يتم العثور على مشاريع"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {language === "en"
                ? "Try adjusting your filter to see more projects"
                : "جرب تعديل المرشح لرؤية المزيد من المشاريع"}
            </p>
            <Button variant="outline" onClick={() => setActiveFilter("all")}>
              {language === "en" ? "Show All Projects" : "عرض جميع المشاريع"}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: any
  viewMode: ViewMode
  language: "en" | "ar"
}

function ProjectCard({ project, viewMode, language }: ProjectCardProps) {
  const t = useTranslation(language)

  if (viewMode === "list") {
    return (
      <motion.div
        whileHover={{ 
          scale: 1.01,
          x: 10,
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
        }}
        whileTap={{ scale: 0.99 }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 25 
        }}
      >
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
        <div className="flex flex-col md:flex-row">
          {/* Project Image */}
          <div className="md:w-1/3 relative">
            <div className="aspect-video md:aspect-square relative overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-t-none bg-gradient-to-br from-primary/10 to-accent/10">
              <Image
                src={project.cover}
                alt={language === "en" ? project.title : project.titleAr}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <Badge className="absolute top-3 left-3 bg-background/90 text-foreground">{project.year}</Badge>
            </div>
          </div>

          {/* Project Content */}
          <div className="md:w-2/3 p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-serif font-bold mb-2">
                  {language === "en" ? project.title : project.titleAr}
                </h3>
                <p className="text-muted-foreground text-sm mb-3">
                  {language === "en" ? project.short : project.shortAr}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.slice(0, 4).map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{project.tags.length - 4}
                </Badge>
              )}
            </div>

            {/* GitHub Stats */}
            {project.githubStats && (
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500" />
                  <span>{project.githubStats.stars}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="w-3 h-3 text-blue-500" />
                  <span>{project.githubStats.forks}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3 text-green-500" />
                  <span>{project.githubStats.watchers}</span>
                </div>
                {project.githubStats.issues > 0 && (
                  <div className="flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 text-red-500" />
                    <span>{project.githubStats.issues}</span>
                  </div>
                )}
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
              <span>{project.stats.perf}</span>
              <span>•</span>
              <span>{project.stats.users}</span>
              {project.stats.impact && (
                <>
                  <span>•</span>
                  <span>{project.stats.impact}</span>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              {project.live && (
                <Button size="sm" asChild>
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    {t.viewLive}
                  </a>
                </Button>
              )}
              {project.repo && (
                <Button size="sm" variant="outline" asChild>
                  <a href={project.repo} target="_blank" rel="noopener noreferrer">
                    <Github className="w-3 h-3 mr-1" />
                    {t.viewCode}
                  </a>
                </Button>
              )}
              {project.caseStudy && (
                <Button size="sm" variant="outline" asChild>
                  <Link href={project.caseStudy}>
                    <FileText className="w-3 h-3 mr-1" />
                    {t.caseStudy}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        rotateY: 5,
        rotateX: 5,
        z: 50
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
    >
      <Card className="group bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
      <CardHeader className="p-0">
        <div className="aspect-video relative overflow-hidden rounded-t-lg bg-gradient-to-br from-primary/10 to-accent/10">
          <Image
            src={project.cover}
            alt={language === "en" ? project.title : project.titleAr}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <Badge className="absolute top-3 left-3 bg-background/90 text-foreground">{project.year}</Badge>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex gap-2">
              {project.live && (
                <Button size="sm" variant="secondary" asChild>
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              )}
              {project.repo && (
                <Button size="sm" variant="secondary" asChild>
                  <a href={project.repo} target="_blank" rel="noopener noreferrer">
                    <Github className="w-3 h-3" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-serif font-bold mb-2 group-hover:text-primary transition-colors">
              {language === "en" ? project.title : project.titleAr}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {language === "en" ? project.short : project.shortAr}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag: string) => (
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

          {/* GitHub Stats */}
          {project.githubStats && (
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500" />
                <span>{project.githubStats.stars}</span>
              </div>
              <div className="flex items-center gap-1">
                <GitFork className="w-3 h-3 text-blue-500" />
                <span>{project.githubStats.forks}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3 text-green-500" />
                <span>{project.githubStats.watchers}</span>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="text-xs text-muted-foreground">
            <div>{project.stats.perf}</div>
            <div>{project.stats.users}</div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {project.live && (
              <Button size="sm" className="flex-1" asChild>
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  {t.viewLive}
                </a>
              </Button>
            )}
            {project.caseStudy && (
              <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                <Link href={project.caseStudy}>
                  <FileText className="w-3 h-3 mr-1" />
                  {t.caseStudy}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
    </motion.div>
  )
}
