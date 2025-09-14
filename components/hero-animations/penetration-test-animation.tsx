"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function PenetrationTestAnimation() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isScanning, setIsScanning] = useState(false)
  const [scanResults, setScanResults] = useState<string[]>([])
  const [isVulnerable, setIsVulnerable] = useState(false)

  const scanSteps = [
    "Initializing security scan...",
    "Scanning for open ports...",
    "Analyzing network topology...",
    "Testing for vulnerabilities...",
    "Checking authentication systems...",
    "Scanning for SQL injection points...",
    "Testing XSS vulnerabilities...",
    "Checking for CSRF protection...",
    "Analyzing SSL/TLS configuration...",
    "Scanning for directory traversal...",
    "Testing for file upload vulnerabilities...",
    "Checking for authentication bypass...",
    "Scanning for privilege escalation...",
    "Testing for session management...",
    "Finalizing security assessment..."
  ]

  const vulnerabilityResults = [
    "✓ Port 22 (SSH) - Secure",
    "✓ Port 80 (HTTP) - Secure", 
    "✓ Port 443 (HTTPS) - Secure",
    "⚠ Port 8080 - Potential vulnerability detected",
    "✓ Authentication system - Secure",
    "✓ SQL injection protection - Active",
    "✓ XSS protection - Active",
    "⚠ CSRF protection - Weak implementation",
    "✓ SSL/TLS - Properly configured",
    "✓ Directory traversal - Protected",
    "✓ File upload - Secure",
    "✓ Authentication bypass - Protected",
    "✓ Privilege escalation - Protected",
    "⚠ Session management - Needs improvement",
    "✓ Overall security - Good with minor issues"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStep < scanSteps.length - 1) {
        setCurrentStep(prev => prev + 1)
        setScanResults(prev => [...prev, scanSteps[currentStep]])
      } else {
        setIsScanning(false)
        setIsVulnerable(true)
        clearInterval(interval)
      }
    }, 800)

    if (currentStep === 0) {
      setIsScanning(true)
    }

    return () => clearInterval(interval)
  }, [currentStep, scanSteps.length])

  return (
    <div className="w-full h-full bg-black rounded-lg overflow-hidden">
      {/* Terminal Header */}
      <div className="bg-gray-800 px-2 sm:px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1 sm:gap-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-gray-300 text-xs sm:text-sm ml-2 sm:ml-4">Security Scanner v2.1.3</div>
        <div className="ml-auto text-green-400 text-xs sm:text-sm font-mono">
          {isScanning ? "SCANNING..." : isVulnerable ? "COMPLETE" : "READY"}
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-2 sm:p-4 font-mono text-xs sm:text-sm h-full overflow-y-auto">
        <div className="text-green-400 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-blue-400">$</span>
            <span className="text-xs sm:text-sm">nmap -sS -O target.com</span>
          </div>
        </div>

        {/* Scanning Progress */}
        {isScanning && (
          <div className="space-y-2 mb-4">
            {scanResults.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="text-yellow-400"
              >
                <span className="text-blue-400">[INFO]</span> {result}
                {index === scanResults.length - 1 && (
                  <motion.span
                    className="ml-2 text-green-400"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    █
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Vulnerability Results */}
        {isVulnerable && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <div className="text-cyan-400 font-bold mb-2">Security Assessment Results:</div>
            {vulnerabilityResults.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`${
                  result.includes("⚠") 
                    ? "text-yellow-400" 
                    : result.includes("✓") 
                    ? "text-green-400" 
                    : "text-gray-400"
                }`}
              >
                {result}
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded"
            >
              <div className="text-green-400 font-bold">✓ Security Scan Completed Successfully</div>
              <div className="text-gray-300 text-xs mt-1">
                Target is secure with minor recommendations for improvement
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Animated Cursor */}
        {isScanning && (
          <motion.span
            className="text-green-400"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            █
          </motion.span>
        )}
      </div>
    </div>
  )
}
