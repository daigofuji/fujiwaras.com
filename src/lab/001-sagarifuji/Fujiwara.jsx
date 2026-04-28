import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Fujiwara({ color, ...props }) {
  const { nodes } = useGLTF('/fujiwara.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve.geometry}
        material={nodes.Curve.material}
        position={[-2.1, 1, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={2.77}
      >
        <meshStandardMaterial attach="material" color={color} transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/fujiwara.glb')
