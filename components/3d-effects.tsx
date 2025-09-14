"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function Floating3DShapes() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* 3D Floating Cubes */}
      <motion.div
        className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg"
        animate={{
          rotateX: [0, 360, 0],
          rotateY: [0, 180, 360],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      />
      
      <motion.div
        className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-full"
        animate={{
          rotateZ: [0, 360],
          y: [0, 20, 0],
          x: [0, 15, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      <motion.div
        className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-lg"
        animate={{
          rotateX: [0, 180, 360],
          rotateY: [0, 90, 180, 270, 360],
          y: [0, -25, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-14 h-14 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg"
        animate={{
          rotateZ: [0, -360],
          y: [0, 30, 0],
          x: [0, -20, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* 3D Hexagons */}
      <motion.div
        className="absolute top-60 left-1/4 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-blue-500/20"
        animate={{
          rotateY: [0, 360],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      />
      
      <motion.div
        className="absolute bottom-60 right-1/4 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[21px] border-l-transparent border-r-transparent border-b-green-500/20"
        animate={{
          rotateY: [0, -360],
          y: [0, 25, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      />
    </div>
  )
}

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
    const charArray = chars.split("")
    const fontSize = 14
    const columns = Math.floor(window.innerWidth / fontSize)
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#0f0"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    resizeCanvas()
    const interval = setInterval(draw, 50)

    window.addEventListener("resize", resizeCanvas)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-20"
    />
  )
}

export function HolographicCard() {
  return (
    <motion.div
      className="relative w-64 h-40 mx-auto"
      animate={{
        rotateY: [0, 360],
        rotateX: [0, 15, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-lg backdrop-blur-sm border border-white/20 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent rounded-lg" />
        <div className="absolute inset-4 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-white/90 mb-2">AI</div>
            <div className="text-sm text-white/70">Powered</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      opacity: number
    }> = []

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
      opacity: Math.random() * 0.5 + 0.2,
    })

    for (let i = 0; i < 100; i++) {
      particles.push(createParticle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Draw connections
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.save()
            ctx.globalAlpha = (100 - distance) / 100 * 0.1
            ctx.strokeStyle = particle.color
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
            ctx.restore()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}





