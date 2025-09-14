"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Trophy, 
  Star, 
  Award, 
  Target, 
  Zap, 
  Heart,
  Code2,
  Shield,
  Brain,
  Stethoscope
} from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

const achievements = [
  {
    id: "github-stars",
    title: "GitHub Stars",
    titleAr: "نجوم جيثب",
    value: "500+",
    icon: Star,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    description: "Total stars across all repositories",
    descriptionAr: "إجمالي النجوم عبر جميع المستودعات"
  },
  {
    id: "projects-completed",
    title: "Projects Completed",
    titleAr: "المشاريع المكتملة",
    value: "50+",
    icon: Trophy,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    description: "Successful project deliveries",
    descriptionAr: "تسليمات مشاريع ناجحة"
  },
  {
    id: "years-experience",
    title: "Years Experience",
    titleAr: "سنوات الخبرة",
    value: "8+",
    icon: Award,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    description: "Professional development experience",
    descriptionAr: "خبرة التطوير المهنية"
  },
  {
    id: "certifications",
    title: "Certifications",
    titleAr: "الشهادات",
    value: "12+",
    icon: Target,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    description: "Professional certifications earned",
    descriptionAr: "الشهادات المهنية المكتسبة"
  },
  {
    id: "languages",
    title: "Programming Languages",
    titleAr: "لغات البرمجة",
    value: "15+",
    icon: Code2,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    description: "Programming languages mastered",
    descriptionAr: "لغات البرمجة المتقنة"
  },
  {
    id: "security-projects",
    title: "Security Projects",
    titleAr: "مشاريع الأمان",
    value: "25+",
    icon: Shield,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    description: "Cybersecurity projects completed",
    descriptionAr: "مشاريع الأمن السيبراني المكتملة"
  },
  {
    id: "ai-models",
    title: "AI Models",
    titleAr: "نماذج الذكاء الاصطناعي",
    value: "30+",
    icon: Brain,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    description: "AI and ML models developed",
    descriptionAr: "نماذج الذكاء الاصطناعي والتعلم الآلي المطورة"
  },
  {
    id: "medical-apps",
    title: "Medical Applications",
    titleAr: "التطبيقات الطبية",
    value: "8+",
    icon: Stethoscope,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    description: "Medical and dental applications",
    descriptionAr: "التطبيقات الطبية والسنية"
  }
]

const milestones = [
  {
    year: "2024",
    title: "Dentistry Studies Begin",
    titleAr: "بدء دراسات طب الأسنان",
    description: "Started comprehensive dental education at King Salman International University",
    descriptionAr: "بدء التعليم السني الشامل في جامعة الملك سلمان الدولية"
  },
  {
    year: "2023",
    title: "AI & ML Specialization",
    titleAr: "تخصص الذكاء الاصطناعي والتعلم الآلي",
    description: "Achieved advanced certifications in AI and machine learning technologies",
    descriptionAr: "تحقيق شهادات متقدمة في تقنيات الذكاء الاصطناعي والتعلم الآلي"
  },
  {
    year: "2022",
    title: "Cybersecurity Expert",
    titleAr: "خبير الأمن السيبراني",
    description: "Became certified ethical hacker and cybersecurity specialist",
    descriptionAr: "أصبح مختبر اختراق أخلاقي معتمد ومتخصص أمن سيبراني"
  },
  {
    year: "2021",
    title: "Full-Stack Mastery",
    titleAr: "إتقان التطوير الشامل",
    description: "Mastered full-stack development across multiple platforms and technologies",
    descriptionAr: "إتقان التطوير الشامل عبر منصات وتقنيات متعددة"
  },
  {
    year: "2020",
    title: "Mobile Development",
    titleAr: "تطوير المحمول",
    description: "Specialized in mobile app development for iOS and Android platforms",
    descriptionAr: "التخصص في تطوير التطبيقات المحمولة لمنصات iOS و Android"
  },
  {
    year: "2019",
    title: "Career Launch",
    titleAr: "إطلاق المسيرة المهنية",
    description: "Started professional journey in software development and design",
    descriptionAr: "بدء المسيرة المهنية في تطوير البرمجيات والتصميم"
  }
]

export function Achievements() {
  const { language } = useLanguage()

  return (
    <section id="achievements" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
            {language === "en" ? "Achievements & Milestones" : "الإنجازات والمعالم"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            {language === "en" 
              ? "Key achievements and milestones in my professional journey"
              : "الإنجازات والمعالم الرئيسية في مسيرتي المهنية"
            }
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 hover:scale-105 group ${achievement.bgColor}`}>
                <CardContent className="p-0 text-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4"
                  >
                    <achievement.icon className={`w-12 h-12 ${achievement.color} mx-auto group-hover:scale-110 transition-transform duration-300`} />
                  </motion.div>
                  <div className="text-3xl font-bold text-primary mb-2">{achievement.value}</div>
                  <div className="text-sm font-semibold mb-1">
                    {language === "en" ? achievement.title : achievement.titleAr}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {language === "en" ? achievement.description : achievement.descriptionAr}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <h3 className="text-2xl font-bold text-center mb-12">
            {language === "en" ? "Career Timeline" : "الجدول الزمني للمسيرة المهنية"}
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent" />
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex items-start gap-6"
                >
                  {/* Timeline Dot */}
                  <div className="relative z-10 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {milestone.year}
                  </div>
                  
                  {/* Content */}
                  <Card className="flex-1 p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 hover:scale-105">
                    <CardContent className="p-0">
                      <h4 className="text-xl font-semibold mb-2">
                        {language === "en" ? milestone.title : milestone.titleAr}
                      </h4>
                      <p className="text-muted-foreground">
                        {language === "en" ? milestone.description : milestone.descriptionAr}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


