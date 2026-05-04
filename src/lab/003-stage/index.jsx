import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import '../lab.css'

export default function Lab003() {
  return (
    <Canvas
      style={{ background: '#0a0a0a' }}
      camera={{ position: [0, -2, 8], fov: 45 }}
    >
      <OrbitControls />
    </Canvas>
  )
}
