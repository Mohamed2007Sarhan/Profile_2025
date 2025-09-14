"use client"

import { motion } from "framer-motion"

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-cyan-500/20">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {/* 3D Loading Animation */}
        <motion.div
          animate={{ 
            rotateY: 360,
            rotateX: [0, 15, -15, 0]
          }}
          transition={{ 
            rotateY: { duration: 2, repeat: Infinity, ease: "linear" },
            rotateX: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500/30 via-cyan-400/20 to-indigo-600/30 rounded-full border-2 border-blue-400/40 shadow-2xl"
          style={{
            boxShadow: "0 0 50px rgba(59, 130, 246, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)"
          }}
        />

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-2"
        >
          <h3 className="text-xl font-serif font-bold text-foreground">
            Dr. Mohamed Sarhan Hamed
          </h3>
          <p className="text-sm text-muted-foreground">
            Loading 3D Experience...
          </p>
        </motion.div>

        {/* Progress Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center space-x-2 mt-6"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="w-2 h-2 bg-blue-500 rounded-full"
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
