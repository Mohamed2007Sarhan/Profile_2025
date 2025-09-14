"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import testimonials from "@/data/testimonials.json"

export function TestimonialsSection() {
  const { language } = useLanguage()

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
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
            {language === "en" ? "What Clients Say" : "ماذا يقول العملاء"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            {language === "en" 
              ? "Testimonials from satisfied clients and colleagues who have worked with me"
              : "شهادات من العملاء والزملاء الراضين الذين عملوا معي"
            }
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <div className="flex justify-center mb-4">
                    <Quote className="w-8 h-8 text-primary/50 group-hover:text-primary transition-colors duration-300" />
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Testimonial Content */}
                  <blockquote className="text-center mb-6 text-muted-foreground italic">
                    "{language === "en" ? testimonial.content : testimonial.contentAr}"
                  </blockquote>

                  {/* Client Info */}
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <img
                        src={testimonial.avatar}
                        alt={language === "en" ? testimonial.name : testimonial.nameAr}
                        className="w-12 h-12 rounded-full object-cover mr-3"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <div>
                        <h4 className="font-semibold text-sm">
                          {language === "en" ? testimonial.name : testimonial.nameAr}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {language === "en" ? testimonial.role : testimonial.roleAr}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {testimonial.company}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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
                {language === "en" ? "Ready to Work Together?" : "مستعد للعمل معاً؟"}
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === "en" 
                  ? "Join the list of satisfied clients who have benefited from my expertise. Let's create something amazing together!"
                  : "انضم إلى قائمة العملاء الراضين الذين استفادوا من خبرتي. دعنا ننشئ شيئاً مذهلاً معاً!"
                }
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}


