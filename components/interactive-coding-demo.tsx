"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Code2, Terminal, Monitor } from "lucide-react"

interface CodeLine {
  text: string
  type: "code" | "comment" | "output" | "error"
  delay?: number
}

const codeSnippets = {
  python: [
    { text: "# AI Model Training Script", type: "comment" as const, delay: 1000 },
    { text: "import tensorflow as tf", type: "code" as const, delay: 500 },
    { text: "import numpy as np", type: "code" as const, delay: 300 },
    { text: "from sklearn.model_selection import train_test_split", type: "code" as const, delay: 400 },
    { text: "", type: "code" as const, delay: 200 },
    { text: "def create_model():", type: "code" as const, delay: 600 },
    { text: "    model = tf.keras.Sequential([", type: "code" as const, delay: 400 },
    { text: "        tf.keras.layers.Dense(128, activation='relu'),", type: "code" as const, delay: 300 },
    { text: "        tf.keras.layers.Dropout(0.2),", type: "code" as const, delay: 300 },
    { text: "        tf.keras.layers.Dense(64, activation='relu'),", type: "code" as const, delay: 300 },
    { text: "        tf.keras.layers.Dense(10, activation='softmax')", type: "code" as const, delay: 300 },
    { text: "    ])", type: "code" as const, delay: 200 },
    { text: "    return model", type: "code" as const, delay: 400 },
    { text: "", type: "code" as const, delay: 200 },
    { text: "# Training the model", type: "comment" as const, delay: 1000 },
    { text: "model = create_model()", type: "code" as const, delay: 500 },
    { text: "model.compile(optimizer='adam',", type: "code" as const, delay: 400 },
    { text: "              loss='sparse_categorical_crossentropy',", type: "code" as const, delay: 300 },
    { text: "              metrics=['accuracy'])", type: "code" as const, delay: 300 },
    { text: "", type: "code" as const, delay: 200 },
    { text: "history = model.fit(X_train, y_train,", type: "code" as const, delay: 500 },
    { text: "                    epochs=10,", type: "code" as const, delay: 300 },
    { text: "                    validation_data=(X_test, y_test))", type: "code" as const, delay: 300 },
    { text: "", type: "code" as const, delay: 200 },
    { text: "print('Model training completed!')", type: "code" as const, delay: 600 },
    { text: ">>> Model training completed!", type: "output" as const, delay: 800 },
    { text: ">>> Accuracy: 94.5%", type: "output" as const, delay: 500 },
    { text: ">>> Loss: 0.18", type: "output" as const, delay: 500 },
  ],
  javascript: [
    { text: "// Real-time Chat Application", type: "comment" as const, delay: 1000 },
    { text: "import React, { useState, useEffect } from 'react'", type: "code" as const, delay: 500 },
    { text: "import { io } from 'socket.io-client'", type: "code" as const, delay: 400 },
    { text: "", type: "code" as const, delay: 200 },
    { text: "const ChatApp = () => {", type: "code" as const, delay: 600 },
    { text: "  const [messages, setMessages] = useState([])", type: "code" as const, delay: 400 },
    { text: "  const [socket, setSocket] = useState(null)", type: "code" as const, delay: 300 },
    { text: "", type: "code" as const, delay: 200 },
    { text: "  useEffect(() => {", type: "code" as const, delay: 500 },
    { text: "    const newSocket = io('ws://localhost:3001')", type: "code" as const, delay: 400 },
    { text: "    setSocket(newSocket)", type: "code" as const, delay: 300 },
    { text: "", type: "code" as const, delay: 200 },
    { text: "    newSocket.on('message', (data) => {", type: "code" as const, delay: 500 },
    { text: "      setMessages(prev => [...prev, data])", type: "code" as const, delay: 300 },
    { text: "    })", type: "code" as const, delay: 200 },
    { text: "", type: "code" as const, delay: 200 },
    { text: "    return () => newSocket.close()", type: "code" as const, delay: 400 },
    { text: "  }, [])", type: "code" as const, delay: 200 },
    { text: "", type: "code" as const, delay: 200 },
    { text: "  return (", type: "code" as const, delay: 500 },
    { text: "    <div className='chat-container'>", type: "code" as const, delay: 300 },
    { text: "      {messages.map(msg => (", type: "code" as const, delay: 400 },
    { text: "        <Message key={msg.id} data={msg} />", type: "code" as const, delay: 300 },
    { text: "      ))}", type: "code" as const, delay: 200 },
    { text: "    </div>", type: "code" as const, delay: 300 },
    { text: "  )", type: "code" as const, delay: 200 },
    { text: "}", type: "code" as const, delay: 300 },
    { text: "", type: "code" as const, delay: 200 },
    { text: "export default ChatApp", type: "code" as const, delay: 500 },
    { text: ">>> Component rendered successfully", type: "output" as const, delay: 800 },
    { text: ">>> Socket connected to ws://localhost:3001", type: "output" as const, delay: 500 },
  ],
  csharp: [
    { text: "// Desktop Application - Crypto Tracker", type: "comment" as const, delay: 1000 },
    { text: "using System;", type: "code" as const, delay: 500 },
    { text: "using System.Windows;", type: "code" as const, delay: 400 },
    { text: "using System.Net.Http;", type: "code" as const, delay: 300 },
    { text: "using Newtonsoft.Json;", type: "code" as const, delay: 300 },
    { text: "", type: "code" as const, delay: 200 },
    { text: "namespace CryptoVault", type: "code" as const, delay: 600 },
    { text: "{", type: "code" as const, delay: 200 },
    { text: "    public partial class MainWindow : Window", type: "code" as const, delay: 500 },
    { text: "    {", type: "code" as const, delay: 200 },
    { text: "        private HttpClient httpClient;", type: "code" as const, delay: 400 },
    { text: "        private Timer updateTimer;", type: "code" as const, delay: 300 },
    { text: "", type: "code" as const, delay: 200 },
    { text: "        public MainWindow()", type: "code" as const, delay: 500 },
    { text: "        {", type: "code" as const, delay: 200 },
    { text: "            InitializeComponent();", type: "code" as const, delay: 400 },
    { text: "            httpClient = new HttpClient();", type: "code" as const, delay: 300 },
    { text: "            StartPriceUpdates();", type: "code" as const, delay: 300 },
    { text: "        }", type: "code" as const, delay: 200 },
    { text: "", type: "code" as const, delay: 200 },
    { text: "        private async void StartPriceUpdates()", type: "code" as const, delay: 600 },
    { text: "        {", type: "code" as const, delay: 200 },
    { text: "            updateTimer = new Timer(async _ =>", type: "code" as const, delay: 400 },
    { text: "            {", type: "code" as const, delay: 200 },
    { text: "                await UpdateCryptoPrices();", type: "code" as const, delay: 300 },
    { text: "            }, null, 0, 5000);", type: "code" as const, delay: 300 },
    { text: "        }", type: "code" as const, delay: 200 },
    { text: "    }", type: "code" as const, delay: 200 },
    { text: "}", type: "code" as const, delay: 300 },
    { text: ">>> Application started successfully", type: "output" as const, delay: 800 },
    { text: ">>> Price updates every 5 seconds", type: "output" as const, delay: 500 },
  ],
  kotlin: [
    { text: "// Android Task Manager", type: "comment" as const, delay: 1000 },
    { text: "package com.taskflow.android", type: "code" as const, delay: 500 },
    { text: "", type: "code" as const, delay: 200 },
    { text: "import androidx.compose.foundation.layout.*", type: "code" as const, delay: 400 },
    { text: "import androidx.compose.material3.*", type: "code" as const, delay: 300 },
    { text: "import androidx.compose.runtime.*", type: "code" as const, delay: 300 },
    { text: "", type: "code" as const, delay: 200 },
    { text: "@Composable", type: "code" as const, delay: 500 },
    { text: "fun TaskListScreen() {", type: "code" as const, delay: 400 },
    { text: "    var tasks by remember { mutableStateOf(emptyList<Task>()) }", type: "code" as const, delay: 400 },
    { text: "    var isLoading by remember { mutableStateOf(true) }", type: "code" as const, delay: 300 },
    { text: "", type: "code" as const, delay: 200 },
    { text: "    LaunchedEffect(Unit) {", type: "code" as const, delay: 500 },
    { text: "        tasks = taskRepository.getAllTasks()", type: "code" as const, delay: 400 },
    { text: "        isLoading = false", type: "code" as const, delay: 300 },
    { text: "    }", type: "code" as const, delay: 200 },
    { text: "", type: "code" as const, delay: 200 },
    { text: "    Column(modifier = Modifier.fillMaxSize()) {", type: "code" as const, delay: 500 },
    { text: "        TopAppBar(title = { Text(\"My Tasks\") })", type: "code" as const, delay: 300 },
    { text: "        ", type: "code" as const, delay: 200 },
    { text: "        if (isLoading) {", type: "code" as const, delay: 400 },
    { text: "            CircularProgressIndicator()", type: "code" as const, delay: 300 },
    { text: "        } else {", type: "code" as const, delay: 200 },
    { text: "            LazyColumn {", type: "code" as const, delay: 400 },
    { text: "                items(tasks) { task ->", type: "code" as const, delay: 300 },
    { text: "                    TaskItem(task = task)", type: "code" as const, delay: 300 },
    { text: "                }", type: "code" as const, delay: 200 },
    { text: "            }", type: "code" as const, delay: 200 },
    { text: "        }", type: "code" as const, delay: 200 },
    { text: "    }", type: "code" as const, delay: 200 },
    { text: "}", type: "code" as const, delay: 300 },
    { text: ">>> App launched successfully", type: "output" as const, delay: 800 },
    { text: ">>> Tasks loaded: 15 items", type: "output" as const, delay: 500 },
  ]
}

export function InteractiveCodingDemo() {
  const [currentLanguage, setCurrentLanguage] = useState<keyof typeof codeSnippets>("python")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [displayedLines, setDisplayedLines] = useState<CodeLine[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startAnimation = () => {
    if (isComplete) {
      resetAnimation()
      return
    }
    
    setIsPlaying(true)
    setCurrentLineIndex(0)
    setDisplayedLines([])
    setIsComplete(false)
  }

  const pauseAnimation = () => {
    setIsPlaying(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const resetAnimation = () => {
    setIsPlaying(false)
    setCurrentLineIndex(0)
    setDisplayedLines([])
    setIsComplete(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const changeLanguage = (lang: keyof typeof codeSnippets) => {
    setCurrentLanguage(lang)
    resetAnimation()
  }

  useEffect(() => {
    if (isPlaying && currentLineIndex < codeSnippets[currentLanguage].length) {
      const currentLine = codeSnippets[currentLanguage][currentLineIndex]
      const delay = currentLine.delay || 100

      intervalRef.current = setTimeout(() => {
        setDisplayedLines(prev => [...prev, currentLine])
        setCurrentLineIndex(prev => prev + 1)
      }, delay)
    } else if (currentLineIndex >= codeSnippets[currentLanguage].length) {
      setIsComplete(true)
      setIsPlaying(false)
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current)
      }
    }
  }, [isPlaying, currentLineIndex, currentLanguage])

  const getLineColor = (type: CodeLine["type"]) => {
    switch (type) {
      case "comment":
        return "text-green-500"
      case "output":
        return "text-blue-400"
      case "error":
        return "text-red-400"
      default:
        return "text-gray-300"
    }
  }

  return (
    <Card className="w-full bg-slate-900 border-slate-700">
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-slate-300 text-sm font-medium">Terminal</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {Object.keys(codeSnippets).map((lang) => (
                <Button
                  key={lang}
                  variant={currentLanguage === lang ? "default" : "ghost"}
                  size="sm"
                  onClick={() => changeLanguage(lang as keyof typeof codeSnippets)}
                  className="h-6 px-2 text-xs"
                >
                  {lang.toUpperCase()}
                </Button>
              ))}
            </div>
            
            <div className="flex gap-1 ml-4">
              <Button
                size="sm"
                variant="ghost"
                onClick={isPlaying ? pauseAnimation : startAnimation}
                className="h-6 w-6 p-0"
              >
                {isComplete ? <RotateCcw className="w-3 h-3" /> : isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Code Display */}
        <div className="p-4 font-mono text-sm">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="w-4 h-4 text-blue-400" />
            <span className="text-slate-400">
              {currentLanguage === "python" && "AI/ML Development"}
              {currentLanguage === "javascript" && "Web Development"}
              {currentLanguage === "csharp" && "Desktop Development"}
              {currentLanguage === "kotlin" && "Android Development"}
            </span>
          </div>
          
          <div className="space-y-1 min-h-[400px]">
            <AnimatePresence>
              {displayedLines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-center ${getLineColor(line.type)}`}
                >
                  <span className="text-slate-500 w-8 text-right mr-4 text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    {line.text || " "}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isPlaying && (
              <motion.div
                className="flex items-center text-blue-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <span className="text-slate-500 w-8 text-right mr-4 text-xs">
                  {String(displayedLines.length + 1).padStart(2, "0")}
                </span>
                <span>|</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-slate-700 bg-slate-800/50">
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <Terminal className="w-3 h-3" />
              <span>Interactive Demo</span>
            </div>
            <div className="flex items-center gap-1">
              <Monitor className="w-3 h-3" />
              <span>Live Coding</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {displayedLines.length} lines
            </Badge>
            {isComplete && (
              <Badge variant="default" className="text-xs bg-green-600">
                Complete
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}





