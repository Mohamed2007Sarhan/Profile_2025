"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Terminal, Trash2, Play, Square } from "lucide-react"

interface TerminalProps {
  onCommand?: (command: string) => void
}

export function AdminTerminal({ onCommand }: TerminalProps) {
  const [output, setOutput] = useState<string[]>([])
  const [currentCommand, setCurrentCommand] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [output])

  const executeCommand = async (command: string) => {
    if (!command.trim()) return

    setOutput(prev => [...prev, `$ ${command}`])
    setIsRunning(true)

    try {
      // Simulate command execution
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      let result = ""
      
      switch (command.toLowerCase().trim()) {
        case 'help':
          result = `Available commands:
- help: Show this help message
- clear: Clear terminal
- ls: List files
- pwd: Show current directory
- whoami: Show current user
- date: Show current date
- uptime: Show system uptime
- npm run dev: Start development server
- npm run build: Build project
- git status: Show git status`
          break
        case 'clear':
          setOutput([])
          setIsRunning(false)
          return
        case 'ls':
          result = `app/
components/
data/
lib/
public/
package.json
next.config.mjs
tsconfig.json`
          break
        case 'pwd':
          result = "/mohamed-portfolio"
          break
        case 'whoami':
          result = "admin"
          break
        case 'date':
          result = new Date().toString()
          break
        case 'uptime':
          result = "System uptime: 2 days, 14 hours, 32 minutes"
          break
        case 'npm run dev':
          result = "Starting development server...\n✓ Ready on http://localhost:3000"
          break
        case 'npm run build':
          result = "Building application...\n✓ Build completed successfully"
          break
        case 'git status':
          result = `On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  modified: app/admin/page.tsx
  modified: components/admin-panel.tsx

Untracked files:
  components/admin-terminal.tsx`
          break
        default:
          result = `Command not found: ${command}\nType 'help' for available commands`
      }

      setOutput(prev => [...prev, result])
    } catch (error) {
      setOutput(prev => [...prev, `Error: ${error}`])
    } finally {
      setIsRunning(false)
    }

    if (onCommand) {
      onCommand(command)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand)
      setCurrentCommand("")
    }
  }

  const clearTerminal = () => {
    setOutput([])
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-2xl flex items-center gap-2">
            <Terminal className="w-6 h-6" />
            Terminal
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={clearTerminal}
              className="border-gray-500 text-gray-300 hover:bg-gray-600"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => executeCommand(currentCommand)}
              disabled={isRunning || !currentCommand.trim()}
              className="border-gray-500 text-gray-300 hover:bg-gray-600"
            >
              {isRunning ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div 
          ref={terminalRef}
          className="bg-black rounded-lg p-4 font-mono text-sm h-96 overflow-y-auto"
        >
          <div className="text-green-400 mb-4">
            <div>Welcome to Admin Terminal</div>
            <div>Type 'help' for available commands</div>
          </div>
          
          {output.map((line, index) => (
            <div key={index} className="text-gray-300 whitespace-pre-wrap mb-1">
              {line}
            </div>
          ))}
          
          <div className="flex items-center mt-4">
            <span className="text-green-400 mr-2">$</span>
            <input
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent text-white outline-none"
              placeholder="Enter command..."
              disabled={isRunning}
            />
            {isRunning && (
              <div className="ml-2 animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


