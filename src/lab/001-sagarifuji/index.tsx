import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber/webgpu'
import { useRef, useState } from 'react'
import { Center } from '@react-three/drei'
import { easing } from 'maath'

import '../lab.css'
import { Sagarifuji } from './Sagarifuji'
import { Fujiwara } from './Fujiwara'

const rainbowColors = [
  '#999999',
  '#E40303',
  '#FF8C00',
  '#FFE500',
  '#008026',
  '#004DFF',
  '#732682',
]

function RotatingSagarifuji() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.2
    }
  })
  return (
    <mesh ref={ref} position={[0, 0, -1]}>
      <Sagarifuji />
    </mesh>
  )
}

function ClickableFujiwara() {
  const [color, setColor] = useState(rainbowColors[0])

  const handleClick = () => {
    const currentIndex = rainbowColors.indexOf(color ?? '')
    setColor(rainbowColors[(currentIndex + 1) % rainbowColors.length])
  }

  return (
    <mesh
      onClick={handleClick}
      onPointerOver={() => { document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { document.body.style.cursor = 'auto' }}
      position={[0, 2, -2]}
    >
      <Fujiwara color={color} />
    </mesh>
  )
}

function CameraRig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [-1 + (state.pointer.x * state.viewport.width) / 3, (1 + state.pointer.y) / 2, 5.5],
      0.5,
      delta
    )
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Lab001() {
  return (
    <Canvas style={{ background: 'radial-gradient(ellipse at center, #f4f4f4, #bbb)' }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 15]} intensity={2} castShadow />
      <directionalLight position={[-10, -10, -15]} intensity={0.5} castShadow />
      <Center>
        <RotatingSagarifuji />
        <ClickableFujiwara />
      </Center>
      <CameraRig />
    </Canvas>
  )
}
