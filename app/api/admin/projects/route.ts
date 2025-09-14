import { NextResponse } from 'next/server'
import { readAdminData, updateProjects } from '@/lib/admin-data'
import projectsData from '@/data/projects.json'

export async function GET() {
  try {
    const data = readAdminData()
    
    // If no projects in admin data, initialize with default projects
    if (data.projects.length === 0) {
      const projectsWithMetadata = projectsData.map((project, index) => ({
        ...project,
        order: index,
        visible: true
      }))
      updateProjects(projectsWithMetadata)
      return NextResponse.json(projectsWithMetadata)
    }
    
    return NextResponse.json(data.projects)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const data = updateProjects(body)
    return NextResponse.json({ success: true, projects: data.projects })
  } catch (error) {
    console.error('Error updating projects:', error)
    return NextResponse.json({ error: 'Failed to update projects' }, { status: 500 })
  }
}