"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float } from "@react-three/drei"
import { Suspense } from "react"
import { FloatingCards } from "./floating-cards"
import { TechSphere } from "./tech-sphere"
import { ParticleField } from "./particle-field"

function SceneContent() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color="#f59e0b" />

      {/* 3D Objects */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <FloatingCards />
      </Float>

      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
        <TechSphere />
      </Float>

      <ParticleField />

      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  )
}

export default function SceneCanvas() {
  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }} 
        dpr={[1, 2]} 
        performance={{ min: 0.5 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  )
}
