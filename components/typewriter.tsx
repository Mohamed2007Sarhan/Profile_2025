"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypewriterProps {
  texts: string[]
  speed?: number
  deleteSpeed?: number
  pauseTime?: number
  className?: string
  cursor?: boolean
  loop?: boolean
}

export function Typewriter({ 
  texts, 
  speed = 100, 
  deleteSpeed = 50, 
  pauseTime = 2000, 
  className = "",
  cursor = true,
  loop = true
}: TypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const timeout = setTimeout(() => {
      const fullText = texts[currentTextIndex]
      
      if (!isDeleting) {
        // Typing
        if (currentText.length < fullText.length) {
          setCurrentText(fullText.slice(0, currentText.length + 1))
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => {
            setIsDeleting(true)
          }, pauseTime)
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false)
          if (loop) {
            setCurrentTextIndex((prev) => (prev + 1) % texts.length)
          } else {
            setCurrentTextIndex((prev) => Math.min(prev + 1, texts.length - 1))
          }
        }
      }
    }, isDeleting ? deleteSpeed : speed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentTextIndex, texts, speed, deleteSpeed, pauseTime, loop, isPaused])

  return (
    <span className={className}>
      {currentText}
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-primary"
        >
          |
        </motion.span>
      )}
    </span>
  )
}

// Multi-line typewriter for more complex animations
interface MultiLineTypewriterProps {
  lines: string[][]
  speed?: number
  deleteSpeed?: number
  pauseTime?: number
  lineDelay?: number
  className?: string
  cursor?: boolean
  loop?: boolean
}

export function MultiLineTypewriter({
  lines,
  speed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
  lineDelay = 500,
  className = "",
  cursor = true,
  loop = true
}: MultiLineTypewriterProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [completedLines, setCompletedLines] = useState<string[]>([])

  useEffect(() => {
    if (isPaused) return

    const timeout = setTimeout(() => {
      const currentLine = lines[currentLineIndex]
      const fullText = currentLine[currentTextIndex]
      
      if (!isDeleting) {
        // Typing
        if (currentText.length < fullText.length) {
          setCurrentText(fullText.slice(0, currentText.length + 1))
        } else {
          // Finished typing current text, move to next or pause
          if (currentTextIndex < currentLine.length - 1) {
            setTimeout(() => {
              setCurrentTextIndex(prev => prev + 1)
              setCurrentText("")
            }, lineDelay)
          } else {
            // Finished typing line, pause then start deleting
            setTimeout(() => {
              setIsDeleting(true)
            }, pauseTime)
          }
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          // Finished deleting current text, move to previous or finish line
          if (currentTextIndex > 0) {
            setCurrentTextIndex(prev => prev - 1)
            setCurrentText(lines[currentLineIndex][currentTextIndex - 1])
          } else {
            // Finished deleting line, move to next line
            setIsDeleting(false)
            setCompletedLines(prev => [...prev, lines[currentLineIndex].join(" ")])
            setCurrentText("")
            setCurrentTextIndex(0)
            
            if (loop) {
              setCurrentLineIndex(prev => (prev + 1) % lines.length)
            } else {
              setCurrentLineIndex(prev => Math.min(prev + 1, lines.length - 1))
            }
          }
        }
      }
    }, isDeleting ? deleteSpeed : speed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentTextIndex, currentLineIndex, lines, speed, deleteSpeed, pauseTime, lineDelay, loop, isPaused])

  return (
    <div className={className}>
      {completedLines.map((line, index) => (
        <div key={index} className="text-muted-foreground/70">
          {line}
        </div>
      ))}
      <div>
        {currentText}
        {cursor && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-primary"
          >
            |
          </motion.span>
        )}
      </div>
    </div>
  )
}
