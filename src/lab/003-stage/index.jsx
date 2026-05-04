import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import '../lab.css'

function Hitter() {
  const { scene } = useGLTF('/hitter.glb')
  return <primitive object={scene} />
}

useGLTF.preload('/hitter.glb')

export default function Lab003() {
  return (
    <Canvas
      style={{ background: '#0a0a0a' }}
      camera={{ position: [0, -2, 8], fov: 45 }}
    >
      <ambientLight intensity={1} />
      <Hitter />
      <OrbitControls />
    </Canvas>
  )
}
