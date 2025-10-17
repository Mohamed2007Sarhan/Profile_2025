"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, GraduationCap, Shield, Code2, Stethoscope, Brain, Trophy, Star } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

const certifications = [
  {
    id: "dentistry",
    title: "Bachelor of Dentistry",
    titleAr: "بكالوريوس طب الأسنان",
    issuer: "King Salman International University",
    issuerAr: "جامعة الملك سلمان الدولية",
    year: "2024-2032",
    status: "In Progress",
    statusAr: "قيد الدراسة",
    icon: Stethoscope,
    color: "text-emerald-600",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    description: "Comprehensive dental education program covering all aspects of oral health, dental surgery, and modern dental technology.",
    descriptionAr: "برنامج تعليمي شامل لطب الأسنان يغطي جميع جوانب صحة الفم وجراحة الأسنان والتكنولوجيا السنية الحديثة."
  },
  {
    id: "cybersecurity",
    title: "Certified Ethical Hacker (CEH)",
    titleAr: "خبير الاختراق الأخلاقي المعتمد",
    issuer: "EC-Council",
    issuerAr: "المجلس الأوروبي للشهادات",
    year: "2023",
    status: "Certified",
    statusAr: "معتمد",
    icon: Shield,
    color: "text-red-600",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    description: "Advanced certification in ethical hacking, penetration testing, and cybersecurity defense strategies.",
    descriptionAr: "شهادة متقدمة في الاختراق الأخلاقي واختبار الاختراق واستراتيجيات الدفاع السيبراني."
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning Specialist",
    titleAr: "متخصص الذكاء الاصطناعي والتعلم الآلي",
    issuer: "Google Cloud",
    issuerAr: "جوجل كلاود",
    year: "2023",
    status: "Certified",
    statusAr: "معتمد",
    icon: Brain,
    color: "text-purple-600",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    description: "Comprehensive certification covering machine learning, deep learning, and AI model deployment on cloud platforms.",
    descriptionAr: "شهادة شاملة تغطي التعلم الآلي والتعلم العميق ونشر نماذج الذكاء الاصطناعي على منصات السحابة."
  },
  {
    id: "fullstack",
    title: "Full Stack Developer",
    titleAr: "مطور شامل",
    issuer: "FreeCodeCamp",
    issuerAr: "فري كود كامب",
    year: "2022",
    status: "Certified",
    statusAr: "معتمد",
    icon: Code2,
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    description: "Complete full-stack development certification covering frontend, backend, databases, and deployment.",
    descriptionAr: "شهادة تطوير شامل كاملة تغطي الواجهة الأمامية والخلفية وقواعد البيانات والنشر."
  },
  {
    id: "mobile-dev",
    title: "Android Development",
    titleAr: "تطوير الأندرويد",
    issuer: "Google Developer",
    issuerAr: "مطور جوجل",
    year: "2022",
    status: "Certified",
    statusAr: "معتمد",
    icon: Award,
    color: "text-green-600",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    description: "Professional Android development certification covering Kotlin, Java, and modern Android development practices.",
    descriptionAr: "شهادة تطوير أندرويد مهنية تغطي Kotlin و Java وممارسات تطوير الأندرويد الحديثة."
  },
  {
    id: "security-plus",
    title: "Security+ Certification",
    titleAr: "شهادة الأمان+",
    issuer: "CompTIA",
    issuerAr: "كومبتيا",
    year: "2021",
    status: "Certified",
    statusAr: "معتمد",
    icon: Trophy,
    color: "text-orange-600",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    description: "Foundational cybersecurity certification covering network security, threats, and risk management.",
    descriptionAr: "شهادة أساسية في الأمن السيبراني تغطي أمان الشبكات والتهديدات وإدارة المخاطر."
  }
]

const achievements = [
  {
    title: "GitHub Stars",
    titleAr: "نجوم جيثب",
    value: "500+",
    icon: Star,
    color: "text-yellow-500"
  },
  {
    title: "Projects Completed",
    titleAr: "المشاريع المكتملة",
    value: "50+",
    icon: Trophy,
    color: "text-blue-500"
  },
  {
    title: "Years Experience",
    titleAr: "سنوات الخبرة",
    value: "8+",
    icon: Award,
    color: "text-green-500"
  },
  {
    title: "Certifications",
    titleAr: "الشهادات",
    value: "12+",
    icon: GraduationCap,
    color: "text-purple-500"
  }
]

export function Certifications() {
  const { language } = useLanguage()

  return (
    <section id="certifications" className="py-20 bg-muted/30">
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
            {language === "en" ? "Certifications & Achievements" : "الشهادات والإنجازات"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            {language === "en" 
              ? "Professional certifications and achievements that demonstrate expertise across multiple domains"
              : "الشهادات المهنية والإنجازات التي تثبت الخبرة عبر مجالات متعددة"
            }
          </p>
        </motion.div>

        {/* Achievements Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 hover:scale-105">
                <CardContent className="p-0">
                  <achievement.icon className={`w-8 h-8 ${achievement.color} mx-auto mb-3`} />
                  <div className="text-2xl font-bold text-primary mb-1">{achievement.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {language === "en" ? achievement.title : achievement.titleAr}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 hover:scale-105 group ${cert.bgColor} ${cert.borderColor} hover:border-opacity-50`}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`p-2 rounded-lg ${cert.bgColor} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <cert.icon className={`w-6 h-6 ${cert.color}`} />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                        {language === "en" ? cert.title : cert.titleAr}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {language === "en" ? cert.issuer : cert.issuerAr}
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {cert.year}
                    </Badge>
                    <Badge 
                      variant={cert.status === "Certified" ? "default" : "secondary"}
                      className={`text-xs ${cert.status === "Certified" ? "bg-green-600" : "bg-blue-600"}`}
                    >
                      {language === "en" ? cert.status : cert.statusAr}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {language === "en" ? cert.description : cert.descriptionAr}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}






