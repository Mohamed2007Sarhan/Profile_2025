"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, ArrowDown, Edit, Trash2, Eye, EyeOff } from "lucide-react"
import Image from "next/image"

interface Project {
  id: string
  title: string
  titleAr: string
  short: string
  shortAr: string
  cover: string
  tags: string[]
  year: number
  live: string
  repo: string
  order: number
  visible: boolean
}

export function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects')
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProjectOrder = async (projectId: string, direction: 'up' | 'down') => {
    const projectIndex = projects.findIndex(p => p.id === projectId)
    if (projectIndex === -1) return

    const newProjects = [...projects]
    const targetIndex = direction === 'up' ? projectIndex - 1 : projectIndex + 1
    
    if (targetIndex < 0 || targetIndex >= newProjects.length) return

    [newProjects[projectIndex], newProjects[targetIndex]] = [newProjects[targetIndex], newProjects[projectIndex]]
    
    // Update order numbers
    newProjects.forEach((project, index) => {
      project.order = index
    })

    setProjects(newProjects)
    await fetch('/api/admin/projects', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProjects)
    })
  }

  const toggleProjectVisibility = async (projectId: string) => {
    const newProjects = projects.map(p => 
      p.id === projectId ? { ...p, visible: !p.visible } : p
    )
    setProjects(newProjects)
    await fetch('/api/admin/projects', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProjects)
    })
  }

  const deleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    
    const newProjects = projects.filter(p => p.id !== projectId)
    setProjects(newProjects)
    await fetch('/api/admin/projects', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProjects)
    })
  }

  if (loading) {
    return <div>Loading projects...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Projects</CardTitle>
        <CardDescription>
          Control project visibility and ordering. Drag to reorder or use arrow buttons.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image 
                    src={project.cover} 
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate">{project.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{project.short}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>Year: {project.year}</span>
                    <span>Order: {project.order}</span>
                    <span className={`px-2 py-1 rounded-full ${
                      project.visible 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {project.visible ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 flex-shrink-0">
                {/* Order Controls */}
                <div className="flex flex-col space-y-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateProjectOrder(project.id, 'up')}
                    disabled={index === 0}
                    className="h-8 w-8 p-0"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateProjectOrder(project.id, 'down')}
                    disabled={index === projects.length - 1}
                    className="h-8 w-8 p-0"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </div>

                {/* Visibility Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleProjectVisibility(project.id)}
                  className={`h-8 w-8 p-0 ${
                    project.visible 
                      ? 'text-green-600 hover:text-green-700' 
                      : 'text-red-600 hover:text-red-700'
                  }`}
                >
                  {project.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>

                {/* Action Buttons */}
                <div className="flex space-x-1">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      // TODO: Implement edit functionality
                      console.log('Edit project:', project.id)
                    }}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => deleteProject(project.id)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No projects found. Add some projects to get started.
          </div>
        )}
      </CardContent>
    </Card>
  )
}







