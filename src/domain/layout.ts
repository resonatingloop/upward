import type { DivisorLattice, DivisorNode } from './lattice'

export const NATURAL_STEP = 2.4

export type Position3 = readonly [number, number, number]

export interface PositionedDivisorNode extends DivisorNode {
  position: Position3
}

export interface NaturalLayout {
  lattice: DivisorLattice
  nodes: readonly PositionedDivisorNode[]
  positions: ReadonlyMap<string, Position3>
  cameraDistance: number
}

export class NaturalLayoutError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NaturalLayoutError'
  }
}

export function layoutNatural3d(lattice: DivisorLattice): NaturalLayout {
  if (lattice.factors.length > 3) {
    throw new NaturalLayoutError(
      'natural exponent geometry exceeds three dimensions; choose an explicit projection first.',
    )
  }

  const maxima = lattice.factors.map(({ exponent }) => exponent)
  const nodes = lattice.nodes.map((node): PositionedDivisorNode => {
    const coordinates: [number, number, number] = [0, 0, 0]

    node.exponents.forEach((exponent, axis) => {
      coordinates[axis] = (exponent - maxima[axis] / 2) * NATURAL_STEP
    })

    return { ...node, position: coordinates }
  })

  const positions = new Map(nodes.map((node) => [node.id, node.position] as const))
  const spans: [number, number, number] = [0, 0, 0]
  maxima.forEach((maximum, axis) => {
    spans[axis] = maximum * NATURAL_STEP
  })
  const diagonal = Math.hypot(...spans)

  return {
    lattice,
    nodes,
    positions,
    cameraDistance: Math.max(8, diagonal * 1.55 + 4),
  }
}

