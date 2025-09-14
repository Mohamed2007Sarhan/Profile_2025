"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { RoundedBox, Text } from "@react-three/drei"
import type { Group } from "three"

const technologies = [
  { name: "React", color: "#61DAFB", position: [-2, 1, 0] },
  { name: "TypeScript", color: "#3178C6", position: [2, -1, 1] },
  { name: "Next.js", color: "#000000", position: [0, 2, -1] },
  { name: "Three.js", color: "#000000", position: [-1, -2, 0] },
  { name: "WebGL", color: "#990000", position: [1.5, 0, -2] },
]

export function FloatingCards() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {technologies.map((tech, index) => (
        <group key={tech.name} position={tech.position as [number, number, number]}>
          {/* Card Background */}
          <RoundedBox args={[1.5, 0.8, 0.1]} radius={0.1} smoothness={4}>
            <meshStandardMaterial color="#ffffff" transparent opacity={0.9} roughness={0.1} metalness={0.1} />
          </RoundedBox>

          {/* Technology Text */}
          <Text
            position={[0, 0, 0.06]}
            fontSize={0.15}
            color={tech.color}
            anchorX="center"
            anchorY="middle"
          >
            {tech.name}
          </Text>

          {/* Accent Border */}
          <RoundedBox args={[1.52, 0.82, 0.08]} radius={0.1} smoothness={4}>
            <meshStandardMaterial color={tech.color} transparent opacity={0.3} roughness={0.2} metalness={0.8} />
          </RoundedBox>
        </group>
      ))}
    </group>
  )
}
