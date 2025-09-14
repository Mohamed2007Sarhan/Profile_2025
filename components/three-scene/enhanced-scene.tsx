"use client"

import { motion } from "framer-motion"

export default function EnhancedScene() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-blue-900/30 via-blue-800/20 to-cyan-500/30">
      {/* Animated Background Elements - Enhanced Blue Theme */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.3, 1],
          x: [0, 30, -30, 0],
          y: [0, -30, 30, 0]
        }}
        transition={{ 
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-blue-500/25 to-cyan-400/25 rounded-full blur-3xl blue-glow"
      />
      
      <motion.div
        animate={{ 
          rotate: -360,
          scale: [1, 0.7, 1],
          x: [0, -40, 40, 0],
          y: [0, 40, -40, 0]
        }}
        transition={{ 
          rotate: { duration: 35, repeat: Infinity, ease: "linear" },
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 12, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute bottom-1/4 right-1/4 w-36 h-36 bg-gradient-to-br from-cyan-400/25 to-blue-600/25 rounded-full blur-3xl blue-glow"
      />

      {/* Additional Floating Orbs with Enhanced Effects */}
      <motion.div
        animate={{ 
          rotate: 180,
          scale: [1, 1.4, 1],
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0]
        }}
        transition={{ 
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 15, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 15, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-3/4 left-1/3 w-28 h-28 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-2xl blue-glow"
      />

      {/* Enhanced Floating Tech Cards with Advanced 3D Effect */}
      <div className="absolute inset-0 flex items-center justify-center perspective-1000">
        <div className="grid grid-cols-2 gap-8">
          {["React", "TypeScript", "Next.js", "Three.js"].map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, y: 60, rotateX: -90, scale: 0.5 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                rotateX: 0,
                scale: 1,
                rotateY: [0, 15, -15, 0],
                z: [0, 30, 0]
              }}
              transition={{ 
                delay: index * 0.4,
                duration: 1,
                rotateY: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                z: { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-28 h-20 bg-gradient-to-br from-blue-500/25 to-cyan-400/25 backdrop-blur-lg rounded-2xl border-2 border-blue-400/40 flex items-center justify-center text-sm font-bold text-white/95 shadow-2xl transform-gpu blue-glow-strong"
              style={{
                boxShadow: "0 12px 40px rgba(59, 130, 246, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)"
              }}
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Central Sphere with Advanced 3D Effect */}
      <motion.div
        animate={{ 
          rotateY: 360,
          rotateX: [0, 20, -20, 0],
          scale: [1, 1.15, 1],
          z: [0, 40, 0]
        }}
        transition={{ 
          rotateY: { duration: 25, repeat: Infinity, ease: "linear" },
          rotateX: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          z: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-blue-500/35 via-cyan-400/25 to-indigo-600/35 rounded-full border-2 border-blue-400/50 shadow-2xl blue-glow-strong"
        style={{
          boxShadow: "0 0 60px rgba(59, 130, 246, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.2), 0 0 0 2px rgba(255, 255, 255, 0.1)"
        }}
      />

      {/* Multiple Inner Glow Effects */}
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-cyan-300/50 to-blue-500/50 rounded-full blur-sm"
      />

      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-white/60 to-cyan-200/60 rounded-full blur-sm"
      />

      {/* Enhanced Particle Effects */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, Math.random() * 300 - 150],
            y: [0, Math.random() * 300 - 150],
            z: [0, Math.random() * 150 - 75],
            opacity: [0, 1, 0],
            scale: [0.3, 1.2, 0.3]
          }}
          transition={{
            duration: Math.random() * 5 + 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut"
          }}
          className="absolute w-3 h-3 bg-gradient-to-r from-blue-400/70 to-cyan-300/70 rounded-full blur-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: "0 0 15px rgba(59, 130, 246, 0.6)"
          }}
        />
      ))}

      {/* Enhanced Floating Geometric Shapes */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          animate={{
            rotate: [0, 360],
            x: [0, Math.random() * 150 - 75],
            y: [0, Math.random() * 150 - 75],
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: Math.random() * 12 + 18,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: "linear"
          }}
          className="absolute w-6 h-6 bg-gradient-to-br from-blue-400/40 to-cyan-300/40 rounded-lg"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 45}deg)`,
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
          }}
        />
      ))}

      {/* Enhanced Animated Grid Pattern */}
      <motion.div
        animate={{
          opacity: [0.1, 0.4, 0.1],
          scale: [1, 1.1, 1],
          rotate: [0, 1, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/8 to-transparent"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Floating Connection Lines */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`line-${i}`}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
          className="absolute h-0.5 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
            width: `${Math.random() * 200 + 100}px`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        />
      ))}

      {/* Pulsing Rings */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 0, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1.3,
            ease: "easeOut"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-blue-400/30 rounded-full"
          style={{
            width: `${60 + i * 40}px`,
            height: `${60 + i * 40}px`
          }}
        />
      ))}
    </div>
  )
}
