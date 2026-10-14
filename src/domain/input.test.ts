import { describe, expect, it } from 'vitest'

import { assertNaturalDimension, MAX_INPUT, parsePositiveInteger } from './input'
import { buildDivisorLattice } from './lattice'

describe('parsePositiveInteger', () => {
  it('accepts a bounded decimal integer', () => {
    expect(parsePositiveInteger(' 348 ')).toBe(348)
  })

  it.each(['', '0', '-2', '3.48', '1e3', 'twelve'])('rejects %j', (raw) => {
    expect(() => parsePositiveInteger(raw)).toThrow()
  })

  it('rejects values above the first-slice bound', () => {
    expect(() => parsePositiveInteger(String(MAX_INPUT + 1))).toThrow(/bounded/)
  })
})

describe('assertNaturalDimension', () => {
  it('accepts up to three distinct prime directions', () => {
    expect(() => assertNaturalDimension(buildDivisorLattice(348))).not.toThrow()
  })

  it('names the unsupported higher-dimensional boundary', () => {
    expect(() => assertNaturalDimension(buildDivisorLattice(210))).toThrow(
      /4 prime directions/,
    )
  })
})

