"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, Maximize, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"

interface VideoBackgroundProps {
  isApproved: boolean
  onApprovalChange: (approved: boolean) => void
}

export function VideoBackground({ isApproved, onApprovalChange }: VideoBackgroundProps) {
  const { language } = useLanguage()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(false)

  // Simulate video approval process
  const handleApprove = () => {
    onApprovalChange(true)
    setIsPlaying(true)
  }

  const handleReject = () => {
    onApprovalChange(false)
    setIsPlaying(false)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Auto-hide controls
  useEffect(() => {
    if (showControls) {
      const timer = setTimeout(() => {
        setShowControls(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showControls])

  if (!isApproved) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0"
      >
        {/* Approval Request Overlay */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <div className="bg-slate-800/90 backdrop-blur-md rounded-2xl p-8 max-w-md mx-4 border border-slate-600">
            <div className="text-center space-y-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto"
              >
                <Play className="w-8 h-8 text-primary" />
              </motion.div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {language === "en" ? "Video Background" : "خلفية فيديو"}
                </h3>
                <p className="text-slate-300">
                  {language === "en" 
                    ? "Would you like to enable the video background for a more immersive experience?"
                    : "هل تريد تفعيل خلفية الفيديو لتجربة أكثر غمراً؟"
                  }
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleApprove}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {language === "en" ? "Approve" : "موافق"}
                </Button>
                <Button
                  onClick={handleReject}
                  variant="outline"
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  {language === "en" ? "Skip" : "تخطي"}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed inset-0 z-0 ${isFullscreen ? 'z-50' : ''}`}
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Background */}
      <div className="relative w-full h-full">
        {/* Simulated Video Content */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"
          animate={{
            background: [
              "linear-gradient(45deg, #1e3a8a, #7c3aed, #4338ca)",
              "linear-gradient(45deg, #7c3aed, #4338ca, #1e3a8a)",
              "linear-gradient(45deg, #4338ca, #1e3a8a, #7c3aed)",
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Animated Particles */}
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Code Rain Effect */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`code-${i}`}
              className="absolute text-green-400/30 font-mono text-xs"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, 100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear",
              }}
            >
              {['const', 'function', 'class', 'import', 'export', 'async', 'await'][Math.floor(Math.random() * 7)]}
            </motion.div>
          ))}
        </motion.div>

        {/* Video Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Video Controls */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/50 backdrop-blur-md rounded-lg p-3"
            >
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={togglePlay}
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>

                <div className="text-xs text-white/70 font-mono">
                  {language === "en" ? "Background Video" : "فيديو الخلفية"}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={toggleFullscreen}
                  className="text-white hover:bg-white/20"
                >
                  <Maximize className="w-4 h-4" />
                </Button>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleReject}
                  className="text-white hover:bg-white/20"
                >
                  {language === "en" ? "Disable" : "إلغاء"}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status Indicator */}
        <motion.div
          className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-full px-3 py-1"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-2 h-2 bg-green-400 rounded-full" />
          <span className="text-xs text-white font-mono">
            {language === "en" ? "Live" : "مباشر"}
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}







