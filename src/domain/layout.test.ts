import { describe, expect, it } from 'vitest'

import { buildDivisorLattice } from './lattice'
import { layoutNatural3d, NATURAL_STEP } from './layout'

describe('layoutNatural3d', () => {
  it('centers complementary divisors as spatial opposites', () => {
    const layout = layoutNatural3d(buildDivisorLattice(348))
    const eightySeven = layout.positions.get('87')!
    const four = layout.positions.get('4')!

    expect(eightySeven.map((coordinate, axis) => coordinate + four[axis])).toEqual([
      0, 0, 0,
    ])
  })

  it('gives every cover edge the same unit length', () => {
    const layout = layoutNatural3d(buildDivisorLattice(348))

    for (const edge of layout.lattice.edges) {
      const source = layout.positions.get(edge.sourceId)!
      const target = layout.positions.get(edge.targetId)!
      const length = Math.hypot(...target.map((coordinate, axis) => coordinate - source[axis]))
      expect(length).toBeCloseTo(NATURAL_STEP)
    }
  })

  it('rejects a silent projection of four-dimensional structure', () => {
    expect(() => layoutNatural3d(buildDivisorLattice(210))).toThrow(
      /exceeds three dimensions/,
    )
  })
})
