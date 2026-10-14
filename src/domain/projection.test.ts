import { describe, expect, it } from 'vitest'

import { buildDivisorLattice } from './lattice'
import { layoutNatural3d, NATURAL_STEP } from './layout'
import { layoutRankedZonotopal3d } from './projection'
import { layoutLattice3d } from './spatial-layout'

function roundedPositions(n: number): string[] {
  return layoutRankedZonotopal3d(buildDivisorLattice(n)).nodes
    .map((node) => node.position.map((coordinate) => coordinate.toFixed(9)).join(','))
    .sort()
}

describe('layoutRankedZonotopal3d', () => {
  it('casts the complete four-direction lattice of 210', () => {
    const layout = layoutRankedZonotopal3d(buildDivisorLattice(210))

    expect(layout.kind).toBe('ranked-zonotopal')
    expect(layout.sourceDimensions).toBe(4)
    expect(layout.targetDimensions).toBe(3)
    expect(layout.nodes).toHaveLength(16)
    expect(layout.lattice.edges).toHaveLength(32)
    expect(layout.axes).toHaveLength(4)
    expect(layout.coincidentNodeGroups).toEqual([])
  })

  it('gives every cover one equal-length positive rank rise', () => {
    const layout = layoutRankedZonotopal3d(buildDivisorLattice(210))
    const rises = new Set<string>()

    for (const edge of layout.lattice.edges) {
      const source = layout.positions.get(edge.sourceId)!
      const target = layout.positions.get(edge.targetId)!
      const delta = target.map((coordinate, axis) => coordinate - source[axis])

      expect(Math.hypot(...delta)).toBeCloseTo(NATURAL_STEP)
      expect(delta[1]).toBeGreaterThan(0)
      delta.forEach((coordinate, axis) => {
        expect(coordinate).toBeCloseTo(layout.axes[edge.axis].vector[axis], 12)
      })
      rises.add(delta[1].toFixed(12))
    }

    expect(rises).toHaveLength(1)
  })

  it('centers every complement pair as spatial antipodes', () => {
    const layout = layoutRankedZonotopal3d(buildDivisorLattice(210))

    for (const node of layout.nodes) {
      const complement = layout.positions.get(node.complementId)!
      node.position.forEach((coordinate, axis) => {
        expect(coordinate + complement[axis]).toBeCloseTo(0, 12)
      })
    }
  })

  it('is deterministic and driven by structural exponent order', () => {
    expect(roundedPositions(210)).toEqual(roundedPositions(2 * 11 * 13 * 17))
    expect(roundedPositions(420)).toEqual(roundedPositions(630))
    expect(roundedPositions(420)).toEqual(roundedPositions(420))
  })

  it('dispatches without moving the exact natural room', () => {
    const lattice = buildDivisorLattice(348)
    const natural = layoutNatural3d(lattice)
    const dispatched = layoutLattice3d(lattice)

    expect(dispatched.kind).toBe('natural')
    expect(dispatched.nodes.map((node) => node.position)).toEqual(
      natural.nodes.map((node) => node.position),
    )
    expect(layoutLattice3d(buildDivisorLattice(210)).kind).toBe(
      'ranked-zonotopal',
    )
  })

  it('reaches the nine-direction boundary allowed by the existing guards', () => {
    const layout = layoutLattice3d(buildDivisorLattice(223_092_870))

    expect(layout.kind).toBe('ranked-zonotopal')
    expect(layout.sourceDimensions).toBe(9)
    expect(layout.nodes).toHaveLength(512)
    expect(layout.lattice.edges).toHaveLength(2_304)
  })
})
