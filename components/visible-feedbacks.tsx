"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MessageCircle, ThumbsUp, Heart, Code2 } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface Feedback {
  id: string
  name: string
  email: string
  message: string
  rating: number
  category: string
  timestamp: string
  status: string
}

export function VisibleFeedbacks() {
  const { language } = useLanguage()
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load visible feedbacks from admin API
    const loadFeedbacks = async () => {
      try {
        const response = await fetch('/api/admin/feedbacks')
        const allFeedbacks = await response.json()
        console.log('All feedbacks:', allFeedbacks)
        
        // Show only visible feedbacks
        const visibleFeedbacks = allFeedbacks.filter((feedback: any) => 
          feedback.visible === true || feedback.status === 'approved'
        )
        console.log('Visible feedbacks:', visibleFeedbacks)
        setFeedbacks(visibleFeedbacks)
      } catch (error) {
        console.error('Error loading feedbacks:', error)
        // Fallback to empty array if API fails
        setFeedbacks([])
      } finally {
        setIsLoading(false)
      }
    }

    loadFeedbacks()
  }, [])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'general': return MessageCircle
      case 'project': return ThumbsUp
      case 'service': return Heart
      case 'suggestion': return Code2
      default: return MessageCircle
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'general': return 'text-blue-500'
      case 'project': return 'text-green-500'
      case 'service': return 'text-red-500'
      case 'suggestion': return 'text-yellow-500'
      default: return 'text-gray-500'
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'general': return language === "en" ? "General" : "عام"
      case 'project': return language === "en" ? "Project" : "مشروع"
      case 'service': return language === "en" ? "Service" : "خدمة"
      case 'suggestion': return language === "en" ? "Suggestion" : "اقتراح"
      default: return category
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (feedbacks.length === 0) {
    return (
      <div className="text-center py-8">
        <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">
          {language === "en" ? "No feedbacks available yet" : "لا توجد ملاحظات متاحة بعد"}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {feedbacks.map((feedback, index) => {
        const CategoryIcon = getCategoryIcon(feedback.category)
        return (
          <motion.div
            key={feedback.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4 hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CategoryIcon className={`w-4 h-4 ${getCategoryColor(feedback.category)}`} />
                    <span className="font-medium">{feedback.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {getCategoryName(feedback.category)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < feedback.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-2">{feedback.message}</p>
                <div className="text-xs text-muted-foreground">
                  {new Date(feedback.timestamp).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
