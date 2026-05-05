import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber/webgpu'
import { useRef, useMemo, useEffect, useLayoutEffect } from 'react'
import { OrbitControls, Text3D, Center } from '@react-three/drei'

import '../lab.css'

const rainbowColors = [
  '#E40303',
  '#FF8C00',
  '#FFE500',
  '#008026',
  '#004DFF',
  '#732682',
]

interface Particle {
  t: number
  factor: number
  speed: number
  xFactor: number
  yFactor: number
  zFactor: number
  mx: number
  my: number
  color: THREE.Color
}

interface RainbowTextProps {
  text: string
  position?: [number, number, number]
}

function RainbowText({ text, position = [0, 0, 0] }: RainbowTextProps) {
  const textRef = useRef<THREE.Mesh>(null)
  const elapsed = useRef(0)
  const { size } = useThree()

  useLayoutEffect(() => {
    if (textRef.current) {
      const box = new THREE.Box3().setFromObject(textRef.current)
      console.log('Text3D size:', box.getSize(new THREE.Vector3()))
    }
  })

  useFrame((_, delta) => {
    elapsed.current += delta
    if (textRef.current) {
      textRef.current.position.z = Math.sin(elapsed.current) * 0.4
    }
  })

  return (
    <Center>
      <Text3D
        ref={textRef}
        font="/Russo_One.json"
        size={size.width > 700 ? 0.4 : 0.2}
        curveSegments={32}
        position={position}
        scale={[1, 1, 0.001]}
      >
        {text}
        <meshStandardMaterial color="#E8B4B0" metalness={0} roughness={0.85} />
      </Text3D>
    </Center>
  )
}

function Swarm({ count, dummy = new THREE.Object3D() }: { count: number; dummy?: THREE.Object3D }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const light = useRef<THREE.AmbientLight>(null)
  const geo = useMemo(() => new THREE.SphereGeometry(0.3), [])
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ vertexColors: true, metalness: 1, roughness: 0.5 }), [])
  const particles = useMemo<Particle[]>(() => {
    const temp: Particle[] = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.02 + Math.random() / 200
      const xFactor = -50 + Math.random() * 100
      const yFactor = -50 + Math.random() * 100
      const zFactor = -50 + Math.random() * 100
      const color = new THREE.Color(rainbowColors[Math.floor(Math.random() * rainbowColors.length)])
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0, color })
    }
    return temp
  }, [count])

  useFrame((state) => {
    if (!light.current || !mesh.current) return
    light.current.position.set(
      (-state.pointer.x * state.viewport.width) / 5,
      (-state.pointer.y * state.viewport.height) / 5,
      0
    )
    particles.forEach((particle, i) => {
      const { factor, speed, xFactor, yFactor, zFactor, color } = particle
      let t = particle.t
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t)
      particle.mx += (state.pointer.x * 1000 - particle.mx) * 0.01
      particle.my += (state.pointer.y * 1000 - 1 - particle.my) * 0.01
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )
      dummy.scale.setScalar(s)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()
      mesh.current!.setMatrixAt(i, dummy.matrix)
      mesh.current!.setColorAt(i, color)
    })
    mesh.current.instanceMatrix.needsUpdate = true
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true
  })

  return (
    <>
      <ambientLight ref={light} intensity={1} />
      <instancedMesh ref={mesh} args={[geo, mat, count]} />
    </>
  )
}

export default function Lab002() {
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      body { animation: lab002Bg 16s infinite; }
      @keyframes lab002Bg {
        0%     { background: radial-gradient(ellipse at center, #720202, #000000); }
        16.66% { background: radial-gradient(ellipse at center, #7F4600, #000000); }
        33.32% { background: radial-gradient(ellipse at center, #7F7500, #000000); }
        49.98% { background: radial-gradient(ellipse at center, #004013, #000000); }
        66.64% { background: radial-gradient(ellipse at center, #00287F, #000000); }
        83.30% { background: radial-gradient(ellipse at center, #391341, #000000); }
        100%   { background: radial-gradient(ellipse at center, #720202, #000000); }
      }
    `
    document.head.appendChild(style)
    return () => { document.head.removeChild(style) }
  }, [])

  return (
    <Canvas>
      <ambientLight intensity={0.1} />
      <directionalLight position={[50, 50, 50]} intensity={20} />
      <directionalLight position={[-50, -50, -50]} intensity={10} />
      <mesh>
        <RainbowText text="Daigo Fujiwara-Smith" position={[0, 1, 0]} />
        <Swarm count={1000} />
      </mesh>
      <OrbitControls target={[0, 0, 0]} />
    </Canvas>
  )
}
