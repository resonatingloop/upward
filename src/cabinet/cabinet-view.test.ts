import { describe, expect, it } from 'vitest'

import { buildDivisorLattice } from '../domain/lattice'
import { compareLattices } from '../domain/relations'
import {
  answeringForms,
  chooseCabinetFront,
  type HeldFormEntry,
} from './cabinet-view'

function entriesFor(current: number, held: readonly number[]): readonly HeldFormEntry[] {
  const currentLattice = buildDivisorLattice(current)

  return held.map((value) => {
    const lattice = buildDivisorLattice(value)
    return {
      lattice,
      relation: compareLattices(currentLattice, lattice),
    }
  })
}

describe('cabinet front selection', () => {
  it('brings the third-held fish to the front without reordering the cabinet', () => {
    const entries = entriesFor(153, [348, 174, 306])

    expect(answeringForms(entries).map((entry) => entry.lattice.n)).toEqual([306])
    expect(chooseCabinetFront(entries, 348, true)).toBe(306)
    expect(entries.map((entry) => entry.lattice.n)).toEqual([348, 174, 306])
  })

  it('keeps an inspected answering form when several forms answer', () => {
    const entries = entriesFor(6, [2, 3, 12])

    expect(answeringForms(entries).map((entry) => entry.lattice.n)).toEqual([
      2,
      3,
      12,
    ])
    expect(chooseCabinetFront(entries, 3, true)).toBe(3)
  })

  it('uses stable insertion order when several forms answer and inspection does not', () => {
    const entries = entriesFor(6, [25, 3, 2])

    expect(chooseCabinetFront(entries, 25, true)).toBe(3)
  })

  it('keeps the current inspection when the cabinet is quiet', () => {
    const entries = entriesFor(153, [348, 174])

    expect(answeringForms(entries)).toHaveLength(0)
    expect(chooseCabinetFront(entries, 174, true)).toBe(174)
  })

  it('falls back to the first held form when inspection is absent or stale', () => {
    const entries = entriesFor(153, [348, 174])

    expect(chooseCabinetFront(entries, null, false)).toBe(348)
    expect(chooseCabinetFront(entries, 999, false)).toBe(348)
    expect(chooseCabinetFront([], 348, true)).toBeNull()
  })
})
