import { describe, expect, it } from 'vitest'

import {
  decodeHeldForms,
  HELD_FORMS_STORAGE_KEY,
  holdForm,
  MAX_HELD_FORMS,
  normalizeHeldForms,
  readHeldForms,
  releaseForm,
  type SessionStorageLike,
  writeHeldForms,
} from './held-forms'

class MemoryStorage implements SessionStorageLike {
  readonly values = new Map<string, string>()

  getItem(key: string): string | null {
    return this.values.get(key) ?? null
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value)
  }
}

describe('held-form session schema', () => {
  it('keeps only distinct currently unfoldable integers', () => {
    expect(
      decodeHeldForms(
        JSON.stringify({
          version: 1,
          values: [153, '306', 210, 348, 153, 0, 1_000_000_001],
        }),
      ),
    ).toEqual([153, 210, 348])
  })

  it('ignores malformed and wrong-version payloads', () => {
    expect(decodeHeldForms('{not json')).toEqual([])
    expect(decodeHeldForms(JSON.stringify({ version: 2, values: [153] }))).toEqual([])
    expect(decodeHeldForms(JSON.stringify({ version: 1, values: '153' }))).toEqual([])
  })

  it('bounds normalized values without silently reordering them', () => {
    const candidates = Array.from({ length: MAX_HELD_FORMS + 1 }, (_, index) => index + 1)
    expect(normalizeHeldForms(candidates)).toEqual(candidates.slice(0, MAX_HELD_FORMS))
  })

  it('writes only the schema version and normalized integer values', () => {
    const storage = new MemoryStorage()

    expect(writeHeldForms(storage, [153, 306, 153])).toBe(true)
    expect(storage.getItem(HELD_FORMS_STORAGE_KEY)).toBe(
      JSON.stringify({ version: 1, values: [153, 306] }),
    )
    expect(readHeldForms(storage)).toEqual([153, 306])
  })

  it('fails open when storage access throws', () => {
    const brokenStorage: SessionStorageLike = {
      getItem() {
        throw new Error('storage blocked')
      },
      setItem() {
        throw new Error('storage blocked')
      },
    }

    expect(readHeldForms(brokenStorage)).toEqual([])
    expect(writeHeldForms(brokenStorage, [153])).toBe(false)
    expect(readHeldForms(null)).toEqual([])
    expect(writeHeldForms(null, [153])).toBe(false)
  })
})

describe('held-form cabinet transitions', () => {
  it('adds once and releases without mutation', () => {
    const original = [153]
    expect(holdForm(original, 306)).toEqual({ values: [153, 306], status: 'added' })
    expect(holdForm(original, 153)).toEqual({ values: [153], status: 'duplicate' })
    expect(releaseForm([153, 306], 153)).toEqual([306])
    expect(original).toEqual([153])
  })

  it('refuses a thirteenth form without eviction', () => {
    const full = Array.from({ length: MAX_HELD_FORMS }, (_, index) => index + 1)
    expect(holdForm(full, 153)).toEqual({ values: full, status: 'full' })
  })
})
