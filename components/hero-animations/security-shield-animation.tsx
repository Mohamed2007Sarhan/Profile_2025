"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function SecurityShieldAnimation() {
  const [isActive, setIsActive] = useState(false)
  const [protectionLevel, setProtectionLevel] = useState(0)
  const [threatsBlocked, setThreatsBlocked] = useState(0)

  const threats = [
    "Malware detected",
    "SQL injection attempt",
    "XSS attack blocked",
    "DDoS attack mitigated",
    "Brute force attempt",
    "Phishing attempt",
    "Ransomware blocked",
    "Data breach prevented"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProtectionLevel(prev => {
        if (prev < 100) {
          return prev + 2
        } else {
          return 100
        }
      })
    }, 100)

    const threatInterval = setInterval(() => {
      setThreatsBlocked(prev => prev + 1)
    }, 2000)

    setTimeout(() => setIsActive(true), 1000)

    return () => {
      clearInterval(interval)
      clearInterval(threatInterval)
    }
  }, [])

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden relative">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-4 grid-rows-4 sm:grid-cols-8 sm:grid-rows-6 h-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="border border-blue-500/20"></div>
          ))}
        </div>
      </div>

      {/* Main Shield */}
      <div className="flex items-center justify-center h-full relative">
        <motion.div
          className="relative"
          animate={{
            scale: isActive ? [1, 1.1, 1] : 1,
            rotate: isActive ? [0, 5, -5, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Shield Outer Ring */}
          <motion.div
            className="w-48 h-48 border-4 border-blue-500 rounded-full flex items-center justify-center"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Shield Inner Ring */}
            <motion.div
              className="w-40 h-40 border-2 border-cyan-400 rounded-full flex items-center justify-center"
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
            >
            {/* Shield Body */}
            <div className="w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center relative overflow-hidden">
              {/* Shield Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/50 to-cyan-400/50 rounded-full"></div>
              
              {/* Shield Icon */}
              <motion.div
                className="text-white text-2xl sm:text-4xl font-bold z-10"
                animate={{
                  scale: isActive ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🛡️
              </motion.div>

              {/* Protection Level Indicator */}
              <motion.div
                className="absolute bottom-1 sm:bottom-2 left-1/2 transform -translate-x-1/2 text-white text-xs font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {protectionLevel}%
              </motion.div>
            </div>
            </motion.div>
          </motion.div>

          {/* Security Rays */}
          {isActive && (
            <>
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-16 bg-gradient-to-t from-blue-500 to-transparent"
                  style={{
                    top: "50%",
                    left: "50%",
                    transformOrigin: "50% 100%",
                    transform: `rotate(${i * 45}deg) translateY(-100px)`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scaleY: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </>
          )}
        </motion.div>

        {/* Floating Security Elements */}
        {isActive && (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-green-400 rounded-full"
                style={{
                  top: `${20 + (i * 15)}%`,
                  left: `${10 + (i * 20)}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.5, 1, 0.5],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Threat Blocking Display */}
      <div className="absolute top-4 left-4 right-4">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-green-500/30">
          <div className="text-green-400 text-sm font-bold mb-2">
            🛡️ Security System Active
          </div>
          <div className="text-white text-xs">
            Threats Blocked: {threatsBlocked}
          </div>
          <div className="text-gray-300 text-xs">
            Protection Level: {protectionLevel}%
          </div>
        </div>
      </div>

      {/* Threat Notifications */}
      {isActive && threatsBlocked > 0 && (
        <motion.div
          className="absolute bottom-4 right-4 max-w-xs"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-red-900/80 backdrop-blur-sm rounded-lg p-2 border border-red-500/30">
            <div className="text-red-400 text-xs font-bold">
              ⚠️ Threat Blocked
            </div>
            <div className="text-white text-xs">
              {threats[threatsBlocked % threats.length]}
            </div>
          </div>
        </motion.div>
      )}

      {/* Status Indicator */}
      <div className="absolute top-4 right-4">
        <motion.div
          className="w-4 h-4 bg-green-500 rounded-full"
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
      </div>
    </div>
  )
}
