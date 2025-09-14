"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Star, Send, MessageCircle, ThumbsUp, Heart, CheckCircle } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { useSiteSettings } from "@/components/site-settings-provider"
import { VisibleFeedbacks } from "@/components/visible-feedbacks"

const feedbackCategories = [
  { id: "general", name: "General Feedback", nameAr: "ملاحظات عامة", icon: MessageCircle, color: "text-blue-500" },
  { id: "project", name: "Project Feedback", nameAr: "ملاحظات المشروع", icon: ThumbsUp, color: "text-green-500" },
  { id: "service", name: "Service Feedback", nameAr: "ملاحظات الخدمة", icon: Heart, color: "text-red-500" },
  { id: "suggestion", name: "Suggestions", nameAr: "اقتراحات", icon: Star, color: "text-yellow-500" }
]

export function Feedback() {
  const { language } = useLanguage()
  const { settings } = useSiteSettings()
  const [selectedCategory, setSelectedCategory] = useState("general")
  const [rating, setRating] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    category: "general"
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (!settings.showFeedback) {
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Create feedback object
    const feedbackData = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      rating: rating,
      category: selectedCategory,
      timestamp: new Date().toISOString(),
      status: "new" // Default to new for admin review
    }
    
    try {
      console.log('Sending feedback data:', feedbackData)
      
      // Send to API
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      })
      
      console.log('Response status:', response.status)
      const responseData = await response.json()
      console.log('Response data:', responseData)
      
      if (response.ok) {
        setIsSubmitting(false)
        setIsSubmitted(true)
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({ name: "", email: "", message: "", category: "general" })
          setRating(0)
          setSelectedCategory("general")
        }, 3000)
      } else {
        throw new Error('Failed to submit feedback')
      }
    } catch (error) {
      console.error('Error submitting feedback:', error)
      setIsSubmitting(false)
      // Show error message to user
      alert(language === "en" ? "Failed to submit feedback. Please try again." : "فشل في إرسال الملاحظات. يرجى المحاولة مرة أخرى.")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (isSubmitted) {
    return (
      <section id="feedback" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Card className="max-w-md mx-auto p-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
              <CardContent className="space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <Heart className="w-16 h-16 text-green-500 mx-auto" />
                </motion.div>
                <h3 className="text-2xl font-bold text-green-600">
                  {language === "en" ? "Thank You!" : "شكراً لك!"}
                </h3>
                <p className="text-muted-foreground">
                  {language === "en" 
                    ? "Your feedback has been submitted successfully. I appreciate your input!"
                    : "تم إرسال ملاحظاتك بنجاح. أقدر مدخلاتك!"
                  }
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center gap-2 text-sm text-green-600"
                >
                  <CheckCircle className="w-4 h-4" />
                  {language === "en" ? "Feedback Approved & Saved" : "تمت الموافقة على الملاحظات وحفظها"}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="feedback" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100
          }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
            {language === "en" ? "Share Your Feedback" : "شارك ملاحظاتك"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            {language === "en" 
              ? "Your feedback helps me improve my services and create better experiences"
              : "ملاحظاتك تساعدني في تحسين خدماتي وإنشاء تجارب أفضل"
            }
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Feedback Form */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-center">
                  {language === "en" ? "Feedback Form" : "نموذج الملاحظات"}
                </CardTitle>
              </CardHeader>
              <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">
                    {language === "en" ? "Feedback Category" : "فئة الملاحظات"}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {feedbackCategories.map((category) => (
                      <motion.button
                        key={category.id}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(category.id)
                          setFormData(prev => ({ ...prev, category: category.id }))
                        }}
                        className={`p-3 rounded-lg border transition-all duration-200 ${
                          selectedCategory === category.id
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-2">
                          <category.icon className={`w-4 h-4 ${category.color}`} />
                          <span className="text-sm">
                            {language === "en" ? category.name : category.nameAr}
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">
                    {language === "en" ? "Rating" : "التقييم"}
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1"
                        whileHover={{ 
                          scale: 1.3,
                          rotate: [0, -10, 10, 0],
                          y: -2
                        }}
                        whileTap={{ scale: 0.8 }}
                        animate={{
                          scale: star <= rating ? [1, 1.1, 1] : 1,
                          rotate: star <= rating ? [0, 5, 0] : 0
                        }}
                        transition={{
                          scale: { duration: 0.3 },
                          rotate: { duration: 0.5 }
                        }}
                      >
                        <Star
                          className={`w-6 h-6 transition-all duration-300 ${
                            star <= rating
                              ? "text-yellow-400 fill-current drop-shadow-lg"
                              : "text-gray-300 hover:text-yellow-200"
                          }`}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {language === "en" ? "Name" : "الاسم"}
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={language === "en" ? "Your name" : "اسمك"}
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {language === "en" ? "Email" : "البريد الإلكتروني"}
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={language === "en" ? "your@email.com" : "بريدك@الإلكتروني.com"}
                    required
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {language === "en" ? "Message" : "الرسالة"}
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={language === "en" 
                      ? "Share your thoughts, suggestions, or feedback..." 
                      : "شارك أفكارك أو اقتراحاتك أو ملاحظاتك..."
                    }
                    rows={5}
                    required
                  />
                </div>

                {/* Submit Button */}
                <motion.div
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                    ) : (
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, 0]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                      >
                        <Send className="w-4 h-4 mr-2" />
                      </motion.div>
                    )}
                    {isSubmitting 
                      ? (language === "en" ? "Submitting..." : "جاري الإرسال...")
                      : (language === "en" ? "Submit Feedback" : "إرسال الملاحظات")
                    }
                  </Button>
                </motion.div>
              </form>
              </CardContent>
            </Card>

            {/* Visible Feedbacks */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-center">
                  {language === "en" ? "Recent Feedbacks" : "الملاحظات الأخيرة"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <VisibleFeedbacks />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
