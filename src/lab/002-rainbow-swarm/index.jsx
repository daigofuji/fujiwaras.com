/* eslint-disable react/prop-types */
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo, useEffect } from 'react'
import { OrbitControls, Text3D, Center } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

import '../lab.css'
import './RainbowMaterial'

const rainbowColors = [
  '#E40303',
  '#FF8C00',
  '#FFE500',
  '#008026',
  '#004DFF',
  '#732682',
]

function RainbowText({ text, position = [0, 0, 0] }) {
  const materialRef = useRef()
  const textRef = useRef()
  const { size } = useThree()

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.time += delta * 0.3
    }
    if (textRef.current) {
      textRef.current.position.z = Math.sin(state.clock.elapsedTime) * 0.4
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
      >
        {text}
        <rainbowMaterial ref={materialRef} metalness={1} roughness={1} />
      </Text3D>
    </Center>
  )
}

function Swarm({ count, dummy = new THREE.Object3D() }) {
  const mesh = useRef()
  const light = useRef()
  const { particles, colorArray } = useMemo(() => {
    const temp = []
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.02 + Math.random() / 200
      const xFactor = -50 + Math.random() * 100
      const yFactor = -50 + Math.random() * 100
      const zFactor = -50 + Math.random() * 100
      const color = new THREE.Color(rainbowColors[Math.floor(Math.random() * rainbowColors.length)])
      color.toArray(arr, i * 3)
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0, color })
    }
    return { particles: temp, colorArray: arr }
  }, [count])

  useFrame((state) => {
    light.current.position.set(
      (-state.mouse.x * state.viewport.width) / 5,
      (-state.mouse.y * state.viewport.height) / 5,
      0
    )
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor, color } = particle
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t)
      particle.mx += (state.mouse.x * 1000 - particle.mx) * 0.01
      particle.my += (state.mouse.y * 1000 - 1 - particle.my) * 0.01
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )
      dummy.scale.setScalar(s)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
      mesh.current.setColorAt(i, color)
    })
    mesh.current.instanceMatrix.needsUpdate = true
    mesh.current.instanceColor.needsUpdate = true
  })

  return (
    <>
      <ambientLight ref={light} intensity={1} />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <sphereGeometry args={[0.3]} />
        <meshStandardMaterial vertexColors metalness={1} roughness={0.5} transparent />
        <instancedBufferAttribute attach="instanceColor" args={[colorArray, 3]} />
      </instancedMesh>
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
    return () => document.head.removeChild(style)
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
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} opacity={0.5} />
      </EffectComposer>
    </Canvas>
  )
}
