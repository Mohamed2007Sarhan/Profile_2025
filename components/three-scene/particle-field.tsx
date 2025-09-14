"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"

// Simple random sphere function to replace maath dependency
function randomInSphere(radius: number): [number, number, number] {
  const u = Math.random()
  const v = Math.random()
  const theta = u * 2.0 * Math.PI
  const phi = Math.acos(2.0 * v - 1.0)
  const r = Math.cbrt(Math.random()) * radius
  const sinTheta = Math.sin(theta)
  const cosTheta = Math.cos(theta)
  const sinPhi = Math.sin(phi)
  const cosPhi = Math.cos(phi)
  return [r * sinPhi * cosTheta, r * sinPhi * sinTheta, r * cosPhi]
}

export function ParticleField() {
  const ref = useRef<any>()

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(1000 * 3)
    const colors = new Float32Array(1000 * 3)

    for (let i = 0; i < 1000; i++) {
      // Random positions in a sphere
      const [x, y, z] = randomInSphere(8)
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      // Colors - mix of primary and accent colors
      const isPrimary = Math.random() > 0.5
      if (isPrimary) {
        colors[i * 3] = 0.09 // R for #164e63
        colors[i * 3 + 1] = 0.31 // G
        colors[i * 3 + 2] = 0.39 // B
      } else {
        colors[i * 3] = 0.96 // R for #f59e0b
        colors[i * 3 + 1] = 0.62 // G
        colors[i * 3 + 2] = 0.04 // B
      }
    }

    return [positions, colors]
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05
      ref.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial transparent vertexColors size={0.02} sizeAttenuation={true} depthWrite={false} blending={2} />
    </Points>
  )
}
