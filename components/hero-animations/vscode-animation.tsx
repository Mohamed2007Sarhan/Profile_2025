"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function VSCodeAnimation() {
  const [currentLine, setCurrentLine] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [showTerminal, setShowTerminal] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState("")

  const codeLines = [
    "function createPortfolio() {",
    "  const skills = ['React', 'TypeScript', 'Node.js'];",
    "  const projects = [];",
    "  ",
    "  skills.forEach(skill => {",
    "    projects.push({",
    "      name: `Project with ${skill}`,",
    "      tech: skill,",
    "      status: 'completed'",
    "    });",
    "  });",
    "  ",
    "  return projects;",
    "}",
    "",
    "const portfolio = createPortfolio();",
    "console.log('Portfolio created successfully!');"
  ]

  const terminalCommands = [
    "npm run build",
    "✓ Compiled successfully",
    "✓ Built in 2.3s",
    "✓ Ready for deployment"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTyping) {
        setCurrentLine(prev => {
          if (prev < codeLines.length - 1) {
            return prev + 1
          } else {
            setIsTyping(false)
            setTimeout(() => setShowTerminal(true), 1000)
            return prev
          }
        })
      }
    }, 300)

    return () => clearInterval(interval)
  }, [isTyping])

  useEffect(() => {
    if (showTerminal) {
      let commandIndex = 0
      const terminalInterval = setInterval(() => {
        setTerminalOutput(prev => {
          if (commandIndex < terminalCommands.length) {
            const newOutput = prev + terminalCommands[commandIndex] + "\n"
            commandIndex++
            return newOutput
          } else {
            clearInterval(terminalInterval)
            return prev
          }
        })
      }, 800)

      return () => clearInterval(terminalInterval)
    }
  }, [showTerminal])

  return (
    <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden">
      {/* VSCode Header */}
      <div className="bg-gray-800 px-2 sm:px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1 sm:gap-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-gray-300 text-xs sm:text-sm ml-2 sm:ml-4">portfolio.tsx</div>
      </div>

      {/* Code Editor */}
      <div className="p-2 sm:p-4 font-mono text-xs sm:text-sm">
        <div className="flex">
          <div className="text-gray-500 mr-2 sm:mr-4 select-none">
            {codeLines.map((_, index) => (
              <div key={index} className="h-4 sm:h-5">
                {index + 1}
              </div>
            ))}
          </div>
          <div className="flex-1">
            {codeLines.map((line, index) => (
              <motion.div
                key={index}
                className="h-4 sm:h-5 flex items-center"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: index <= currentLine ? 1 : 0.3,
                  x: index <= currentLine ? 0 : -20
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-gray-300 text-xs sm:text-sm">{line}</span>
                {index === currentLine && isTyping && (
                  <motion.span
                    className="w-1 sm:w-2 h-3 sm:h-4 bg-blue-400 ml-1"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Terminal */}
      {showTerminal && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-black border-t border-gray-700 p-2 sm:p-4"
        >
          <div className="text-green-400 font-mono text-xs sm:text-sm">
            <div className="flex items-center mb-2">
              <span className="text-blue-400">$</span>
              <span className="ml-2">Terminal</span>
            </div>
            <pre className="whitespace-pre-wrap text-xs sm:text-sm">{terminalOutput}</pre>
            {terminalOutput && (
              <motion.span
                className="w-1 sm:w-2 h-3 sm:h-4 bg-green-400 inline-block ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}
