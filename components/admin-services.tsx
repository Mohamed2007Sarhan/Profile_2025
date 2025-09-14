"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ArrowUp, ArrowDown, Edit, Trash2, Plus, Save, X } from "lucide-react"

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

export function AdminServices() {
  const [services, setServices] = useState<Service[]>([])
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      const response = await fetch('/api/admin/services')
      const data = await response.json()
      setServices(data)
    } catch (error) {
      console.error('Error loading services:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateServiceOrder = async (serviceId: string, direction: 'up' | 'down') => {
    const serviceIndex = services.findIndex(s => s.id === serviceId)
    if (serviceIndex === -1) return

    const newServices = [...services]
    const targetIndex = direction === 'up' ? serviceIndex - 1 : serviceIndex + 1
    
    if (targetIndex < 0 || targetIndex >= newServices.length) return

    [newServices[serviceIndex], newServices[targetIndex]] = [newServices[targetIndex], newServices[serviceIndex]]
    
    // Update order numbers
    newServices.forEach((service, index) => {
      service.order = index
    })

    setServices(newServices)
    await fetch('/api/admin/services', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newServices)
    })
  }

  const toggleServiceVisibility = async (serviceId: string) => {
    const newServices = services.map(s => 
      s.id === serviceId ? { ...s, visible: !s.visible } : s
    )
    setServices(newServices)
    await fetch('/api/admin/services', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newServices)
    })
  }

  const saveService = async (service: Service) => {
    let newServices
    if (editingService) {
      // Update existing service
      newServices = services.map(s => s.id === service.id ? service : s)
    } else {
      // Add new service
      const newService = {
        ...service,
        id: Date.now().toString(),
        order: services.length
      }
      newServices = [...services, newService]
    }

    setServices(newServices)
    await fetch('/api/admin/services', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newServices)
    })

    setEditingService(null)
    setIsAdding(false)
  }

  const deleteService = async (serviceId: string) => {
    const newServices = services.filter(s => s.id !== serviceId)
    setServices(newServices)
    await fetch('/api/admin/services', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newServices)
    })
  }

  if (loading) {
    return <div>Loading services...</div>
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Manage Services</CardTitle>
            <CardDescription>
              Control service visibility and content
            </CardDescription>
          </div>
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service, index) => (
            <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                  {service.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                  <div className="flex space-x-2 mt-2">
                    <span className="text-xs text-gray-500">Order: {service.order}</span>
                    <span className={`text-xs px-2 py-1 rounded ${service.visible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {service.visible ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateServiceOrder(service.id, 'up')}
                  disabled={index === 0}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateServiceOrder(service.id, 'down')}
                  disabled={index === services.length - 1}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Switch
                  checked={service.visible}
                  onCheckedChange={() => toggleServiceVisibility(service.id)}
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setEditingService(service)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => deleteService(service.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Service Modal */}
        {(isAdding || editingService) && (
          <ServiceForm
            service={editingService}
            onSave={saveService}
            onCancel={() => {
              setEditingService(null)
              setIsAdding(false)
            }}
          />
        )}
      </CardContent>
    </Card>
  )
}

function ServiceForm({ 
  service, 
  onSave, 
  onCancel 
}: { 
  service: Service | null
  onSave: (service: Service) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    title: service?.title || '',
    titleAr: service?.titleAr || '',
    description: service?.description || '',
    descriptionAr: service?.descriptionAr || '',
    icon: service?.icon || '💻',
    visible: service?.visible ?? true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      id: service?.id || '',
      ...formData,
      order: service?.order || 0
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">
          {service ? 'Edit Service' : 'Add New Service'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title (English)</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="titleAr">Title (Arabic)</Label>
              <Input
                id="titleAr"
                value={formData.titleAr}
                onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="description">Description (English)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="descriptionAr">Description (Arabic)</Label>
              <Textarea
                id="descriptionAr"
                value={formData.descriptionAr}
                onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="icon">Icon (Emoji)</Label>
            <Input
              id="icon"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              placeholder="💻"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="visible"
              checked={formData.visible}
              onCheckedChange={(checked) => setFormData({ ...formData, visible: checked })}
            />
            <Label htmlFor="visible">Visible</Label>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}







