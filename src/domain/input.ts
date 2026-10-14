export const MAX_INPUT = 1_000_000_000

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

