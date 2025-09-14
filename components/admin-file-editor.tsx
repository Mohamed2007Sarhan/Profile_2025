"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { 
  Code, 
  Save, 
  FolderOpen, 
  Upload, 
  Download, 
  Trash2, 
  FileText,
  Folder,
  Search,
  Plus,
  ArrowUp,
  ArrowDown,
  RefreshCw
} from "lucide-react"

interface FileEditorProps {
  onFileChange?: (filePath: string, content: string) => void
}

export function AdminFileEditor({ onFileChange }: FileEditorProps) {
  const [selectedFile, setSelectedFile] = useState("")
  const [fileContent, setFileContent] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState("")

  const [fileStructure, setFileStructure] = useState<any[]>([])
  const [loadingFiles, setLoadingFiles] = useState(false)
  const [newFileName, setNewFileName] = useState("")
  const [showNewFile, setShowNewFile] = useState(false)

  // Load actual file structure
  useEffect(() => {
    loadFileStructure()
  }, [])

  const loadFileStructure = async () => {
    setLoadingFiles(true)
    try {
      const response = await fetch('/api/admin/files/structure')
      const data = await response.json()
      
      if (data.error) {
        setMessage(`Error loading file structure: ${data.error}`)
        // Fallback to static structure
        setFileStructure([
          { name: "app/page.tsx", type: "file" },
          { name: "app/layout.tsx", type: "file" },
          { name: "app/globals.css", type: "file" },
          { name: "app/admin/page.tsx", type: "file" },
          { name: "app/admin/login/page.tsx", type: "file" },
          { name: "components/hero.tsx", type: "file" },
          { name: "components/projects.tsx", type: "file" },
          { name: "components/services.tsx", type: "file" },
          { name: "components/feedback.tsx", type: "file" },
          { name: "components/admin-panel.tsx", type: "file" },
          { name: "components/admin-terminal.tsx", type: "file" },
          { name: "components/admin-file-editor.tsx", type: "file" },
          { name: "components/admin-stats.tsx", type: "file" },
          { name: "components/admin-users.tsx", type: "file" },
          { name: "data/projects.json", type: "file" },
          { name: "data/services.json", type: "file" },
          { name: "data/testimonials.json", type: "file" },
          { name: "data/admin-data.json", type: "file" },
          { name: "lib/utils.ts", type: "file" },
          { name: "lib/admin-data.ts", type: "file" },
          { name: "lib/i18n.ts", type: "file" },
          { name: "styles/globals.css", type: "file" },
          { name: "package.json", type: "file" },
          { name: "next.config.mjs", type: "file" },
          { name: "tsconfig.json", type: "file" }
        ])
      } else {
        setFileStructure(data.files || [])
      }
    } catch (error) {
      setMessage(`Error loading file structure: ${error}`)
      // Fallback to static structure
      setFileStructure([
        { name: "app/page.tsx", type: "file" },
        { name: "app/layout.tsx", type: "file" },
        { name: "app/globals.css", type: "file" },
        { name: "app/admin/page.tsx", type: "file" },
        { name: "app/admin/login/page.tsx", type: "file" },
        { name: "components/hero.tsx", type: "file" },
        { name: "components/projects.tsx", type: "file" },
        { name: "components/services.tsx", type: "file" },
        { name: "components/feedback.tsx", type: "file" },
        { name: "components/admin-panel.tsx", type: "file" },
        { name: "components/admin-terminal.tsx", type: "file" },
        { name: "components/admin-file-editor.tsx", type: "file" },
        { name: "components/admin-stats.tsx", type: "file" },
        { name: "components/admin-users.tsx", type: "file" },
        { name: "data/projects.json", type: "file" },
        { name: "data/services.json", type: "file" },
        { name: "data/testimonials.json", type: "file" },
        { name: "data/admin-data.json", type: "file" },
        { name: "lib/utils.ts", type: "file" },
        { name: "lib/admin-data.ts", type: "file" },
        { name: "lib/i18n.ts", type: "file" },
        { name: "styles/globals.css", type: "file" },
        { name: "package.json", type: "file" },
        { name: "next.config.mjs", type: "file" },
        { name: "tsconfig.json", type: "file" }
      ])
    } finally {
      setLoadingFiles(false)
    }
  }

  const loadFile = async (filePath: string) => {
    setIsLoading(true)
    setMessage("")
    
    try {
      console.log('Loading file:', filePath)
      const response = await fetch(`/api/admin/files?path=${encodeURIComponent(filePath)}`)
      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)
      
      if (data.error) {
        setMessage(`Error: ${data.error}`)
        return
      }
      
      setFileContent(data.content)
      setSelectedFile(filePath)
      
      if (onFileChange) {
        onFileChange(filePath, data.content)
      }
    } catch (error) {
      console.error('Error loading file:', error)
      setMessage(`Error loading file: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const saveFile = async () => {
    if (!selectedFile) return
    
    setIsSaving(true)
    setMessage("")
    
    try {
      const response = await fetch('/api/admin/files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: selectedFile, content: fileContent })
      })
      
      const data = await response.json()
      
      if (data.error) {
        setMessage(`Error: ${data.error}`)
      } else {
        setMessage("File saved successfully!")
        setTimeout(() => setMessage(""), 3000)
      }
    } catch (error) {
      setMessage(`Error saving file: ${error}`)
    } finally {
      setIsSaving(false)
    }
  }

  const deleteFile = async (filePath: string) => {
    if (!confirm(`Are you sure you want to delete ${filePath}?`)) return
    
    try {
      const response = await fetch(`/api/admin/files?path=${encodeURIComponent(filePath)}`, {
        method: 'DELETE'
      })
      
      const data = await response.json()
      
      if (data.error) {
        setMessage(`Error: ${data.error}`)
      } else {
        setMessage("File deleted successfully!")
        if (selectedFile === filePath) {
          setSelectedFile("")
          setFileContent("")
        }
        // Reload file structure
        loadFileStructure()
        setTimeout(() => setMessage(""), 3000)
      }
    } catch (error) {
      setMessage(`Error deleting file: ${error}`)
    }
  }

  const createNewFile = async () => {
    if (!newFileName.trim()) {
      setMessage("Please enter a file name")
      return
    }
    
    try {
      const response = await fetch('/api/admin/files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: newFileName, content: '// New file created\n' })
      })
      
      const data = await response.json()
      
      if (data.error) {
        setMessage(`Error: ${data.error}`)
      } else {
        setMessage("File created successfully!")
        setNewFileName("")
        setShowNewFile(false)
        // Reload file structure
        loadFileStructure()
        setTimeout(() => setMessage(""), 3000)
      }
    } catch (error) {
      setMessage(`Error creating file: ${error}`)
    }
  }

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = async (e) => {
      const content = e.target?.result as string
      const fileName = file.name
      
      try {
        const response = await fetch('/api/admin/files', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: fileName, content })
        })
        
        const data = await response.json()
        
        if (data.error) {
          setMessage(`Error: ${data.error}`)
        } else {
          setMessage("File uploaded successfully!")
          // Reload file structure
          loadFileStructure()
          setTimeout(() => setMessage(""), 3000)
        }
      } catch (error) {
        setMessage(`Error uploading file: ${error}`)
      }
    }
    reader.readAsText(file)
  }

  const renderFileTree = (items: any[], level: number = 0) => {
    return items
      .filter(item => 
        !searchTerm || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.children && item.children.some((child: any) => 
          child.name.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      )
      .map((item, index) => (
        <div key={index} className="mb-1">
          <div
            className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-700 ${
              selectedFile === item.name ? 'bg-blue-600' : ''
            }`}
            style={{ paddingLeft: `${level * 16 + 8}px` }}
            onClick={() => {
              if (item.type === 'file') {
                loadFile(item.name)
              }
            }}
          >
            {item.type === 'folder' ? (
              <Folder className="w-4 h-4 text-blue-400" />
            ) : (
              <FileText className="w-4 h-4 text-gray-400" />
            )}
            <span className="text-sm text-gray-300">{item.name}</span>
            {item.type === 'file' && (
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation()
                  deleteFile(item.name)
                }}
                className="ml-auto h-6 w-6 p-0 text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            )}
          </div>
          {item.children && item.children.length > 0 && (
            <div>
              {renderFileTree(item.children, level + 1)}
            </div>
          )}
        </div>
      ))
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-2xl flex items-center gap-2">
          <Code className="w-6 h-6" />
          File Editor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* File Browser */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
              />
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4 max-h-96 overflow-y-auto">
              <div className="text-sm text-gray-400 mb-2 flex items-center justify-between">
                <span>File Explorer</span>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowNewFile(!showNewFile)}
                    className="text-green-400 hover:text-green-300"
                    title="Create New File"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={loadFileStructure}
                    disabled={loadingFiles}
                    className="text-blue-400 hover:text-blue-300"
                    title="Refresh Files"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* New File Input */}
              {showNewFile && (
                <div className="mb-3 p-2 bg-gray-800 rounded border border-gray-600">
                  <Input
                    placeholder="Enter file name (e.g., components/new-file.tsx)"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 mb-2"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={createNewFile}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Create
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowNewFile(false)}
                      className="border-gray-500 text-gray-300 hover:bg-gray-600"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Upload File */}
              <div className="mb-3">
                <input
                  type="file"
                  id="file-upload"
                  onChange={uploadFile}
                  className="hidden"
                  accept=".tsx,.ts,.js,.jsx,.json,.css,.md,.txt"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="w-full border-gray-500 text-gray-300 hover:bg-gray-600"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload File
                </Button>
              </div>
              {loadingFiles ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="text-sm text-gray-400 mt-2">Loading files...</p>
                </div>
              ) : (
                renderFileTree(fileStructure)
              )}
            </div>
          </div>

          {/* File Editor */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="text-white font-medium">
                  {selectedFile || 'Select a file to edit'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {selectedFile && (
                  <>
                    <Button
                      onClick={saveFile}
                      disabled={isSaving}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? 'Saving...' : 'Save'}
                    </Button>
                    <Button
                      onClick={() => deleteFile(selectedFile)}
                      size="sm"
                      variant="outline"
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>

            {message && (
              <div className={`p-3 rounded text-sm ${
                message.includes('Error') 
                  ? 'bg-red-900/20 text-red-400 border border-red-500/30'
                  : 'bg-green-900/20 text-green-400 border border-green-500/30'
              }`}>
                {message}
              </div>
            )}

            <Textarea
              value={fileContent}
              onChange={(e) => setFileContent(e.target.value)}
              className="min-h-[400px] bg-gray-900 border-gray-600 text-white font-mono text-sm"
              placeholder={isLoading ? "Loading file..." : "File content will appear here..."}
              disabled={isLoading}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
