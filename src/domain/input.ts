import type { DivisorLattice } from './lattice'

export const MAX_INPUT = 1_000_000_000
export const MAX_NATURAL_DIMENSIONS = 3

export class InputBoundaryError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InputBoundaryError'
  }
}

export function parsePositiveInteger(raw: string): number {
  const normalized = raw.trim()

  if (!/^\d+$/.test(normalized)) {
    throw new InputBoundaryError('enter a positive whole number in decimal form.')
  }

  const value = Number(normalized)

  if (!Number.isSafeInteger(value) || value < 1) {
    throw new InputBoundaryError('the number must be a positive safe integer.')
  }

  if (value > MAX_INPUT) {
    throw new InputBoundaryError(
      `this first instrument is bounded at ${MAX_INPUT.toLocaleString('en-US')}.`,
    )
  }

  return value
}

export function assertNaturalDimension(lattice: DivisorLattice): void {
  if (lattice.factors.length <= MAX_NATURAL_DIMENSIONS) {
    return
  }

  throw new InputBoundaryError(
    `${lattice.n.toLocaleString('en-US')} opens ${lattice.factors.length} prime directions. ` +
      'higher-dimensional projection is not part of this first slice yet.',
  )
}

