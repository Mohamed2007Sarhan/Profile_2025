"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Stethoscope, Heart, Shield, Code2, Brain, Zap, Terminal, FileCode, Cpu, Database } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

const dentalAnimations = [
  {
    id: "penetration-testing",
    title: "Penetration Testing",
    titleAr: "اختبار الاختراق",
    icon: Shield,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    description: "Advanced security testing and vulnerability assessment",
    descriptionAr: "اختبار الأمان المتقدم وتقييم الثغرات",
    animation: "pentest",
    code: "def scan_vulnerabilities():\n    for target in targets:\n        vulns = check_exploits(target)\n        if vulns:\n            report_critical(vulns)\n    return security_report"
  },
  {
    id: "web-development",
    title: "Web Development",
    titleAr: "تطوير الويب",
    icon: Code2,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    description: "Building modern web applications with latest technologies",
    descriptionAr: "بناء تطبيقات ويب حديثة بأحدث التقنيات",
    animation: "webdev",
    code: "const App = () => {\n  const [data, setData] = useState([]);\n  useEffect(() => {\n    fetchData().then(setData);\n  }, []);\n  return <div>{data.map(render)}</div>;\n};"
  },
  {
    id: "ai-development",
    title: "AI Development",
    titleAr: "تطوير الذكاء الاصطناعي",
    icon: Brain,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    description: "Creating intelligent systems and machine learning models",
    descriptionAr: "إنشاء أنظمة ذكية ونماذج التعلم الآلي",
    animation: "ai",
    code: "model = Sequential([\n    Dense(128, activation='relu'),\n    Dropout(0.3),\n    Dense(64, activation='relu'),\n    Dense(1, activation='sigmoid')\n])\nmodel.compile(optimizer='adam', loss='binary_crossentropy')"
  },
  {
    id: "mobile-development",
    title: "Mobile Development",
    titleAr: "تطوير التطبيقات المحمولة",
    icon: Terminal,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    description: "Building cross-platform mobile applications",
    descriptionAr: "بناء تطبيقات محمولة متعددة المنصات",
    animation: "mobile",
    code: "class MainActivity : AppCompatActivity() {\n    override fun onCreate(savedInstanceState: Bundle?) {\n        super.onCreate(savedInstanceState)\n        setContentView(R.layout.activity_main)\n        setupRecyclerView()\n    }\n}"
  }
]

export function DentalAnimation() {
  const { language } = useLanguage()
  const [currentAnimation, setCurrentAnimation] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [typingPhase, setTypingPhase] = useState(0) // 0: typing, 1: deleting, 2: pause
  const [displayedCode, setDisplayedCode] = useState("")
  const [codeIndex, setCodeIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      // Start typing animation
      setIsAnimating(true)
      setIsTyping(true)
      setTypingPhase(0)
      setCodeIndex(0)
      setDisplayedCode("")
      
      // Simulate typing each character
      const currentCode = dentalAnimations[currentAnimation].code
      const typingDuration = currentCode.length * 50 + 1000
      const deletingDuration = 1500
      const pauseDuration = 1000
      
      // Type the code
      const typeInterval = setInterval(() => {
        setCodeIndex(prev => {
          if (prev < currentCode.length) {
            setDisplayedCode(currentCode.slice(0, prev + 1))
            return prev + 1
          } else {
            clearInterval(typeInterval)
            return prev
          }
        })
      }, 50)
      
      setTimeout(() => {
        clearInterval(typeInterval)
        setTypingPhase(1) // Start deleting
        const deleteInterval = setInterval(() => {
          setCodeIndex(prev => {
            if (prev > 0) {
              setDisplayedCode(currentCode.slice(0, prev - 1))
              return prev - 1
            } else {
              clearInterval(deleteInterval)
              return prev
            }
          })
        }, 30)
        
        setTimeout(() => {
          clearInterval(deleteInterval)
          setTypingPhase(2) // Pause
          setTimeout(() => {
            setCurrentAnimation((prev) => (prev + 1) % dentalAnimations.length)
            setIsAnimating(false)
            setIsTyping(false)
            setTypingPhase(0)
          }, pauseDuration)
        }, deletingDuration)
      }, typingDuration)
    }, 6000)

    return () => clearInterval(interval)
  }, [currentAnimation])

  const currentDental = dentalAnimations[currentAnimation]

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden">
      {/* Code Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-blue-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.1),transparent_70%)]" />
        {/* Animated Code Background */}
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-green-400 font-mono text-xs"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              {['const', 'function', 'class', 'import', 'export'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Code Elements */}
      <motion.div
        className="absolute top-10 left-10 w-16 h-16 bg-emerald-500/20 rounded-full"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <Terminal className="w-8 h-8 text-emerald-400" />
        </div>
      </motion.div>

      <motion.div
        className="absolute top-20 right-16 w-12 h-12 bg-blue-500/20 rounded-full"
        animate={{
          y: [0, 15, 0],
          x: [0, 10, 0],
          rotate: [0, -180, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <Code2 className="w-6 h-6 text-blue-400" />
        </div>
      </motion.div>

      {/* Main Code Scene */}
      <div className="absolute inset-4 flex items-center justify-center">
        <div className="relative w-80 h-80">
          {/* Code Terminal */}
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-72 h-48 bg-slate-800 rounded-t-2xl border border-slate-600"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 p-3 border-b border-slate-600">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="ml-4 text-xs text-slate-400 font-mono">Terminal</span>
            </div>
            
            {/* Code Display */}
            <div className="p-4 h-32 overflow-hidden">
              <motion.pre
                className="text-green-400 font-mono text-xs leading-relaxed"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {displayedCode}
                <motion.span
                  className="text-white"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  |
                </motion.span>
              </motion.pre>
            </div>
          </motion.div>

          {/* Floating Code Elements */}
          <motion.div
            className="absolute top-16 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-slate-300 rounded-full"
            animate={{
              y: [0, -3, 0],
              rotate: [0, 2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Animated Code Symbols */}
            <motion.div 
              className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-slate-200 rounded-t-full flex items-center justify-center"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Animated Code Characters */}
              {[0, 1, 2, 3, 4].map((charIndex) => (
                <motion.div
                  key={charIndex}
                  className="absolute top-1 w-2 h-2 bg-slate-400 rounded-full"
                  style={{ left: `${1 + charIndex * 2}px` }}
                  animate={{
                    y: typingPhase === 0 ? [0, -5, 0] : typingPhase === 1 ? [0, -3, 0] : [0, -1, 0],
                    scale: typingPhase === 0 ? [1, 1.4, 1] : typingPhase === 1 ? [1, 1.2, 1] : [1, 1.05, 1],
                    opacity: typingPhase === 0 ? [0.4, 1, 0.4] : typingPhase === 1 ? [0.6, 1, 0.6] : [0.8, 1, 0.8],
                    rotate: typingPhase === 0 ? [0, 10, 0] : typingPhase === 1 ? [0, -5, 0] : [0, 3, 0],
                    x: typingPhase === 0 ? [0, 1, 0] : typingPhase === 1 ? [0, -1, 0] : [0, 0, 0],
                  }}
                  transition={{
                    duration: typingPhase === 0 ? 0.5 : typingPhase === 1 ? 0.7 : 1.0,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: charIndex * 0.06,
                  }}
                />
              ))}
              
              {/* Code Movement Effect */}
              <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-6 bg-gradient-to-t from-slate-200/20 to-transparent rounded-t-full"
                animate={{
                  scale: typingPhase === 0 ? [1, 1.3, 1] : typingPhase === 1 ? [1, 1.1, 1] : [1, 1.05, 1],
                  opacity: typingPhase === 0 ? [0, 0.8, 0] : typingPhase === 1 ? [0, 0.4, 0] : [0, 0.2, 0],
                }}
                transition={{
                  duration: typingPhase === 0 ? 0.8 : typingPhase === 1 ? 1.0 : 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Status Indicators */}
              {typingPhase === 0 && (
                <motion.div
                  className="absolute top-8 left-4 text-xs text-green-400 font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  {language === "en" ? "Writing code..." : "كتابة كود..."}
                </motion.div>
              )}
              
              {typingPhase === 1 && (
                <motion.div
                  className="absolute top-8 left-4 text-xs text-red-400 font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  {language === "en" ? "Deleting..." : "حذف..."}
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Code Tools */}
          <motion.div
            className="absolute top-8 right-8 w-8 h-8 bg-emerald-500 rounded-full"
            animate={{
              x: [0, -20, 0],
              y: [0, 10, 0],
              rotate: [0, 45, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <FileCode className="w-4 h-4 text-white" />
            </div>
          </motion.div>

          {/* Code Analysis Display */}
          <motion.div
            className="absolute top-4 left-4 w-24 h-32 bg-cyan-500/10 border border-cyan-500/30 rounded-lg"
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="absolute inset-2 bg-gradient-to-br from-cyan-500/20 to-transparent rounded">
              <div className="absolute top-2 left-2 w-2 h-2 bg-cyan-400 rounded-full" />
              <div className="absolute top-4 left-4 w-2 h-2 bg-cyan-400 rounded-full" />
              <div className="absolute top-6 left-2 w-2 h-2 bg-cyan-400 rounded-full" />
              <div className="absolute top-8 left-6 w-2 h-2 bg-cyan-400 rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animation Mode Indicator */}
      <motion.div
        key={currentAnimation}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`absolute bottom-4 left-4 right-4 p-4 rounded-lg ${currentDental.bgColor} border ${currentDental.color.replace('text-', 'border-')}/20`}
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className={`p-2 rounded-lg ${currentDental.bgColor}`}
          >
            <currentDental.icon className={`w-6 h-6 ${currentDental.color}`} />
          </motion.div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">
              {language === "en" ? currentDental.title : currentDental.titleAr}
            </h3>
            <p className="text-sm text-white/80">
              {language === "en" ? currentDental.description : currentDental.descriptionAr}
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs text-white/60 font-mono">
              {language === "en" ? "Code Mode" : "وضع الكود"}
            </div>
            <div className="text-xs text-white/40">
              {typingPhase === 0 ? (language === "en" ? "Typing..." : "كتابة...") : 
               typingPhase === 1 ? (language === "en" ? "Deleting..." : "حذف...") : 
               (language === "en" ? "Paused" : "متوقف")}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-700">
        <motion.div
          className={`h-full ${currentDental.color.replace('text-', 'bg-')}`}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
        />
      </div>

      {/* Mode Indicators */}
      <div className="absolute top-4 right-4 flex gap-1">
        {dentalAnimations.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentAnimation ? 'bg-white' : 'bg-slate-600'
            }`}
            animate={{
              scale: index === currentAnimation ? [1, 1.2, 1] : 1,
              opacity: index === currentAnimation ? [0.8, 1, 0.8] : 0.6,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Code Status Indicator */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <motion.div
          className="w-2 h-2 bg-green-400 rounded-full"
          animate={{
            opacity: typingPhase === 0 ? [0.5, 1, 0.5] : 0.3,
            scale: typingPhase === 0 ? [1, 1.2, 1] : 1,
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <span className="text-xs text-slate-400 font-mono">
          {language === "en" ? "Live Coding" : "برمجة مباشرة"}
        </span>
      </div>
    </div>
  )
}
