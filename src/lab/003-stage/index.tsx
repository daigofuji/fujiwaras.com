import * as THREE from 'three'
import { useEffect } from 'react'
import { Canvas } from '@react-three/fiber/webgpu'
import { OrbitControls, useGLTF } from '@react-three/drei'
import '../lab.css'

function Hitter() {
  const { scene } = useGLTF('/hitter.glb')

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [scene])

  return <primitive object={scene} scale={0.15} />
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.1} />
    </mesh>
  )
}

useGLTF.preload('/hitter.glb')

export default function Lab003() {
  return (
    <Canvas
      style={{ background: '#0a0a0a' }}
      camera={{ position: [0, 2, 6], fov: 45 }}
      shadows
    >
      <ambientLight intensity={0.8} />
      <spotLight
        position={[5, 8, 3]}
        angle={0.3}
        penumbra={0.8}
        intensity={90}
        color="#ffaa33"
        castShadow
      />
      <spotLight
        position={[-5, 6, 2]}
        angle={0.4}
        penumbra={1}
        intensity={80}
        color="#3377ff"
        castShadow
      />
      <spotLight
        position={[0, 4, -5]}
        angle={0.25}
        penumbra={0.6}
        intensity={80}
        color="#ff2200"
        castShadow
      />
      <Hitter />
      <Floor />
      <OrbitControls maxPolarAngle={Math.PI / 2} />
    </Canvas>
  )
}
