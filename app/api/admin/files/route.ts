import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const filePath = searchParams.get('path')
    
    if (!filePath) {
      return NextResponse.json({ error: 'File path is required' }, { status: 400 })
    }
    
    const fullPath = path.join(process.cwd(), filePath)
    
    // Simplified security check - allow most files but block dangerous ones
    const blockedPaths = ['node_modules', '.git', '.next', 'dist', 'build']
    const pathParts = filePath.split('/')
    
    // Block dangerous paths
    if (pathParts.some(part => blockedPaths.includes(part))) {
      return NextResponse.json({ error: 'Access denied to system files' }, { status: 403 })
    }
    
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }
    
    const content = fs.readFileSync(fullPath, 'utf8')
    return NextResponse.json({ content })
  } catch (error) {
    console.error('Error reading file:', error)
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { path: filePath, content } = body
    
    if (!filePath || content === undefined) {
      return NextResponse.json({ error: 'File path and content are required' }, { status: 400 })
    }
    
    const fullPath = path.join(process.cwd(), filePath)
    
    // Simplified security check - allow most files but block dangerous ones
    const blockedPaths = ['node_modules', '.git', '.next', 'dist', 'build']
    const pathParts = filePath.split('/')
    
    // Block dangerous paths
    if (pathParts.some(part => blockedPaths.includes(part))) {
      return NextResponse.json({ error: 'Access denied to system files' }, { status: 403 })
    }
    
    // Create directory if it doesn't exist
    const dir = path.dirname(fullPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    fs.writeFileSync(fullPath, content, 'utf8')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving file:', error)
    return NextResponse.json({ error: 'Failed to save file' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const filePath = searchParams.get('path')
    
    if (!filePath) {
      return NextResponse.json({ error: 'File path is required' }, { status: 400 })
    }
    
    const fullPath = path.join(process.cwd(), filePath)
    
    // Simplified security check - allow most files but block dangerous ones
    const blockedPaths = ['node_modules', '.git', '.next', 'dist', 'build']
    const pathParts = filePath.split('/')
    
    // Block dangerous paths
    if (pathParts.some(part => blockedPaths.includes(part))) {
      return NextResponse.json({ error: 'Access denied to system files' }, { status: 403 })
    }
    
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }
    
    fs.unlinkSync(fullPath)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting file:', error)
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 })
  }
}