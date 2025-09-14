"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function RealisticGearAnimation() {
  const gearRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (gearRef.current) {
        const rect = gearRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const mouseX = e.clientX - centerX
        const mouseY = e.clientY - centerY
        
        const rotateX = (mouseY / rect.height) * 15
        const rotateY = (mouseX / rect.width) * 15
        
        gearRef.current.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-lg relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Gear */}
      <motion.div
        ref={gearRef}
        className="relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          rotateZ: [0, 360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Gear Body */}
        <div className="w-40 h-40 relative">
          {/* Outer Ring */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full shadow-2xl">
            <div className="absolute inset-2 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full"></div>
          </div>
          
          {/* Gear Teeth */}
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-12 bg-gradient-to-b from-gray-600 to-gray-800 rounded-sm"
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: "50% 0%",
                transform: `rotate(${i * 22.5}deg) translateY(-60px)`,
              }}
              animate={{
                scaleY: [1, 1.1, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Center Hub */}
          <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-inner">
            <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-gray-900 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          
          {/* Inner Details */}
          <div className="absolute top-1/2 left-1/2 w-20 h-20 border-2 border-gray-400/30 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 border border-gray-400/20 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          
          {/* Spokes */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-8 bg-gray-400/40"
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: "50% 0%",
                transform: `rotate(${i * 60}deg) translateY(-20px)`,
              }}
            />
          ))}
        </div>

        {/* Smaller Gears */}
        <motion.div
          className="absolute -top-12 -right-12 w-20 h-20"
          animate={{
            rotateZ: [0, -360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-cyan-600 to-blue-700 rounded-full shadow-xl">
            <div className="absolute inset-1 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full"></div>
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-6 bg-gradient-to-b from-cyan-600 to-blue-700 rounded-sm"
                style={{
                  top: "50%",
                  left: "50%",
                  transformOrigin: "50% 0%",
                  transform: `rotate(${i * 30}deg) translateY(-35px)`,
                }}
              />
            ))}
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-gray-900 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </motion.div>

        <motion.div
          className="absolute -bottom-12 -left-12 w-16 h-16"
          animate={{
            rotateZ: [0, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-green-600 to-emerald-700 rounded-full shadow-xl">
            <div className="absolute inset-1 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full"></div>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-5 bg-gradient-to-b from-green-600 to-emerald-700 rounded-sm"
                style={{
                  top: "50%",
                  left: "50%",
                  transformOrigin: "50% 0%",
                  transform: `rotate(${i * 45}deg) translateY(-28px)`,
                }}
              />
            ))}
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-gray-900 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </motion.div>

        {/* Tiny Gears */}
        <motion.div
          className="absolute top-8 -right-8 w-8 h-8"
          animate={{
            rotateZ: [0, -360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-yellow-600 to-orange-600 rounded-full shadow-lg">
            <div className="absolute inset-1 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full"></div>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-3 bg-gradient-to-b from-yellow-600 to-orange-600 rounded-sm"
                style={{
                  top: "50%",
                  left: "50%",
                  transformOrigin: "50% 0%",
                  transform: `rotate(${i * 60}deg) translateY(-14px)`,
                }}
              />
            ))}
            <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-gray-900 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </motion.div>

        {/* Floating Particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              top: `${20 + (i * 8)}%`,
              left: `${15 + (i * 7)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.4, 1, 0.4],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Gear Shine Effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            background: [
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Status Indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <motion.div
          className="w-3 h-3 bg-green-500 rounded-full"
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
        <span className="text-green-400 text-sm font-mono">ACTIVE</span>
      </div>
    </div>
  )
}



