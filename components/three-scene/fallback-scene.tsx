"use client"

import { motion } from "framer-motion"

export default function FallbackScene() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-cyan-500/20">
      {/* Animated Background Elements - Blue Theme */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1],
          x: [0, 20, -20, 0],
          y: [0, -20, 20, 0]
        }}
        transition={{ 
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-full blur-2xl"
      />
      
      <motion.div
        animate={{ 
          rotate: -360,
          scale: [1, 0.8, 1],
          x: [0, -30, 30, 0],
          y: [0, 30, -30, 0]
        }}
        transition={{ 
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-2xl"
      />

      {/* Additional Floating Orbs */}
      <motion.div
        animate={{ 
          rotate: 180,
          scale: [1, 1.3, 1],
          x: [0, 40, -40, 0],
          y: [0, -40, 40, 0]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 12, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-3/4 left-1/3 w-24 h-24 bg-gradient-to-br from-blue-400/15 to-indigo-500/15 rounded-full blur-xl"
      />

      {/* Enhanced Floating Tech Cards with 3D Effect */}
      <div className="absolute inset-0 flex items-center justify-center perspective-1000">
        <div className="grid grid-cols-2 gap-6">
          {["React", "TypeScript", "Next.js", "Three.js"].map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                rotateX: 0,
                rotateY: [0, 10, -10, 0],
                z: [0, 20, 0]
              }}
              transition={{ 
                delay: index * 0.3,
                duration: 0.8,
                rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                z: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-24 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 backdrop-blur-md rounded-xl border border-blue-400/30 flex items-center justify-center text-sm font-semibold text-white/90 shadow-2xl transform-gpu"
              style={{
                boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
              }}
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Central Sphere with 3D Effect */}
      <motion.div
        animate={{ 
          rotateY: 360,
          rotateX: [0, 15, -15, 0],
          scale: [1, 1.1, 1],
          z: [0, 30, 0]
        }}
        transition={{ 
          rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
          rotateX: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          z: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-blue-500/30 via-cyan-400/20 to-indigo-600/30 rounded-full border-2 border-blue-400/40 shadow-2xl"
        style={{
          boxShadow: "0 0 50px rgba(59, 130, 246, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)"
        }}
      />

      {/* Inner Glow Effect */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-cyan-300/40 to-blue-500/40 rounded-full blur-sm"
      />

      {/* Enhanced Particle Effects */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            z: [0, Math.random() * 100 - 50],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/60 to-cyan-300/60 rounded-full blur-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)"
          }}
        />
      ))}

      {/* Floating Geometric Shapes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          animate={{
            rotate: [0, 360],
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
          className="absolute w-4 h-4 bg-gradient-to-br from-blue-400/30 to-cyan-300/30 rounded-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 45}deg)`,
            boxShadow: "0 0 15px rgba(59, 130, 246, 0.4)"
          }}
        />
      ))}

      {/* Animated Grid Pattern */}
      <motion.div
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  )
}
