import { Html, Line, OrbitControls } from '@react-three/drei'
import { Canvas, type ThreeEvent, useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { PerspectiveCamera } from 'three'

import type { PositionedDivisorNode, NaturalLayout } from '../domain/layout'

export const AXIS_COLORS = ['#78dfca', '#dca16c', '#a995d9'] as const

interface LatticeSceneProps {
  layout: NaturalLayout
  selectedId: string | null
  complementId: string | null
  embeddedNodeIds: ReadonlySet<string>
  embeddedEdgeIds: ReadonlySet<string>
  resetToken: number
  onSelect: (nodeId: string | null) => void
}

interface CameraRigProps {
  distance: number
  resetToken: number
}

function CameraRig({ distance, resetToken }: CameraRigProps) {
  const { camera, invalidate } = useThree()

  useEffect(() => {
    camera.position.set(distance * 0.72, distance * 0.52, distance * -0.46)
    camera.up.set(0, 1, 0)
    camera.near = 0.1
    camera.far = Math.max(400, distance * 12)
    if (camera instanceof PerspectiveCamera) {
      camera.fov = 45
    }
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
    invalidate()
  }, [camera, distance, invalidate, resetToken])

  return null
}

interface LatticeNodeProps {
  node: PositionedDivisorNode
  selected: boolean
  complement: boolean
  embedded: boolean
  onSelect: (nodeId: string) => void
}

function LatticeNode({ node, selected, complement, embedded, onSelect }: LatticeNodeProps) {
  const [hovered, setHovered] = useState(false)
  const active = selected || complement || embedded || hovered
  const color = selected
    ? '#f4b36d'
    : complement
      ? '#78dfca'
      : embedded
        ? '#e7c487'
        : '#d8d0bf'
  const emissive = selected
    ? '#8b421e'
    : complement
      ? '#174d46'
      : embedded
        ? '#6a481f'
        : '#101617'

  function select(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation()
    onSelect(node.id)
  }

  return (
    <group position={node.position}>
      {(selected || complement || embedded) && (
        <mesh scale={selected ? 1.65 : complement ? 1.45 : 1.34}>
          <sphereGeometry args={[0.27, 20, 20]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={selected ? 0.18 : complement ? 0.11 : 0.095}
            wireframe
          />
        </mesh>
      )}
      <mesh
        scale={active ? 1.16 : 1}
        onClick={select}
        onPointerOver={(event) => {
          event.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'default'
        }}
      >
        <sphereGeometry args={[0.27, 28, 28]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={active ? 1.4 : 0.45}
          metalness={0.72}
          roughness={0.24}
        />
      </mesh>
      <Html
        center
        distanceFactor={8.5}
        position={[0, 0.56, 0]}
        style={{ pointerEvents: 'none' }}
        zIndexRange={[20, 0]}
      >
        <span
          className={`node-label${embedded ? ' is-embedded' : ''}${selected ? ' is-selected' : ''}${complement ? ' is-complement' : ''}`}
        >
          {node.value}
        </span>
      </Html>
    </group>
  )
}

export function LatticeScene({
  layout,
  selectedId,
  complementId,
  embeddedNodeIds,
  embeddedEdgeIds,
  resetToken,
  onSelect,
}: LatticeSceneProps) {
  const nodeById = new Map(layout.nodes.map((node) => [node.id, node]))

  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop="demand"
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      fallback={
        <div className="scene-fallback" role="alert">
          <span>scene unavailable</span>
          <p>this browser could not open a webgl context. the lattice facts remain in the divisor rail.</p>
        </div>
      }
      onPointerMissed={() => onSelect(null)}
    >
      <CameraRig distance={layout.cameraDistance} resetToken={resetToken} />
      <fog attach="fog" args={['#080b0c', layout.cameraDistance * 1.6, layout.cameraDistance * 6]} />
      <ambientLight intensity={0.85} />
      <directionalLight position={[8, 11, 6]} intensity={2.4} color="#e8dcc5" />
      <pointLight position={[-7, -4, 8]} intensity={10} color="#3aa997" distance={25} />

      {layout.lattice.edges.map((edge) => {
        const source = nodeById.get(edge.sourceId)
        const target = nodeById.get(edge.targetId)
        if (!source || !target) {
          return null
        }

        const related =
          edge.sourceId === selectedId ||
          edge.targetId === selectedId ||
          edge.sourceId === complementId ||
          edge.targetId === complementId
        const embedded = embeddedEdgeIds.has(edge.id)

        return (
          <Line
            key={edge.id}
            points={[source.position, target.position]}
            color={embedded ? '#e7c487' : AXIS_COLORS[edge.axis]}
            lineWidth={related ? 2.25 : embedded ? 1.9 : 1.05}
            transparent
            opacity={related ? 0.9 : embedded ? 0.78 : 0.27}
          />
        )
      })}

      {layout.nodes.map((node) => (
        <LatticeNode
          key={node.id}
          node={node}
          selected={node.id === selectedId}
          complement={node.id === complementId && node.id !== selectedId}
          embedded={embeddedNodeIds.has(node.id)}
          onSelect={onSelect}
        />
      ))}

      <OrbitControls
        key={`${layout.lattice.n}-${resetToken}`}
        makeDefault
        enableDamping
        dampingFactor={0.075}
        minDistance={Math.max(3.5, layout.cameraDistance * 0.35)}
        maxDistance={layout.cameraDistance * 4}
        rotateSpeed={0.58}
        zoomSpeed={0.8}
        panSpeed={0.55}
      />
    </Canvas>
  )
}

