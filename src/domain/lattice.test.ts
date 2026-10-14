import { describe, expect, it } from 'vitest'

import { buildDivisorLattice, formatFactorization } from './lattice'

describe('buildDivisorLattice', () => {
  it('builds the motivating lattice for 348', () => {
    const lattice = buildDivisorLattice(348)

    expect(lattice.factors).toEqual([
      { prime: 2, exponent: 2 },
      { prime: 3, exponent: 1 },
      { prime: 29, exponent: 1 },
    ])
    expect(formatFactorization(lattice.factors)).toBe('2² × 3 × 29')
    expect(lattice.signature).toEqual([2, 1, 1])
    expect(lattice.nodes.map(({ value }) => value)).toEqual([
      1, 2, 3, 4, 6, 12, 29, 58, 87, 116, 174, 348,
    ])
    expect(lattice.edges).toHaveLength(20)

    const eightySeven = lattice.nodes.find(({ value }) => value === 87)
    expect(eightySeven).toMatchObject({
      exponents: [0, 1, 1],
      complementId: '4',
      factorization: '3 × 29',
    })
  })

  it('creates only immediate prime-axis cover relations', () => {
    const lattice = buildDivisorLattice(348)
    const nodes = new Map(lattice.nodes.map((node) => [node.id, node]))

    for (const edge of lattice.edges) {
      const source = nodes.get(edge.sourceId)
      const target = nodes.get(edge.targetId)
      expect(source).toBeDefined()
      expect(target).toBeDefined()
      expect(target!.value / source!.value).toBe(edge.prime)
      expect(
        target!.exponents.map((power, axis) => power - source!.exponents[axis]),
      ).toEqual(source!.exponents.map((_, axis) => (axis === edge.axis ? 1 : 0)))
    }
  })

  it('makes complement an involution', () => {
    const lattice = buildDivisorLattice(348)
    const nodes = new Map(lattice.nodes.map((node) => [node.id, node]))

    for (const node of lattice.nodes) {
      const complement = nodes.get(node.complementId)
      expect(complement).toBeDefined()
      expect(complement!.complementId).toBe(node.id)
      expect(node.value * complement!.value).toBe(348)
    }
  })

  it('recognizes structural twins independently of prime labels', () => {
    expect(buildDivisorLattice(60).signature).toEqual(buildDivisorLattice(348).signature)
    expect(buildDivisorLattice(12).signature).toEqual(buildDivisorLattice(18).signature)
  })

  it('represents one as a single-node lattice', () => {
    const lattice = buildDivisorLattice(1)
    expect(lattice.factors).toEqual([])
    expect(lattice.nodes).toEqual([
      {
        id: '1',
        value: 1,
        exponents: [],
        rank: 0,
        complementId: '1',
        factorization: '1',
      },
    ])
    expect(lattice.edges).toEqual([])
  })

  it('refuses a divisor set above the configured rendering budget', () => {
    expect(() => buildDivisorLattice(348, { maxNodes: 11 })).toThrow(/12 divisors/)
  })
})

