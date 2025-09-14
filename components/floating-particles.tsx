"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

export function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticle = (id: number): Particle => ({
      id,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`
    })

    const initParticles = () => {
      particlesRef.current = Array.from({ length: 50 }, (_, i) => createParticle(i))
    }

    const updateParticles = () => {
      particlesRef.current.forEach(particle => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Add some floating motion
        particle.y += Math.sin(particle.x * 0.01) * 0.1
        particle.x += Math.cos(particle.y * 0.01) * 0.1
      })
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particlesRef.current.forEach(particle => {
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Draw connections between nearby particles
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach(otherParticle => {
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
    }

    const animate = () => {
      updateParticles()
      drawParticles()
      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initParticles()
    animate()

    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  )
}

// Static floating elements for specific sections
export function FloatingElements() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 left-10 w-4 h-4 bg-primary/20 rounded-full"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-40 right-20 w-6 h-6 bg-accent/20 rounded-full"
        animate={{
          y: [0, 15, 0],
          x: [0, -15, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-40 left-20 w-3 h-3 bg-primary/30 rounded-full"
        animate={{
          y: [0, -25, 0],
          x: [0, 20, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-5 h-5 bg-accent/25 rounded-full"
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  )
}





