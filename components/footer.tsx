"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Instagram, MessageCircle, Twitter, Mail, ArrowUp, Heart, Zap } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { useTranslation } from "@/lib/i18n"

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/Mohamed2007Sarhan",
    color: "hover:text-gray-900 dark:hover:text-gray-100",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/mohamed-sarhan-a18530383",
    color: "hover:text-blue-600",
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    href: "https://wa.me/201040922321",
    color: "hover:text-green-600",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://x.com/MohamedSarh8",
    color: "hover:text-blue-400",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/mohamed_sarhan6608",
    color: "hover:text-pink-500",
  },
]

const quickLinks = [
  { name: "Home", nameAr: "الرئيسية", href: "#home" },
  { name: "About", nameAr: "نبذة", href: "#about" },
  { name: "Projects", nameAr: "المشاريع", href: "#projects" },
  { name: "Skills", nameAr: "المهارات", href: "#skills" },
  { name: "Contact", nameAr: "التواصل", href: "#contact" },
]

const services = [
  { name: "Full Stack Development", nameAr: "التطوير الشامل" },
  { name: "Cybersecurity & Penetration Testing", nameAr: "الأمن السيبراني واختبار الاختراق" },
  { name: "AI & Machine Learning", nameAr: "الذكاء الاصطناعي والتعلم الآلي" },
  { name: "Web Applications", nameAr: "تطبيقات الويب" },
  { name: "Security Auditing", nameAr: "مراجعة الأمان" },
]

export function Footer() {
  const { language } = useLanguage()
  const t = useTranslation(language)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-muted/30 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-serif font-bold text-primary">{language === "en" ? "Mohamed Sarhan" : "محمد سرحان"}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {language === "en"
                    ? "Full Stack Developer & Cybersecurity Specialist with 8+ years of experience. Expert in AI development, penetration testing, and modern web technologies. Building secure, high-performance applications."
                    : "مطور شامل ومتخصص أمن سيبراني مع أكثر من 8 سنوات خبرة. خبير في تطوير الذكاء الاصطناعي واختبار الاختراق وتقنيات الويب الحديثة. بناء تطبيقات آمنة وعالية الأداء."}
                </p>

                {/* Availability Badge */}
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <Badge variant="secondary" className="text-xs">
                    {t.availability}
                  </Badge>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg bg-background/50 text-muted-foreground transition-colors ${social.color}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-4 h-4" />
                      <span className="sr-only">{social.name}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h4 className="font-semibold mb-4">{language === "en" ? "Quick Links" : "روابط سريعة"}</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {language === "en" ? link.name : link.nameAr}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h4 className="font-semibold mb-4">{language === "en" ? "Services" : "الخدمات"}</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name} className="text-sm text-muted-foreground">
                    {language === "en" ? service.name : service.nameAr}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h4 className="font-semibold mb-4">{language === "en" ? "Let's Work Together" : "لنعمل معاً"}</h4>
              <p className="text-sm text-muted-foreground mb-4">
                {language === "en"
                  ? "Ready to bring your ideas to life? Let's discuss your next project."
                  : "مستعد لتحويل أفكارك إلى واقع؟ لنناقش مشروعك القادم."}
              </p>
              <Button
                onClick={() => scrollToSection("#contact")}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Mail className="w-4 h-4 mr-2" />
                {language === "en" ? "Get In Touch" : "تواصل معي"}
              </Button>
            </motion.div>
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <span>© 2024 Mohamed.</span>
              <span>{t.rights}</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                {language === "en" ? "Built with" : "مبني بـ"}
                <Heart className="w-3 h-3 text-red-500" />
                {language === "en" ? "and" : "و"}
                <Zap className="w-3 h-3 text-yellow-500" />
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              {/* Performance Badge */}
              <Badge variant="outline" className="text-xs">
                <Zap className="w-3 h-3 mr-1" />
                {language === "en" ? "Lighthouse 95+" : "Lighthouse 95+"}
              </Badge>

              {/* Scroll to Top */}
              <Button variant="ghost" size="sm" onClick={scrollToTop} className="p-2">
                <ArrowUp className="w-4 h-4" />
                <span className="sr-only">{language === "en" ? "Scroll to top" : "العودة للأعلى"}</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}
