import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

function scanDirectory(dirPath: string, basePath: string = ''): any[] {
  const items: any[] = []
  
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true })
    
    // Sort entries: directories first, then files
    entries.sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1
      if (!a.isDirectory() && b.isDirectory()) return 1
      return a.name.localeCompare(b.name)
    })
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name)
      const relativePath = basePath ? path.join(basePath, entry.name) : entry.name
      
      if (entry.isDirectory()) {
        // Skip certain directories
        if (['node_modules', '.next', '.git', 'dist', 'build'].includes(entry.name)) {
          continue
        }
        
        items.push({
          name: relativePath,
          type: 'folder',
          children: scanDirectory(fullPath, relativePath)
        })
      } else {
        // Only include certain file types
        const ext = path.extname(entry.name)
        if (['.tsx', '.ts', '.js', '.jsx', '.json', '.css', '.md', '.mjs'].includes(ext)) {
          items.push({
            name: relativePath,
            type: 'file'
          })
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error)
  }
  
  return items
}

export async function GET() {
  try {
    const projectRoot = process.cwd()
    const allowedDirs = ['app', 'components', 'data', 'lib', 'public', 'styles', 'hooks', 'scripts']
    
    const allFiles: any[] = []
    
    for (const dir of allowedDirs) {
      const dirPath = path.join(projectRoot, dir)
      if (fs.existsSync(dirPath)) {
        const dirFiles = scanDirectory(dirPath, dir)
        allFiles.push(...dirFiles)
      }
    }
    
    // Add root files
    const rootFiles = ['package.json', 'next.config.mjs', 'tsconfig.json', 'middleware.ts', 'components.json', 'postcss.config.mjs', 'next-env.d.ts', 'README.md', 'pnpm-lock.yaml', 'package-lock.json']
    for (const file of rootFiles) {
      const filePath = path.join(projectRoot, file)
      if (fs.existsSync(filePath)) {
        allFiles.push({
          name: file,
          type: 'file'
        })
      }
    }
    
    return NextResponse.json({ files: allFiles })
  } catch (error) {
    console.error('Error loading file structure:', error)
    return NextResponse.json({ error: 'Failed to load file structure' }, { status: 500 })
  }
}
