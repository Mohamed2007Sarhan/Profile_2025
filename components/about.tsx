"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Calendar, MapPin, Award, Users, Code } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { useTranslation } from "@/lib/i18n"

const timeline = [
  {
    year: "2024",
    yearAr: "٢٠٢٤",
    title: "Software Engineer (R&D & Embedded Systems)",
    titleAr: "مهندس برمجيات (بحث وتطوير وأنظمة مدمجة)",
    company: "Horus University",
    companyAr: "جامعة حورس",
    description:
      "Leading R&D engineering initiatives and developing embedded systems solutions. Specializing in building ML cores from scratch and custom exploit development.",
    descriptionAr:
      "قيادة مبادرات البحث والتطوير الهندسي وتطوير حلول الأنظمة المدمجة. التخصص في بناء أنوية التعلم الآلي من الصفر وتطوير استغلال الثغرات المخصص.",
  },
  {
    year: "2023",
    yearAr: "٢٠٢٣",
    title: "Full Stack Developer (On-site & Red Team)",
    titleAr: "مطور شامل (موقعي وفريق أحمر)",
    company: "Athr",
    companyAr: "أثر",
    description:
      "Developed full-stack web applications and conducted red team operations. Implemented secure coding practices and performed penetration testing on internal systems.",
    descriptionAr: "تطوير تطبيقات ويب شاملة وإجراء عمليات الفريق الأحمر. تنفيذ ممارسات الكود الآمن وإجراء اختبارات اختراق على الأنظمة الداخلية.",
  },
  {
    year: "2022",
    yearAr: "٢٠٢٢",
    title: "Frontend Software Engineer (On-site)",
    titleAr: "مهندس برمجيات واجهة أمامية (موقعي)",
    company: "iBrand",
    companyAr: "آي براند",
    description:
      "Engineered production-grade frontend architectures for high-traffic retail platforms. Focused on performance optimization and scalable component systems.",
    descriptionAr: "هندسة معماريات واجهة أمامية على مستوى الإنتاج لمنصات التجزئة عالية الزيارات. التركيز على تحسين الأداء وأنظمة المكونات القابلة للتوسع.",
  },
  {
    year: "2021",
    yearAr: "٢٠٢١",
    title: "Security Researcher & Tool Developer",
    titleAr: "باحث أمني ومطور أدوات",
    company: "Independent",
    companyAr: "مستقل",
    description:
      "Conducted independent security research and developed custom security tools. Discovered and reported vulnerabilities in various open-source projects.",
    descriptionAr: "إجراء أبحاث أمنية مستقلة وتطوير أدوات أمان مخصصة. اكتشاف والإبلاغ عن ثغرات في مشاريع مختلفة مفتوحة المصدر.",
  },
]

const achievements = [
  {
    icon: Award,
    title: "Red Team Operator",
    titleAr: "مشغل الفريق الأحمر",
    description: "9+ years of offensive security operations",
    descriptionAr: "أكثر من 9 سنوات من عمليات الأمن الهجومي",
  },
  {
    icon: Users,
    title: "Software Architect",
    titleAr: "مهندس برمجيات",
    description: "Scalable systems & Embedded Engineering",
    descriptionAr: "أنظمة قابلة للتوسع وهندسة مدمجة",
  },
  {
    icon: Code,
    title: "ML Core Developer",
    titleAr: "مطور نواة تعلم آلي",
    description: "Building Custom ML Libraries from Scratch",
    descriptionAr: "بناء مكتبات تعلم آلي مخصصة من الصفر",
  },
]

export function About() {
  const { language } = useLanguage()
  const t = useTranslation(language)

  const downloadResume = () => {
    const link = document.createElement("a")
    if (language === "ar") {
      link.href = "/resume-mohamed-ar.pdf"
      link.download = "resume-mohamed-AR.pdf"
    } else {
      link.href = "/resume-mohamed-en.pdf"
      link.download = "resume-mohamed-EN.pdf"
    }
    link.click()
  }

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`text-center mb-16 ${language === "ar" ? "text-right" : "text-left"}`}
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-4">{t.aboutTitle}</h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto text-balance">
            {t.aboutDescription}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Profile & Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Profile Card */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 p-1">
                      <img
                        src="/images/profile-mohamed.jpg"
                        alt="Dr. Mohamed Sarhan Hamed"
                        className="w-full h-full rounded-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full rounded-full bg-muted flex items-center justify-center" style={{ display: 'none' }}>
                        <span className="text-4xl font-serif font-bold text-primary">M</span>
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-background rounded-full animate-pulse" />
                    </div>
                  </div>

                  <div className={`flex-1 ${language === "ar" ? "text-right" : "text-left"}`}>
                    <h3 className="text-2xl font-serif font-bold mb-2">Mohamed Sarhan Hamed</h3>
                    <p className="text-primary font-medium mb-3">{t.heroTitle}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{language === "en" ? "New Damietta, Egypt" : "دمياط الجديدة، مصر"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{language === "en" ? "9+ Years Experience" : "أكثر من 9 سنوات خبرة"}</span>
                      </div>
                    </div>

                    <Button onClick={downloadResume} className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      {language === "en" ? "Download Resume" : "تحميل السيرة الذاتية"}
                    </Button>


                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bio */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-0 space-y-4">
                <h4 className="text-xl font-serif font-semibold">
                  {language === "en" ? "Professional Journey" : "الرحلة المهنية"}
                </h4>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    {language === "en"
                      ? "I don't just run scripts; I engineer them. Specializing in Embedded Systems (Raspberry Pi), Custom Exploit Development, and building ML cores from scratch. Currently balancing R&D engineering at Horus University with offensive security operations."
                      : "أنا لا أقوم فقط بتشغيل السكربتات؛ بل أقوم بهندستها. متخصص في الأنظمة المدمجة (Raspberry Pi)، وتطوير استغلال الثغرات المخصص، وبناء أنوية التعلم الآلي من الصفر. أوازن حالياً بين هندسة البحث والتطوير في جامعة حورس وعمليات الأمن الهجومي."}
                  </p>
                  <p>
                    {language === "en"
                      ? "With 9+ years of experience in software engineering and red teaming, I architect secure, resilient infrastructures. My expertise spans from low-level embedded programming to high-level cloud architecture, ensuring comprehensive security coverage."
                      : "مع أكثر من 9 سنوات من الخبرة في هندسة البرمجيات والفريق الأحمر، أقوم بتصميم بنى تحتية آمنة ومرنة. تمتد خبرتي من البرمجة منخفضة المستوى للأنظمة المدمجة إلى هندسة السحابة عالية المستوى، مما يضمن تغطية أمنية شاملة."}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-4 text-center bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-colors">
                    <CardContent className="p-0">
                      <achievement.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                      <h5 className="font-semibold text-sm mb-1">
                        {language === "en" ? achievement.title : achievement.titleAr}
                      </h5>
                      <p className="text-xs text-muted-foreground">
                        {language === "en" ? achievement.description : achievement.descriptionAr}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="text-xl font-serif font-semibold">
              {language === "en" ? "Career Timeline" : "الجدول الزمني للمسيرة المهنية"}
            </h4>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex items-start gap-6 pb-8"
                >
                  {/* Timeline Dot */}
                  <div className="relative z-10 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {language === "en" ? item.year.slice(-2) : item.yearAr.slice(-2)}
                  </div>

                  {/* Content */}
                  <Card className="flex-1 p-4 bg-card/50 backdrop-blur-sm border-border/50">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {language === "en" ? item.year : item.yearAr}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {language === "en" ? item.company : item.companyAr}
                        </span>
                      </div>
                      <h5 className="font-semibold mb-2">{language === "en" ? item.title : item.titleAr}</h5>
                      <p className="text-sm text-muted-foreground">
                        {language === "en" ? item.description : item.descriptionAr}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
