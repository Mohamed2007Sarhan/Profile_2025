"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Crown, Shield } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

const pricingPlans = [
  {
    id: "basic",
    name: "Basic Development",
    nameAr: "التطوير الأساسي",
    price: "500",
    priceAr: "500",
    currency: "USD",
    currencyAr: "دولار",
    period: "project",
    periodAr: "مشروع",
    icon: Zap,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    popular: false,
    features: [
      "Simple Website Development",
      "Basic UI/UX Design",
      "Responsive Design",
      "1 Month Support",
      "Basic SEO Optimization",
      "Contact Form Integration"
    ],
    featuresAr: [
      "تطوير موقع ويب بسيط",
      "تصميم واجهة أساسي",
      "تصميم متجاوب",
      "دعم لمدة شهر",
      "تحسين محركات البحث الأساسي",
      "تكامل نموذج التواصل"
    ]
  },
  {
    id: "professional",
    name: "Professional Development",
    nameAr: "التطوير المهني",
    price: "1200",
    priceAr: "1200",
    currency: "USD",
    currencyAr: "دولار",
    period: "project",
    periodAr: "مشروع",
    icon: Star,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    popular: true,
    features: [
      "Full-Stack Web Application",
      "Advanced UI/UX Design",
      "Database Integration",
      "API Development",
      "3 Months Support",
      "Advanced SEO & Performance",
      "Admin Panel",
      "Payment Integration",
      "Mobile Responsive",
      "Security Implementation"
    ],
    featuresAr: [
      "تطبيق ويب شامل",
      "تصميم واجهة متقدم",
      "تكامل قاعدة البيانات",
      "تطوير واجهات برمجة التطبيقات",
      "دعم لمدة 3 أشهر",
      "تحسين محركات البحث والأداء المتقدم",
      "لوحة إدارة",
      "تكامل الدفع",
      "متجاوب مع المحمول",
      "تنفيذ الأمان"
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise Solution",
    nameAr: "حل المؤسسات",
    price: "2500",
    priceAr: "2500",
    currency: "USD",
    currencyAr: "دولار",
    period: "project",
    periodAr: "مشروع",
    icon: Crown,
    color: "text-gold-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    popular: false,
    features: [
      "Complex Enterprise Application",
      "Custom AI Integration",
      "Advanced Security & Compliance",
      "Scalable Architecture",
      "6 Months Support",
      "Performance Optimization",
      "Multi-language Support",
      "Advanced Analytics",
      "Cloud Deployment",
      "24/7 Monitoring",
      "Custom Features",
      "Team Training"
    ],
    featuresAr: [
      "تطبيق مؤسسي معقد",
      "تكامل ذكاء اصطناعي مخصص",
      "أمان متقدم وامتثال",
      "هندسة معمارية قابلة للتوسع",
      "دعم لمدة 6 أشهر",
      "تحسين الأداء",
      "دعم متعدد اللغات",
      "تحليلات متقدمة",
      "نشر سحابي",
      "مراقبة 24/7",
      "ميزات مخصصة",
      "تدريب الفريق"
    ]
  }
]

const servicePricing = [
  {
    id: "web-development",
    name: "Web Development",
    nameAr: "تطوير الويب",
    price: "50",
    priceAr: "50",
    currency: "USD",
    currencyAr: "دولار",
    period: "hour",
    periodAr: "ساعة",
    description: "Custom web development services",
    descriptionAr: "خدمات تطوير الويب المخصصة"
  },
  {
    id: "mobile-development",
    name: "Mobile Development",
    nameAr: "تطوير المحمول",
    price: "60",
    priceAr: "60",
    currency: "USD",
    currencyAr: "دولار",
    period: "hour",
    periodAr: "ساعة",
    description: "iOS and Android app development",
    descriptionAr: "تطوير تطبيقات iOS و Android"
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    nameAr: "الأمن السيبراني",
    price: "80",
    priceAr: "80",
    currency: "USD",
    currencyAr: "دولار",
    period: "hour",
    periodAr: "ساعة",
    description: "Security audits and penetration testing",
    descriptionAr: "مراجعات الأمان واختبار الاختراق"
  },
  {
    id: "ai-development",
    name: "AI Development",
    nameAr: "تطوير الذكاء الاصطناعي",
    price: "100",
    priceAr: "100",
    currency: "USD",
    currencyAr: "دولار",
    period: "hour",
    periodAr: "ساعة",
    description: "AI and machine learning solutions",
    descriptionAr: "حلول الذكاء الاصطناعي والتعلم الآلي"
  },
  {
    id: "dental-tech",
    name: "Dental Technology",
    nameAr: "التكنولوجيا السنية",
    price: "120",
    priceAr: "120",
    currency: "USD",
    currencyAr: "دولار",
    period: "hour",
    periodAr: "ساعة",
    description: "Specialized dental software development",
    descriptionAr: "تطوير برمجيات الأسنان المتخصصة"
  },
  {
    id: "consulting",
    name: "Technical Consulting",
    nameAr: "الاستشارات التقنية",
    price: "75",
    priceAr: "75",
    currency: "USD",
    currencyAr: "دولار",
    period: "hour",
    periodAr: "ساعة",
    description: "Expert technical consultation",
    descriptionAr: "استشارة تقنية خبيرة"
  }
]

export function Pricing() {
  const { language } = useLanguage()

  return (
    <section id="pricing" className="py-20">
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
            {language === "en" ? "Pricing & Services" : "الأسعار والخدمات"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            {language === "en" 
              ? "Transparent pricing for all your development needs"
              : "أسعار شفافة لجميع احتياجاتك التطويرية"
            }
          </p>
        </motion.div>

        {/* Project Pricing Plans */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            {language === "en" ? "Project Packages" : "باقات المشاريع"}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      {language === "en" ? "Most Popular" : "الأكثر شعبية"}
                    </Badge>
                  </div>
                )}
                <Card className={`h-full bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 hover:scale-105 group ${plan.bgColor} ${plan.borderColor} hover:border-opacity-50`}>
                  <CardHeader className="text-center pb-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`w-16 h-16 mx-auto mb-4 rounded-full ${plan.bgColor} flex items-center justify-center`}
                    >
                      <plan.icon className={`w-8 h-8 ${plan.color}`} />
                    </motion.div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                      {language === "en" ? plan.name : plan.nameAr}
                    </CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-primary">
                        ${language === "en" ? plan.price : plan.priceAr}
                      </span>
                      <span className="text-muted-foreground ml-2">
                        / {language === "en" ? plan.period : plan.periodAr}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {(language === "en" ? plan.features : plan.featuresAr).map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-2 text-sm"
                        >
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full mt-6 ${plan.popular ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' : ''}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {language === "en" ? "Get Started" : "ابدأ الآن"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hourly Services */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8">
            {language === "en" ? "Hourly Services" : "الخدمات بالساعة"}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicePricing.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 hover:scale-105 group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                        {language === "en" ? service.name : service.nameAr}
                      </h4>
                      <div className="mb-3">
                        <span className="text-3xl font-bold text-primary">
                          ${language === "en" ? service.price : service.priceAr}
                        </span>
                        <span className="text-muted-foreground ml-1">
                          / {language === "en" ? service.period : service.periodAr}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {language === "en" ? service.description : service.descriptionAr}
                      </p>
                      <Button variant="outline" className="w-full">
                        {language === "en" ? "Book Now" : "احجز الآن"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="space-y-4">
              <h3 className="text-2xl font-bold">
                {language === "en" ? "Need a Custom Quote?" : "تحتاج عرض سعر مخصص؟"}
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === "en" 
                  ? "Contact me for a personalized quote based on your specific requirements. I offer flexible payment plans and project timelines."
                  : "تواصل معي للحصول على عرض سعر مخصص بناءً على متطلباتك الخاصة. أقدم خطط دفع مرنة وجداول زمنية للمشاريع."
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  {language === "en" ? "Get Custom Quote" : "احصل على عرض مخصص"}
                </Button>
                <Button size="lg" variant="outline">
                  {language === "en" ? "Schedule Consultation" : "جدولة استشارة"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
