import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Sagarifuji(props) {
  const { nodes } = useGLTF('/sagarifuji.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve.geometry}
        material={nodes.Curve.material}
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
