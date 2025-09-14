"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/hooks/use-language"
import { useSiteSettings } from "@/components/site-settings-provider"

interface Service {
  id: string
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  icon: string
  order: number
  visible: boolean
}

export function Services() {
  const { language } = useLanguage()
  const { settings } = useSiteSettings()
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    const loadServices = async () => {
      try {
        const servicesRes = await fetch('/api/admin/services')
        const servicesData = await servicesRes.json()
        setServices(servicesData)
      } catch (error) {
        console.error('Error loading services:', error)
        // Fallback to default services
        setServices([
          {
            id: 'web-development',
            title: 'Web Development',
            titleAr: 'تطوير المواقع',
            description: 'Full-stack web development using modern technologies like React, Next.js, Node.js, and TypeScript.',
            descriptionAr: 'تطوير مواقع ويب كاملة باستخدام تقنيات حديثة مثل React و Next.js و Node.js و TypeScript.',
            icon: '💻',
            order: 0,
            visible: true
          },
          {
            id: 'mobile-development',
            title: 'Mobile Development',
            titleAr: 'تطوير التطبيقات',
            description: 'Cross-platform mobile app development using React Native and Flutter.',
            descriptionAr: 'تطوير تطبيقات الهاتف المحمول متعددة المنصات باستخدام React Native و Flutter.',
            icon: '📱',
            order: 1,
            visible: true
          },
          {
            id: 'ai-development',
            title: 'AI Development',
            titleAr: 'تطوير الذكاء الاصطناعي',
            description: 'Artificial Intelligence and Machine Learning solutions using Python and TensorFlow.',
            descriptionAr: 'حلول الذكاء الاصطناعي والتعلم الآلي باستخدام Python و TensorFlow.',
            icon: '🤖',
            order: 2,
            visible: true
          }
        ])
      }
    }

    loadServices()
  }, [])

  if (!settings.showServices) {
    return null
  }

  const visibleServices = services
    .filter(service => service.visible)
    .sort((a, b) => (a.order || 0) - (b.order || 0))

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {language === 'ar' ? 'الخدمات' : 'Services'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'أقدم مجموعة شاملة من الخدمات التقنية لمساعدتك في تحقيق أهدافك الرقمية'
              : 'I offer a comprehensive range of technical services to help you achieve your digital goals'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80">
                <CardHeader className="text-center pb-4">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-4xl">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {language === 'ar' ? service.titleAr : service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground leading-relaxed">
                    {language === 'ar' ? service.descriptionAr : service.description}
                  </p>
                  <div className="mt-6">
                    <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                      {language === 'ar' ? 'تعرف على المزيد' : 'Learn More'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300">
              {language === 'ar' ? 'احصل على استشارة مجانية' : 'Get Free Consultation'}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}