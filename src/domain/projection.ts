import type { DivisorLattice } from './lattice'
import {
  NATURAL_STEP,
  type Position3,
  type PositionedDivisorNode,
  type SpatialLayoutBase,
} from './layout'

export const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))
export const RANKED_VERTICAL_RISE = 0.72
export const COINCIDENCE_EPSILON = NATURAL_STEP * 1e-6

export interface ProjectedPrimeAxis {
  axis: number
  prime: number
  canonicalIndex: number
  vector: Position3
}

export interface RankedZonotopalLayout extends SpatialLayoutBase {
  kind: 'ranked-zonotopal'
  axes: readonly ProjectedPrimeAxis[]
}

function canonicalAxisOrder(lattice: DivisorLattice): number[] {
  return lattice.factors
    .map((_, axis) => axis)
    .sort((left, right) => {
      const exponentDifference =
        lattice.factors[right].exponent - lattice.factors[left].exponent

      if (exponentDifference !== 0) {
        return exponentDifference
      }

      return lattice.factors[left].prime - lattice.factors[right].prime
    })
}

function projectedAxes(lattice: DivisorLattice): ProjectedPrimeAxis[] {
  const scale = NATURAL_STEP / Math.hypot(1, RANKED_VERTICAL_RISE)
  const axes: ProjectedPrimeAxis[] = Array.from({ length: lattice.factors.length })

  canonicalAxisOrder(lattice).forEach((axis, canonicalIndex) => {
    const theta = canonicalIndex * GOLDEN_ANGLE
    const factor = lattice.factors[axis]

    axes[axis] = {
      axis,
      prime: factor.prime,
      canonicalIndex,
      vector: [
        Math.cos(theta) * scale,
        RANKED_VERTICAL_RISE * scale,
        Math.sin(theta) * scale,
      ],
    }
  })

  return axes
}

function distance(left: Position3, right: Position3): number {
  return Math.hypot(
    left[0] - right[0],
    left[1] - right[1],
    left[2] - right[2],
  )
}

function coincidentGroups(nodes: readonly PositionedDivisorNode[]): string[][] {
  const parents = nodes.map((_, index) => index)

  function find(index: number): number {
    let root = index
    while (parents[root] !== root) {
      root = parents[root]
    }

    while (parents[index] !== index) {
      const parent = parents[index]
      parents[index] = root
      index = parent
    }

    return root
  }

  function union(left: number, right: number): void {
    const leftRoot = find(left)
    const rightRoot = find(right)
    if (leftRoot !== rightRoot) {
      parents[rightRoot] = leftRoot
    }
  }

  for (let left = 0; left < nodes.length; left += 1) {
    for (let right = left + 1; right < nodes.length; right += 1) {
      if (distance(nodes[left].position, nodes[right].position) <= COINCIDENCE_EPSILON) {
        union(left, right)
      }
    }
  }

  const grouped = new Map<number, string[]>()
  nodes.forEach((node, index) => {
    const root = find(index)
    const group = grouped.get(root) ?? []
    group.push(node.id)
    grouped.set(root, group)
  })

  return [...grouped.values()].filter((group) => group.length > 1)
}

export function layoutRankedZonotopal3d(
  lattice: DivisorLattice,
): RankedZonotopalLayout {
  if (lattice.factors.length < 4) {
    throw new Error('ranked zonotopal projection requires at least four prime directions.')
  }

  const axes = projectedAxes(lattice)
  const nodes = lattice.nodes.map((node): PositionedDivisorNode => {
    const position: [number, number, number] = [0, 0, 0]

    node.exponents.forEach((exponent, axis) => {
      const centeredExponent = exponent - lattice.factors[axis].exponent / 2
      const vector = axes[axis].vector
      position[0] += centeredExponent * vector[0]
      position[1] += centeredExponent * vector[1]
      position[2] += centeredExponent * vector[2]
    })

    return { ...node, position }
  })
  const positions = new Map(nodes.map((node) => [node.id, node.position] as const))
  const radius = nodes.reduce(
    (largest, node) => Math.max(largest, Math.hypot(...node.position)),
    0,
  )

  return {
    lattice,
    nodes,
    positions,
    cameraDistance: Math.max(8, radius * 2.25 + 4),
    kind: 'ranked-zonotopal',
    sourceDimensions: lattice.factors.length,
    targetDimensions: 3,
    coincidentNodeGroups: coincidentGroups(nodes),
    axes,
  }
}
