"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ArrowUp, ArrowDown, Edit, Trash2, Star } from "lucide-react"

interface Feedback {
  id: string
  name: string
  nameAr: string
  role: string
  roleAr: string
  content: string
  contentAr: string
  avatar: string
  rating: number
  visible: boolean
  order: number
}

export function AdminFeedbacks() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFeedbacks()
  }, [])

  const loadFeedbacks = async () => {
    try {
      const response = await fetch('/api/admin/feedbacks')
      const data = await response.json()
      setFeedbacks(data)
    } catch (error) {
      console.error('Error loading feedbacks:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateFeedbackOrder = async (feedbackId: string, direction: 'up' | 'down') => {
    const feedbackIndex = feedbacks.findIndex(f => f.id === feedbackId)
    if (feedbackIndex === -1) return

    const newFeedbacks = [...feedbacks]
    const targetIndex = direction === 'up' ? feedbackIndex - 1 : feedbackIndex + 1
    
    if (targetIndex < 0 || targetIndex >= newFeedbacks.length) return

    [newFeedbacks[feedbackIndex], newFeedbacks[targetIndex]] = [newFeedbacks[targetIndex], newFeedbacks[feedbackIndex]]
    
    // Update order numbers
    newFeedbacks.forEach((feedback, index) => {
      feedback.order = index
    })

    setFeedbacks(newFeedbacks)
    await fetch('/api/admin/feedbacks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFeedbacks)
    })
  }

  const toggleFeedbackVisibility = async (feedbackId: string) => {
    const newFeedbacks = feedbacks.map(f => 
      f.id === feedbackId ? { ...f, visible: !f.visible } : f
    )
    setFeedbacks(newFeedbacks)
    await fetch('/api/admin/feedbacks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFeedbacks)
    })
  }

  const deleteFeedback = async (feedbackId: string) => {
    const newFeedbacks = feedbacks.filter(f => f.id !== feedbackId)
    setFeedbacks(newFeedbacks)
    await fetch('/api/admin/feedbacks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFeedbacks)
    })
  }

  if (loading) {
    return <div>Loading feedbacks...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Feedbacks</CardTitle>
        <CardDescription>
          Control feedback visibility and ordering
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {feedbacks.map((feedback, index) => (
            <div key={feedback.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <img 
                  src={feedback.avatar} 
                  alt={feedback.name}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{feedback.name}</h3>
                  <p className="text-sm text-gray-600">{feedback.role}</p>
                  <p className="text-sm text-gray-500 mt-1 max-w-md">{feedback.content}</p>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">({feedback.rating}/5)</span>
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <span className="text-xs text-gray-500">Order: {feedback.order}</span>
                    <span className={`text-xs px-2 py-1 rounded ${feedback.visible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {feedback.visible ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateFeedbackOrder(feedback.id, 'up')}
                  disabled={index === 0}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateFeedbackOrder(feedback.id, 'down')}
                  disabled={index === feedbacks.length - 1}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Switch
                  checked={feedback.visible}
                  onCheckedChange={() => toggleFeedbackVisibility(feedback.id)}
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    // TODO: Implement edit functionality
                    console.log('Edit feedback:', feedback.id)
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => deleteFeedback(feedback.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}








