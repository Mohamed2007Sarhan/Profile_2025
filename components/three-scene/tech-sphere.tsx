"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial } from "@react-three/drei"
import type { Mesh } from "three"

export function TechSphere() {
  const sphereRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.2
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Sphere ref={sphereRef} args={[1, 64, 64]} position={[3, -1, -2]}>
      <MeshDistortMaterial
        color="#164e63"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.1}
        metalness={0.8}
        transparent
        opacity={0.8}
      />
    </Sphere>
  )
}
