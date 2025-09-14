"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function Gear3DAnimation() {
  const gearRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (gearRef.current) {
        const rect = gearRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const mouseX = e.clientX - centerX
        const mouseY = e.clientY - centerY
        
        const rotateX = (mouseY / rect.height) * 20
        const rotateY = (mouseX / rect.width) * 20
        
        gearRef.current.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg">
      <motion.div
        ref={gearRef}
        className="relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          rotateZ: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Main Gear */}
        <motion.div
          className="w-20 h-20 sm:w-32 sm:h-32 relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Gear Body */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-2xl">
            <div className="absolute inset-2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"></div>
          </div>
          
          {/* Gear Teeth */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-4 sm:w-4 sm:h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-sm"
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: "50% 0%",
                transform: `rotate(${i * 30}deg) translateY(-50px)`,
              }}
              animate={{
                scaleY: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Center Hole */}
          <div className="absolute top-1/2 left-1/2 w-4 h-4 sm:w-8 sm:h-8 bg-gray-900 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          
          {/* Inner Details */}
          <div className="absolute top-1/2 left-1/2 w-10 h-10 sm:w-16 sm:h-16 border-2 border-white/20 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-8 h-8 sm:w-12 sm:h-12 border border-white/10 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </motion.div>

        {/* Smaller Gears */}
        <motion.div
          className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 w-8 h-8 sm:w-16 sm:h-16"
          animate={{
            rotateZ: [0, -360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full shadow-xl">
            <div className="absolute inset-1 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full"></div>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-3 sm:w-2 sm:h-6 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-sm"
                style={{
                  top: "50%",
                  left: "50%",
                  transformOrigin: "50% 0%",
                  transform: `rotate(${i * 45}deg) translateY(-15px)`,
                }}
              />
            ))}
            <div className="absolute top-1/2 left-1/2 w-2 h-2 sm:w-4 sm:h-4 bg-gray-900 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </motion.div>

        <motion.div
          className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 w-6 h-6 sm:w-12 sm:h-12"
          animate={{
            rotateZ: [0, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-xl">
            <div className="absolute inset-1 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full"></div>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-2 sm:w-1.5 sm:h-4 bg-gradient-to-b from-green-500 to-emerald-600 rounded-sm"
                style={{
                  top: "50%",
                  left: "50%",
                  transformOrigin: "50% 0%",
                  transform: `rotate(${i * 60}deg) translateY(-11px)`,
                }}
              />
            ))}
            <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 sm:w-3 sm:h-3 bg-gray-900 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </motion.div>

        {/* Floating Particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              top: `${20 + (i * 10)}%`,
              left: `${15 + (i * 12)}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}
