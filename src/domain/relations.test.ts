import { describe, expect, it } from 'vitest'

import { buildDivisorLattice } from './lattice'
import { compareLattices } from './relations'

describe('compareLattices', () => {
  it('moves the fish into a complete face of 306', () => {
    const relation = compareLattices(
      buildDivisorLattice(306),
      buildDivisorLattice(153),
    )

    expect(relation).toMatchObject({
      kind: 'prime-extrusion',
      orientation: 'held-in-current',
      quotient: 2,
      embeddedNodeIds: ['1', '3', '9', '17', '51', '153'],
    })
    expect(relation.embeddedEdgeIds).toHaveLength(7)
  })

  it('keeps extrusion orientation when the larger form is held', () => {
    expect(
      compareLattices(buildDivisorLattice(153), buildDivisorLattice(306)),
    ).toEqual({
      kind: 'prime-extrusion',
      orientation: 'current-in-held',
      quotient: 2,
      embeddedNodeIds: [],
      embeddedEdgeIds: [],
    })
  })

  it('recognizes structural twins without inventing containment', () => {
    expect(
      compareLattices(buildDivisorLattice(348), buildDivisorLattice(306)),
    ).toEqual({
      kind: 'structural-twin',
      orientation: 'peer',
      quotient: null,
      embeddedNodeIds: [],
      embeddedEdgeIds: [],
    })
  })

  it('distinguishes extension of an existing prime axis', () => {
    const relation = compareLattices(
      buildDivisorLattice(12),
      buildDivisorLattice(6),
    )

    expect(relation.kind).toBe('divisor-embedding')
    expect(relation.orientation).toBe('held-in-current')
    expect(relation.quotient).toBe(2)
    expect(relation.embeddedNodeIds).toEqual(['1', '2', '3', '6'])
  })

  it('recognizes identity before divisibility', () => {
    expect(
      compareLattices(buildDivisorLattice(153), buildDivisorLattice(153)),
    ).toMatchObject({ kind: 'identity', orientation: 'same', quotient: 1 })
  })

  it('leaves unrelated forms unrelated', () => {
    expect(
      compareLattices(buildDivisorLattice(12), buildDivisorLattice(25)),
    ).toMatchObject({ kind: 'none', orientation: 'none', quotient: null })
  })
})
