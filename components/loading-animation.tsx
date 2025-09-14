"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function LoadingAnimation() {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [currentText, setCurrentText] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const loadingTexts = [
    "Initializing portfolio...",
    "Loading animations...",
    "Setting up 3D effects...",
    "Preparing security systems...",
    "Optimizing performance...",
    "Finalizing experience..."
  ]

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev < 100) {
          return prev + Math.random() * 8 + 2
        } else {
          clearInterval(progressInterval)
          setTimeout(() => setIsComplete(true), 1000)
          return 100
        }
      })
    }, 150)

    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length)
    }, 1000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
    }
  }, [loadingTexts.length])

  if (isComplete) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-12 grid-rows-8 h-full">
            {Array.from({ length: 96 }).map((_, i) => (
              <motion.div
                key={i}
                className="border border-blue-500/10"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.02,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>

        {/* Main Loading Container */}
        <div className="relative z-10 text-center">
          {/* 3D Loading Spinner */}
          <motion.div
            className="relative w-32 h-32 mx-auto mb-8"
            animate={{
              rotateY: 360,
              rotateX: 15,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Outer Ring */}
            <motion.div
              className="absolute inset-0 border-4 border-blue-500 rounded-full"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-400 rounded-full"></div>
            </motion.div>

            {/* Middle Ring */}
            <motion.div
              className="absolute inset-4 border-4 border-cyan-400 rounded-full"
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-cyan-300 rounded-full"></div>
            </motion.div>

            {/* Inner Ring */}
            <motion.div
              className="absolute inset-8 border-4 border-purple-400 rounded-full"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-purple-300 rounded-full"></div>
            </motion.div>

            {/* Center Dot */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Loading Text */}
          <motion.div
            key={currentText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-white text-xl font-medium mb-4"
          >
            {loadingTexts[currentText]}
          </motion.div>

          {/* Progress Bar */}
          <div className="w-80 h-2 bg-gray-700 rounded-full mx-auto mb-4 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Progress Percentage */}
          <motion.div
            className="text-white text-lg font-bold"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {Math.round(loadingProgress)}%
          </motion.div>

          {/* Floating Code Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-blue-400/30 font-mono text-sm"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 360, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              >
                {['</>', '{ }', '()', '[]', '=>', '++', '--', '&&', '||', '==='][i % 10]}
              </motion.div>
            ))}
          </div>

          {/* Security Elements */}
          <div className="absolute top-4 right-4 flex gap-2">
            <motion.div
              className="w-3 h-3 bg-green-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span className="text-green-400 text-sm">Secure</span>
          </div>

          {/* Performance Indicator */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <motion.div
              className="w-2 h-2 bg-yellow-400 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span className="text-yellow-400 text-sm">Optimizing</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
