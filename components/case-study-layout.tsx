"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Target, Lightbulb, Code, BarChart3 } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { useTranslation } from "@/lib/i18n"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface CaseStudyLayoutProps {
  project: any
}

export function CaseStudyLayout({ project }: CaseStudyLayoutProps) {
  const { language } = useLanguage()
  const t = useTranslation(language)

  const caseStudyData = getCaseStudyData(project, language)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Back Button */}
            <Button variant="ghost" className="mb-6" asChild>
              <Link href="/#projects">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === "en" ? "Back to Projects" : "العودة للمشاريع"}
              </Link>
            </Button>

            {/* Project Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Badge variant="secondary">{project.year}</Badge>
                <Badge variant="outline">{caseStudyData.category}</Badge>
              </div>

              <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4 text-balance">
                {language === "en" ? project.title : project.titleAr}
              </h1>

              <p className="text-xl text-muted-foreground mb-6 text-balance max-w-2xl mx-auto">
                {language === "en" ? project.short : project.shortAr}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                {project.live && (
                  <Button asChild>
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t.viewLive}
                    </a>
                  </Button>
                )}
                {project.repo && (
                  <Button variant="outline" asChild>
                    <a href={project.repo} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      {t.viewCode}
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Project Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 border border-border/50">
              <Image
                src={project.cover || "/placeholder.svg"}
                alt={language === "en" ? project.title : project.titleAr}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Study Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Overview */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                    <Target className="w-6 h-6 text-primary" />
                    {caseStudyData.sections.overview.title}
                  </h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground">
                    <p>{caseStudyData.sections.overview.content}</p>
                  </div>
                </motion.div>

                <Separator />

                {/* Problem */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                    <Lightbulb className="w-6 h-6 text-primary" />
                    {caseStudyData.sections.problem.title}
                  </h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground">
                    <p>{caseStudyData.sections.problem.content}</p>
                    <ul className="list-disc pl-6 space-y-2">
                      {caseStudyData.sections.problem.challenges.map((challenge: string, index: number) => (
                        <li key={index}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                <Separator />

                {/* Solution */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                    <Code className="w-6 h-6 text-primary" />
                    {caseStudyData.sections.solution.title}
                  </h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground">
                    <p>{caseStudyData.sections.solution.content}</p>
                  </div>

                  {/* Technical Implementation */}
                  <div className="mt-8 grid sm:grid-cols-2 gap-6">
                    {caseStudyData.sections.solution.implementation.map((item: any, index: number) => (
                      <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <item.icon className="w-5 h-5 text-primary" />
                            {item.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>

                <Separator />

                {/* Results */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                    <BarChart3 className="w-6 h-6 text-primary" />
                    {caseStudyData.sections.results.title}
                  </h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
                    <p>{caseStudyData.sections.results.content}</p>
                  </div>

                  {/* Metrics */}
                  <div className="grid sm:grid-cols-3 gap-6">
                    {caseStudyData.sections.results.metrics.map((metric: any, index: number) => (
                      <Card key={index} className="text-center bg-card/50 backdrop-blur-sm border-border/50">
                        <CardContent className="pt-6">
                          <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                          <div className="text-sm text-muted-foreground">{metric.label}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Project Details */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {language === "en" ? "Project Details" : "تفاصيل المشروع"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">{language === "en" ? "Timeline" : "الجدول الزمني"}</div>
                          <div className="text-sm text-muted-foreground">{caseStudyData.timeline}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">{language === "en" ? "Team" : "الفريق"}</div>
                          <div className="text-sm text-muted-foreground">{caseStudyData.team}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Target className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">{language === "en" ? "My Role" : "دوري"}</div>
                          <div className="text-sm text-muted-foreground">{caseStudyData.role}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Technologies */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {language === "en" ? "Technologies Used" : "التقنيات المستخدمة"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Next Project */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg">{language === "en" ? "Next Project" : "المشروع التالي"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" asChild>
                        <Link href="/#projects">{language === "en" ? "View All Projects" : "عرض جميع المشاريع"}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// Helper function to generate case study data
function getCaseStudyData(project: any, language: "en" | "ar") {
  const caseStudies: Record<string, any> = {
    "interactive-3d-dashboard": {
      en: {
        category: "Web Application",
        timeline: "3 months",
        team: "4 developers, 2 designers",
        role: "Lead Frontend Developer",
        sections: {
          overview: {
            title: "Project Overview",
            content:
              "This project involved creating an interactive 3D dashboard for real-time data visualization. The challenge was to present complex datasets in an intuitive, visually appealing way while maintaining excellent performance across different devices.",
          },
          problem: {
            title: "The Challenge",
            content:
              "The client needed a way to visualize large amounts of real-time data in a format that would be both engaging and informative. Traditional 2D charts weren't providing the level of insight needed.",
            challenges: [
              "Handle real-time data updates without performance degradation",
              "Create intuitive 3D interactions for non-technical users",
              "Ensure accessibility compliance while using WebGL",
              "Optimize for various screen sizes and device capabilities",
            ],
          },
          solution: {
            title: "Technical Solution",
            content:
              "I implemented a custom 3D visualization system using Three.js and React Three Fiber, with optimized data streaming and intelligent level-of-detail rendering.",
            implementation: [
              {
                icon: Code,
                title: "3D Rendering",
                description: "Custom Three.js implementation with React Three Fiber for seamless React integration",
              },
              {
                icon: BarChart3,
                title: "Data Processing",
                description: "Real-time data streaming with WebSocket connections and efficient state management",
              },
              {
                icon: Target,
                title: "Performance",
                description: "Level-of-detail rendering and object pooling for smooth 60fps performance",
              },
              {
                icon: Users,
                title: "Accessibility",
                description: "Keyboard navigation and screen reader support for 3D interactions",
              },
            ],
          },
          results: {
            title: "Results & Impact",
            content:
              "The dashboard exceeded performance expectations and received positive feedback from users. The 3D visualization helped identify data patterns that weren't visible in traditional charts.",
            metrics: [
              { value: "92/100", label: "Lighthouse Score" },
              { value: "40%", label: "User Engagement ↑" },
              { value: "60fps", label: "Consistent Performance" },
            ],
          },
        },
      },
      ar: {
        category: "تطبيق ويب",
        timeline: "3 أشهر",
        team: "4 مطورين، 2 مصممين",
        role: "مطور واجهة أمامية رئيسي",
        sections: {
          overview: {
            title: "نظرة عامة على المشروع",
            content:
              "تضمن هذا المشروع إنشاء لوحة تحكم ثلاثية الأبعاد تفاعلية لتصور البيانات في الوقت الفعلي. كان التحدي هو عرض مجموعات البيانات المعقدة بطريقة بديهية وجذابة بصرياً مع الحفاظ على أداء ممتاز عبر الأجهزة المختلفة.",
          },
          problem: {
            title: "التحدي",
            content:
              "احتاج العميل إلى طريقة لتصور كميات كبيرة من البيانات في الوقت الفعلي بتنسيق يكون جذاباً ومفيداً. لم تكن الرسوم البيانية ثنائية الأبعاد التقليدية توفر مستوى الفهم المطلوب.",
            challenges: [
              "التعامل مع تحديثات البيانات في الوقت الفعلي دون تدهور الأداء",
              "إنشاء تفاعلات ثلاثية الأبعاد بديهية للمستخدمين غير التقنيين",
              "ضمان الامتثال لإمكانية الوصول أثناء استخدام WebGL",
              "التحسين لأحجام الشاشات المختلفة وقدرات الأجهزة",
            ],
          },
          solution: {
            title: "الحل التقني",
            content:
              "قمت بتنفيذ نظام تصور ثلاثي الأبعاد مخصص باستخدام Three.js و React Three Fiber، مع تدفق بيانات محسن وعرض ذكي لمستوى التفاصيل.",
            implementation: [
              {
                icon: Code,
                title: "العرض ثلاثي الأبعاد",
                description: "تنفيذ Three.js مخصص مع React Three Fiber للتكامل السلس مع React",
              },
              {
                icon: BarChart3,
                title: "معالجة البيانات",
                description: "تدفق البيانات في الوقت الفعلي مع اتصالات WebSocket وإدارة حالة فعالة",
              },
              {
                icon: Target,
                title: "الأداء",
                description: "عرض مستوى التفاصيل وتجميع الكائنات لأداء سلس بـ 60 إطار في الثانية",
              },
              {
                icon: Users,
                title: "إمكانية الوصول",
                description: "التنقل بلوحة المفاتيح ودعم قارئ الشاشة للتفاعلات ثلاثية الأبعاد",
              },
            ],
          },
          results: {
            title: "النتائج والتأثير",
            content:
              "تجاوزت لوحة التحكم توقعات الأداء وحصلت على تعليقات إيجابية من المستخدمين. ساعد التصور ثلاثي الأبعاد في تحديد أنماط البيانات التي لم تكن مرئية في الرسوم البيانية التقليدية.",
            metrics: [
              { value: "92/100", label: "نتيجة Lighthouse" },
              { value: "40%", label: "زيادة مشاركة المستخدم" },
              { value: "60fps", label: "أداء ثابت" },
            ],
          },
        },
      },
    },
  }

  // Return default case study data if specific one doesn't exist
  const defaultData = caseStudies["interactive-3d-dashboard"][language]
  return caseStudies[project.slug]?.[language] || defaultData
}
