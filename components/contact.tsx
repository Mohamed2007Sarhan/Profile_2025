"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, Send, Loader2, Calendar, Clock, Linkedin, MessageCircle, Github, Instagram, Twitter } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { useTranslation } from "@/lib/i18n"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    titleAr: "البريد الإلكتروني",
    value: "prof7mohamedsarhan@gmail.com",
    href: "mailto:prof7mohamedsarhan@gmail.com",
  },
  {
    icon: Phone,
    title: "Phone",
    titleAr: "الهاتف",
    value: "+201040922321",
    href: "tel:+201040922321",
  },
  {
    icon: MapPin,
    title: "Location",
    titleAr: "الموقع",
    value: "Damietta, Egypt",
    valueAr: "دمياط، مصر",
    href: "https://maps.google.com/?q=Damietta,Egypt",
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    titleAr: "لينكد إن",
    value: "Mohamed Sarhan",
    valueAr: "محمد سرحان",
    href: "https://www.linkedin.com/in/mohamed-sarhan-a18530383?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    titleAr: "واتساب",
    value: "+201040922321",
    valueAr: "+201040922321",
    href: "https://wa.me/201040922321",
  },
]

const availability = [
  {
    icon: Calendar,
    title: "Availability",
    titleAr: "التوفر",
    value: "Available for new projects",
    valueAr: "متاح لمشاريع جديدة",
  },
  {
    icon: Clock,
    title: "Response Time",
    titleAr: "وقت الاستجابة",
    value: "Within 24 hours",
    valueAr: "خلال 24 ساعة",
  },
]

export function Contact() {
  const { language } = useLanguage()
  const t = useTranslation(language)
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: language === "en" ? "Error" : "خطأ",
        description: language === "en" 
          ? "Please fill in all required fields" 
          : "الرجاء ملء جميع الحقول المطلوبة",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    // Email validation
    if (!validateEmail(formData.email)) {
      toast({
        title: language === "en" ? "Error" : "خطأ",
        description: language === "en" 
          ? "Please enter a valid email address" 
          : "الرجاء إدخال عنوان بريد إلكتروني صحيح",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mblkdlga", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _language: language,
        }),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        toast({
          title: language === "en" ? "Message sent!" : "تم إرسال الرسالة!",
          description: t.contactForm.success,
          duration: 5000,
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(
          data.error?.message || 
          (language === "en" 
            ? "Failed to send message" 
            : "فشل إرسال الرسالة")
        );
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: language === "en" ? "Error" : "خطأ",
        description: error instanceof Error 
          ? error.message 
          : language === "en" 
            ? "An error occurred. Please try again later." 
            : "حدث خطأ. يرجى المحاولة مرة أخرى لاحقًا.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const isFormValid = formData.name && formData.email && formData.subject && formData.message

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">{t.contactTitle}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">{t.contactDescription}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-serif font-bold mb-6">{language === "en" ? "Let's Connect" : "لنتواصل"}</h3>
              <p className="text-muted-foreground mb-8">
                {language === "en"
                  ? "I'm always interested in discussing new opportunities, innovative projects, and potential collaborations. Whether you have a specific project in mind or just want to explore possibilities, I'd love to hear from you."
                  : "أنا مهتم دائماً بمناقشة الفرص الجديدة والمشاريع المبتكرة والتعاونات المحتملة. سواء كان لديك مشروع محدد في الاعتبار أو تريد فقط استكشاف الإمكانيات، أود أن أسمع منك."}
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-colors">
                    <CardContent className="p-4">
                      <a
                        href={info.href}
                        target={info.href.startsWith("http") ? "_blank" : undefined}
                        rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-4 group"
                      >
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <info.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-sm text-muted-foreground">
                            {language === "en" ? info.title : info.titleAr}
                          </div>
                          <div className="font-semibold group-hover:text-primary transition-colors">
                            {language === "en" ? info.value : info.valueAr || info.value}
                          </div>
                        </div>
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Availability */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">{language === "en" ? "Availability" : "التوفر"}</h4>
              {availability.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <item.icon className="w-5 h-5 text-primary" />
                  <div>
                    <span className="font-medium text-sm text-muted-foreground">
                      {language === "en" ? item.title : item.titleAr}:
                    </span>{" "}
                    <span className="text-foreground">{language === "en" ? item.value : item.valueAr}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-serif">
                  {language === "en" ? "Send a Message" : "إرسال رسالة"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t.contactForm.name}</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-background/50"
                        placeholder={language === "en" ? "Your name" : "اسمك"}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t.contactForm.email}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-background/50"
                        placeholder={language === "en" ? "your@email.com" : "your@email.com"}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">{t.contactForm.subject}</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="bg-background/50"
                      placeholder={language === "en" ? "What would you like to discuss?" : "ما الذي تود مناقشته؟"}
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">{t.contactForm.message}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="bg-background/50 resize-none"
                      placeholder={
                        language === "en"
                          ? "Tell me about your project, timeline, and any specific requirements..."
                          : "أخبرني عن مشروعك والجدول الزمني وأي متطلبات محددة..."
                      }
                    />
                  </div>

                  {/* Honeypot field (hidden) */}
                  <input type="text" name="honeypot" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t.contactForm.sending}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {t.contactForm.send}
                      </>
                    )}
                  </Button>

                  {/* Form Footer */}
                  <p className="text-xs text-muted-foreground text-center">
                    {language === "en"
                      ? "I'll get back to you within 24 hours. Your information is kept private and secure."
                      : "سأرد عليك خلال 24 ساعة. معلوماتك محفوظة وآمنة."}
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Social Media Buttons */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-6">
            {language === "en" ? "Connect with me" : "تواصل معي"}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {/* GitHub */}
            <motion.a
              href="https://github.com/Mohamed2007Sarhan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/in/mohamed-sarhan-a18530383"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/201040922321"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </motion.a>

            {/* Twitter */}
            <motion.a
              href="https://x.com/MohamedSarh8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Twitter className="w-5 h-5" />
              <span>Twitter</span>
            </motion.a>

            {/* Instagram */}
            <motion.a
              href="https://www.instagram.com/dr.mohamed_sarhan6608"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram className="w-5 h-5" />
              <span>Instagram</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
