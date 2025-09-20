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
    title: "Senior Software Engineer & Penetration Tester + Dentistry Student",
    titleAr: "مهندس برمجيات أول ومختبر اختراق + طالب طب أسنان",
    company: "CyberTech Solutions & King Salman International University",
    companyAr: "حلول سايبر تك وجامعة الملك سلمان الدولية",
    description:
      "Leading cybersecurity initiatives and developing enterprise-grade applications. Specializing in AI development, penetration testing, mobile app development, and desktop applications. Currently pursuing Dentistry studies at King Salman International University, combining technical expertise with medical knowledge.",
    descriptionAr:
      "قيادة مبادرات الأمن السيبراني وتطوير تطبيقات على مستوى المؤسسات. التخصص في تطوير الذكاء الاصطناعي واختبار الاختراق وتطوير التطبيقات المحمولة وتطبيقات سطح المكتب. أدرس حالياً طب الأسنان في جامعة الملك سلمان الدولية، مما يجمع بين الخبرة التقنية والمعرفة الطبية.",
  },
  {
    year: "2023",
    yearAr: "٢٠٢٣",
    title: "Full Stack Developer & Mobile Developer",
    titleAr: "مطور شامل ومطور محمول",
    company: "TechInnovate & MobileFirst",
    companyAr: "تيك إنوفيت وموبايل فيرست",
    description:
      "Developed full-stack web applications and Android applications. Implemented AI-powered features, real-time communication systems, and cross-platform mobile solutions. Focused on performance optimization and user experience.",
    descriptionAr: "تطوير تطبيقات ويب شاملة وتطبيقات أندرويد. تنفيذ ميزات مدعومة بالذكاء الاصطناعي وأنظمة اتصال فورية وحلول محمولة متعددة المنصات. التركيز على تحسين الأداء وتجربة المستخدم.",
  },
  {
    year: "2022",
    yearAr: "٢٠٢٢",
    title: "Cybersecurity Specialist & Web Developer",
    titleAr: "متخصص أمن سيبراني ومطور ويب",
    company: "SecureTech & WebSolutions",
    companyAr: "سكيور تك وحلول الويب",
    description:
      "Conducted penetration testing and security audits for various organizations. Developed secure web applications and implemented cybersecurity best practices. Gained expertise in vulnerability assessment and incident response.",
    descriptionAr: "إجراء اختبارات الاختراق ومراجعات الأمان لمؤسسات مختلفة. تطوير تطبيقات ويب آمنة وتنفيذ أفضل ممارسات الأمن السيبراني. اكتساب خبرة في تقييم الثغرات والاستجابة للحوادث.",
  },
  {
    year: "2021",
    yearAr: "٢٠٢١",
    title: "Software Engineer & AI Developer",
    titleAr: "مهندس برمجيات ومطور ذكاء اصطناعي",
    company: "AI Solutions & DataTech",
    companyAr: "حلول الذكاء الاصطناعي ودايتا تك",
    description:
      "Developed AI-powered applications and machine learning models. Built desktop applications and web services. Specialized in Python, C#, and modern web technologies. Implemented data analysis and visualization solutions.",
    descriptionAr: "تطوير تطبيقات مدعومة بالذكاء الاصطناعي ونماذج التعلم الآلي. بناء تطبيقات سطح المكتب وخدمات الويب. التخصص في Python و C# وتقنيات الويب الحديثة. تنفيذ حلول تحليل البيانات والتصور.",
  },
  {
    year: "2020",
    yearAr: "٢٠٢٠",
    title: "Full-Stack Developer",
    titleAr: "مطور شامل",
    company: "WebTech Solutions",
    companyAr: "حلول ويب تك",
    description:
      "Built full-stack applications with React, Node.js, and modern databases. Developed responsive web applications and RESTful APIs. Gained experience in cloud deployment and DevOps practices.",
    descriptionAr: "بناء تطبيقات شاملة باستخدام React و Node.js وقواعد البيانات الحديثة. تطوير تطبيقات ويب متجاوبة وواجهات برمجة تطبيقات RESTful. اكتساب خبرة في نشر السحابة وممارسات DevOps.",
  },
  {
    year: "2019",
    yearAr: "٢٠١٩",
    title: "Frontend Developer & UI/UX Designer",
    titleAr: "مطور واجهات أمامية ومصمم واجهات المستخدم",
    company: "Creative Digital Agency",
    companyAr: "الوكالة الرقمية الإبداعية",
    description:
      "Started career in web development and UI/UX design. Learned modern frameworks and design principles. Created responsive websites and interactive user interfaces. Developed skills in HTML, CSS, JavaScript, and design tools.",
    descriptionAr: "بدء المسيرة المهنية في تطوير الويب وتصميم واجهات المستخدم. تعلم الأطر الحديثة ومبادئ التصميم. إنشاء مواقع ويب متجاوبة وواجهات مستخدم تفاعلية. تطوير مهارات في HTML و CSS و JavaScript وأدوات التصميم.",
  },
]

const achievements = [
  {
    icon: Award,
    title: "Cybersecurity Expert",
    titleAr: "خبير الأمن السيبراني",
    description: "8+ years of penetration testing & security",
    descriptionAr: "أكثر من 8 سنوات في اختبار الاختراق والأمان",
  },
  {
    icon: Users,
    title: "Multi-Platform Developer",
    titleAr: "مطور متعدد المنصات",
    description: "Web, Mobile, Desktop & AI applications",
    descriptionAr: "تطبيقات ويب ومحمول وسطح مكتب وذكاء اصطناعي",
  },
  {
    icon: Code,
    title: "AI & Machine Learning",
    titleAr: "الذكاء الاصطناعي والتعلم الآلي",
    description: "Advanced AI tools and ML models",
    descriptionAr: "أدوات ذكاء اصطناعي ونماذج تعلم آلي متقدمة",
  },
]

export function About() {
  const { language } = useLanguage()
  const t = useTranslation(language)

  const downloadResume = () => {
    const link = document.createElement("a")
    link.href = "/resume-mohamed.pdf"
    link.download = "Mohamed-Resume.pdf"
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
                      <div className="w-full h-full rounded-full bg-muted flex items-center justify-center" style={{display: 'none'}}>
                        <span className="text-4xl font-serif font-bold text-primary">M</span>
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-background rounded-full animate-pulse" />
                    </div>
                  </div>

                  <div className={`flex-1 ${language === "ar" ? "text-right" : "text-left"}`}>
                    <h3 className="text-2xl font-serif font-bold mb-2">Dr. Mohamed Sarhan Hamed</h3>
                    <p className="text-primary font-medium mb-3">{t.heroTitle}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{language === "en" ? "New Damietta, Egypt" : "دمياط الجديدة، مصر"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{language === "en" ? "8+ Years Experience" : "أكثر من 8 سنوات خبرة"}</span>
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
                      ? "As a passionate Software Engineer and Penetration Tester, I specialize in creating secure, high-performance applications across multiple platforms. My expertise spans from AI development and machine learning to penetration testing, mobile app development, and desktop applications. I'm dedicated to building solutions that not only meet technical requirements but also provide robust security and exceptional user experiences."
                      : "كمهندس برمجيات ومختبر اختراق شغوف، أتخصص في إنشاء تطبيقات آمنة وعالية الأداء عبر منصات متعددة. تمتد خبرتي من تطوير الذكاء الاصطناعي والتعلم الآلي إلى اختبار الاختراق وتطوير التطبيقات المحمولة وتطبيقات سطح المكتب. أنا ملتزم ببناء حلول لا تلبي المتطلبات التقنية فحسب بل تقدم أيضاً أماناً قوياً وتجارب مستخدم استثنائية."}
                  </p>
                  <p>
                    {language === "en"
                      ? "With 8+ years of experience in software engineering, cybersecurity, and AI development, I've successfully delivered projects ranging from enterprise-grade security solutions to innovative mobile applications. My diverse skill set includes Python, JavaScript, C#, Kotlin, and modern web technologies, allowing me to tackle complex challenges across different domains and create comprehensive solutions that drive business success."
                      : "مع أكثر من 8 سنوات من الخبرة في هندسة البرمجيات والأمن السيبراني وتطوير الذكاء الاصطناعي، نجحت في تسليم مشاريع تتراوح من حلول الأمان على مستوى المؤسسات إلى التطبيقات المحمولة المبتكرة. تشمل مجموعة مهاراتي المتنوعة Python و JavaScript و C# و Kotlin وتقنيات الويب الحديثة، مما يسمح لي بمعالجة التحديات المعقدة عبر مجالات مختلفة وإنشاء حلول شاملة تحقق نجاح الأعمال."}
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
