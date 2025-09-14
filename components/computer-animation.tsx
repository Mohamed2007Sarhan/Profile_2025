"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Monitor, Code2, Shield, Bug, Heart, Stethoscope, Brain, Database } from "lucide-react"

const animationModes = [
  {
    id: "hacking",
    title: "Penetration Testing",
    titleAr: "اختبار الاختراق",
    icon: Bug,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    description: "Advanced security testing and vulnerability assessment",
    descriptionAr: "اختبارات أمنية متقدمة وتقييم الثغرات",
    code: [
      "nmap -sS -O target.com",
      "sqlmap -u 'http://target.com/page?id=1'",
      "hydra -l admin -P passwords.txt ssh://target.com",
      "nikto -h target.com",
      "burpsuite --scan target.com"
    ]
  },
  {
    id: "security",
    title: "Cybersecurity",
    titleAr: "الأمن السيبراني",
    icon: Shield,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    description: "Protecting systems and networks from cyber threats",
    descriptionAr: "حماية الأنظمة والشبكات من التهديدات السيبرانية",
    code: [
      "firewall --enable --port 443",
      "encrypt --algorithm AES-256 --file data.txt",
      "monitor --threats --real-time",
      "backup --encrypted --cloud",
      "audit --security --compliance"
    ]
  },
  {
    id: "programming",
    title: "Software Development",
    titleAr: "تطوير البرمجيات",
    icon: Code2,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    description: "Building innovative software solutions",
    descriptionAr: "بناء حلول برمجية مبتكرة",
    code: [
      "def create_ai_model():",
      "    model = NeuralNetwork()",
      "    model.train(data)",
      "    return model.predict()",
      "app.run(debug=True)"
    ]
  },
  {
    id: "dentistry",
    title: "Digital Dentistry",
    titleAr: "طب الأسنان الرقمي",
    icon: Stethoscope,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    description: "Combining technology with dental care",
    descriptionAr: "دمج التكنولوجيا مع الرعاية السنية",
    code: [
      "scan_tooth_3d(patient_id)",
      "analyze_cavity_detection()",
      "generate_treatment_plan()",
      "simulate_implant_placement()",
      "track_oral_health_metrics()"
    ]
  }
]

export function ComputerAnimation() {
  const [currentMode, setCurrentMode] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [displayedCode, setDisplayedCode] = useState<string[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentMode((prev) => (prev + 1) % animationModes.length)
        setDisplayedCode([])
        setIsAnimating(false)
      }, 500)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!isAnimating) {
      const code = animationModes[currentMode].code
      let index = 0
      const timer = setInterval(() => {
        if (index < code.length) {
          setDisplayedCode(prev => [...prev, code[index]])
          index++
        } else {
          clearInterval(timer)
        }
      }, 800)

      return () => clearInterval(timer)
    }
  }, [currentMode, isAnimating])

  const currentAnimation = animationModes[currentMode]

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden">
      {/* Computer Screen */}
      <div className="absolute inset-4 bg-black rounded-xl border-2 border-slate-600">
        {/* Screen Header */}
        <div className="flex items-center justify-between p-3 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <currentAnimation.icon className="w-4 h-4" />
            <span>{currentAnimation.title}</span>
          </div>
        </div>

        {/* Screen Content */}
        <div className="p-4 h-full overflow-hidden">
          {/* Mode Indicator */}
          <motion.div
            key={currentMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${currentAnimation.bgColor} ${currentAnimation.color} mb-4`}
          >
            <currentAnimation.icon className="w-4 h-4" />
            <span>{currentAnimation.title}</span>
          </motion.div>

          {/* Code Display */}
          <div className="font-mono text-sm space-y-1">
            <AnimatePresence>
              {displayedCode.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="text-green-400"
                >
                  <span className="text-slate-500 mr-2">{index + 1}</span>
                  {line}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Cursor */}
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-green-400"
            >
              <span className="text-slate-500 mr-2">{displayedCode.length + 1}</span>
              <span className="bg-green-400 w-2 h-4 inline-block"></span>
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="w-full bg-slate-700 rounded-full h-1">
              <motion.div
                className={`h-1 rounded-full ${currentAnimation.color.replace('text-', 'bg-')}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "linear" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-2 right-2 w-8 h-8 bg-blue-500/20 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-2 left-2 w-6 h-6 bg-green-500/20 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Mode Indicators */}
      <div className="absolute top-2 left-2 flex gap-1">
        {animationModes.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentMode ? 'bg-white' : 'bg-slate-600'
            }`}
          />
        ))}
      </div>
    </div>
  )
}





