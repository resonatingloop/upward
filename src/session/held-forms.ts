import { assertNaturalDimension, parsePositiveInteger } from '../domain/input'
import { buildDivisorLattice } from '../domain/lattice'

export const HELD_FORMS_STORAGE_KEY = 'upward:held-forms:v1'
export const HELD_FORMS_SCHEMA_VERSION = 1
export const MAX_HELD_FORMS = 12

export interface SessionStorageLike {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
}

export interface HoldResult {
  values: readonly number[]
  status: 'added' | 'duplicate' | 'full'
}

function isUnfoldableInteger(value: unknown): value is number {
  if (typeof value !== 'number') {
    return false
  }

  try {
    const parsed = parsePositiveInteger(String(value))
    const lattice = buildDivisorLattice(parsed)
    assertNaturalDimension(lattice)
    return true
  } catch {
    return false
  }
}

export function normalizeHeldForms(values: readonly unknown[]): number[] {
  const normalized: number[] = []
  const seen = new Set<number>()

  for (const value of values) {
    if (!isUnfoldableInteger(value) || seen.has(value)) {
      continue
    }

    normalized.push(value)
    seen.add(value)

    if (normalized.length === MAX_HELD_FORMS) {
      break
    }
  }

  return normalized
}

export function decodeHeldForms(raw: string | null): number[] {
  if (raw === null) {
    return []
  }

  try {
    const candidate: unknown = JSON.parse(raw)

    if (
      typeof candidate !== 'object' ||
      candidate === null ||
      !('version' in candidate) ||
      candidate.version !== HELD_FORMS_SCHEMA_VERSION ||
      !('values' in candidate) ||
      !Array.isArray(candidate.values)
    ) {
      return []
    }

    return normalizeHeldForms(candidate.values)
  } catch {
    return []
  }
}

export function readHeldForms(storage: SessionStorageLike | null): number[] {
  if (storage === null) {
    return []
  }

  try {
    return decodeHeldForms(storage.getItem(HELD_FORMS_STORAGE_KEY))
  } catch {
    return []
  }
}

export function writeHeldForms(
  storage: SessionStorageLike | null,
  values: readonly number[],
): boolean {
  if (storage === null) {
    return false
  }

  try {
    storage.setItem(
      HELD_FORMS_STORAGE_KEY,
      JSON.stringify({
        version: HELD_FORMS_SCHEMA_VERSION,
        values: normalizeHeldForms(values),
      }),
    )
    return true
  } catch {
    return false
  }
}

export function holdForm(values: readonly number[], value: number): HoldResult {
  if (values.includes(value)) {
    return { values: [...values], status: 'duplicate' }
  }

  if (values.length >= MAX_HELD_FORMS) {
    return { values: [...values], status: 'full' }
  }

  return { values: [...values, value], status: 'added' }
}

export function releaseForm(values: readonly number[], value: number): number[] {
  return values.filter((candidate) => candidate !== value)
}
