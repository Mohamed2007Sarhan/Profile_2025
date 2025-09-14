"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function Tooth3DAnimation() {
  const toothRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (toothRef.current) {
        const rect = toothRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const mouseX = e.clientX - centerX
        const mouseY = e.clientY - centerY
        
        const rotateX = (mouseY / rect.height) * 15
        const rotateY = (mouseX / rect.width) * 15
        
        toothRef.current.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-lg relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-blue-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-cyan-100/20 rounded-full blur-3xl"></div>
      </div>

      {/* Main Tooth Container */}
      <motion.div
        ref={toothRef}
        className="relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          rotateZ: [0, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Tooth Crown - Realistic Shape */}
        <div className="relative w-28 h-36 sm:w-36 sm:h-44">
          {/* Main Tooth Body - Oval Shape */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-gray-100 rounded-t-full rounded-b-3xl shadow-2xl" 
               style={{ 
                 width: '100%', 
                 height: '100%',
                 clipPath: 'polygon(20% 0%, 80% 0%, 95% 20%, 95% 80%, 80% 100%, 20% 100%, 5% 80%, 5% 20%)'
               }}>
            
            {/* Tooth Surface Details */}
            <div className="absolute top-2 left-1/4 right-1/4 h-0.5 bg-gray-200 rounded-full opacity-60"></div>
            <div className="absolute top-4 left-1/3 right-1/3 h-0.5 bg-gray-300 rounded-full opacity-40"></div>
            
            {/* Tooth Ridges - Vertical */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-0.5 h-10 bg-gray-200 rounded-full opacity-50"></div>
            <div className="absolute top-8 left-1/3 w-0.5 h-6 bg-gray-200 rounded-full opacity-40"></div>
            <div className="absolute top-8 right-1/3 w-0.5 h-6 bg-gray-200 rounded-full opacity-40"></div>
            
            {/* Tooth Highlights */}
            <div className="absolute top-1 left-1/4 w-4 h-6 bg-white/70 rounded-full blur-sm"></div>
            <div className="absolute top-3 left-1/6 w-2 h-3 bg-white/50 rounded-full blur-sm"></div>
            <div className="absolute top-4 right-1/4 w-3 h-4 bg-white/60 rounded-full blur-sm"></div>
          </div>

          {/* Tooth Roots - Realistic Shape */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            {/* Left Root */}
            <div className="absolute left-1 w-3 h-14 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 rounded-full transform -rotate-20 origin-bottom shadow-lg"></div>
            {/* Right Root */}
            <div className="absolute right-1 w-3 h-14 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 rounded-full transform rotate-20 origin-bottom shadow-lg"></div>
            {/* Center Root */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-2.5 h-12 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 rounded-full shadow-lg"></div>
          </div>

          {/* Enamel Layer */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/50 to-transparent rounded-t-full rounded-b-3xl"></div>
          
          {/* Tooth Neck */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
        </div>

        {/* Floating Dental Particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-blue-200 rounded-full"
            style={{
              top: `${15 + (i * 7)}%`,
              left: `${10 + (i * 8)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.4, 1, 0.4],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Tooth Shine Effect */}
        <motion.div
          className="absolute inset-0 rounded-t-3xl rounded-b-2xl"
          animate={{
            background: [
              "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.4) 0%, transparent 60%)",
              "radial-gradient(circle at 75% 75%, rgba(255,255,255,0.4) 0%, transparent 60%)",
              "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.4) 0%, transparent 60%)"
            ]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Tooth Shadow */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-black/20 rounded-full blur-lg"></div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-black/10 rounded-full blur-md"></div>
      </motion.div>

      {/* Health Status */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <motion.div
          className="w-4 h-4 bg-green-500 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.6, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <span className="text-green-600 text-sm font-bold">HEALTHY</span>
      </div>

      {/* Dental Care Icons */}
      <div className="absolute bottom-4 left-4 flex gap-3">
        <motion.div
          className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shadow-lg"
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 8, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-blue-600 text-xl">🦷</span>
        </motion.div>
        <motion.div
          className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shadow-lg"
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, -8, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8
          }}
        >
          <span className="text-green-600 text-xl">✨</span>
        </motion.div>
        <motion.div
          className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center shadow-lg"
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.6
          }}
        >
          <span className="text-purple-600 text-xl">💎</span>
        </motion.div>
      </div>
    </div>
  )
}
