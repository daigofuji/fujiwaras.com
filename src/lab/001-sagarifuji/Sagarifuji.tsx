import type { JSX } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

export function Sagarifuji(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/sagarifuji.glb')
  const curve = nodes.Curve as THREE.Mesh
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={curve.geometry}
        material={curve.material}
        position={[-2.19, -0.7, -0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={150}
      >
        <meshStandardMaterial attach="material" color="#fefefe" transparent opacity={0.95} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/sagarifuji.glb')
