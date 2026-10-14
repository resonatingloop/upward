import { describe, expect, it } from 'vitest'

import { MAX_INPUT, parsePositiveInteger } from './input'

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

