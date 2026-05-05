import type { JSX } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

type FujiwaraProps = JSX.IntrinsicElements['group'] & { color?: string }

export function Fujiwara({ color, ...props }: FujiwaraProps) {
  const { nodes } = useGLTF('/fujiwara.glb')
  const curve = nodes.Curve as THREE.Mesh
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={curve.geometry}
        material={curve.material}
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
