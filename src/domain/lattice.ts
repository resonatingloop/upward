export const MAX_DIVISOR_NODES = 512

export interface PrimeFactor {
  prime: number
  exponent: number
}

export interface DivisorNode {
  id: string
  value: number
  exponents: readonly number[]
  rank: number
  complementId: string
  factorization: string
}

export interface CoverEdge {
  id: string
  sourceId: string
  targetId: string
  axis: number
  prime: number
}

export interface DivisorLattice {
  n: number
  factors: readonly PrimeFactor[]
  signature: readonly number[]
  nodes: readonly DivisorNode[]
  edges: readonly CoverEdge[]
}

export interface LatticeOptions {
  maxNodes?: number
}

export class LatticeConstructionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'LatticeConstructionError'
  }
}

const SUPERSCRIPT_DIGITS: Record<string, string> = {
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
}

function toSuperscript(value: number): string {
  return String(value)
    .split('')
    .map((digit) => SUPERSCRIPT_DIGITS[digit])
    .join('')
}

export function formatPrimePower(prime: number, exponent: number): string {
  if (exponent === 0) {
    return ''
  }

  return exponent === 1 ? String(prime) : `${prime}${toSuperscript(exponent)}`
}

export function formatFactorization(factors: readonly PrimeFactor[]): string {
  if (factors.length === 0) {
    return '1'
  }

  return factors
    .map(({ prime, exponent }) => formatPrimePower(prime, exponent))
    .join(' × ')
}

export function factorize(n: number): PrimeFactor[] {
  if (!Number.isSafeInteger(n) || n < 1) {
    throw new LatticeConstructionError('factorization requires a positive safe integer.')
  }

  const factors: PrimeFactor[] = []
  let remainder = n

  let exponent = 0
  while (remainder % 2 === 0) {
    remainder /= 2
    exponent += 1
  }
  if (exponent > 0) {
    factors.push({ prime: 2, exponent })
  }

  for (let prime = 3; prime * prime <= remainder; prime += 2) {
    exponent = 0
    while (remainder % prime === 0) {
      remainder /= prime
      exponent += 1
    }
    if (exponent > 0) {
      factors.push({ prime, exponent })
    }
  }

  if (remainder > 1) {
    factors.push({ prime: remainder, exponent: 1 })
  }

  return factors
}

function exponentKey(exponents: readonly number[]): string {
  return exponents.join(':')
}

function divisorCount(factors: readonly PrimeFactor[]): number {
  return factors.reduce((count, factor) => count * (factor.exponent + 1), 1)
}

function formatNodeFactorization(
  exponents: readonly number[],
  factors: readonly PrimeFactor[],
): string {
  const powers = factors
    .map((factor, axis) => formatPrimePower(factor.prime, exponents[axis]))
    .filter(Boolean)

  return powers.length === 0 ? '1' : powers.join(' × ')
}

export function buildDivisorLattice(
  n: number,
  options: LatticeOptions = {},
): DivisorLattice {
  const factors = factorize(n)
  const maxNodes = options.maxNodes ?? MAX_DIVISOR_NODES
  const expectedNodeCount = divisorCount(factors)

  if (expectedNodeCount > maxNodes) {
    throw new LatticeConstructionError(
      `${n.toLocaleString('en-US')} has ${expectedNodeCount.toLocaleString('en-US')} divisors; ` +
        `this instrument currently allows ${maxNodes.toLocaleString('en-US')}.`,
    )
  }

  const nodeSeeds: Array<{ value: number; exponents: number[] }> = []

  function enumerate(axis: number, value: number, exponents: number[]): void {
    if (axis === factors.length) {
      nodeSeeds.push({ value, exponents: [...exponents] })
      return
    }

    const { prime, exponent } = factors[axis]
    let axisValue = 1

    for (let power = 0; power <= exponent; power += 1) {
      exponents.push(power)
      enumerate(axis + 1, value * axisValue, exponents)
      exponents.pop()
      axisValue *= prime
    }
  }

  enumerate(0, 1, [])
  nodeSeeds.sort((left, right) => left.value - right.value)

  const nodes: DivisorNode[] = nodeSeeds.map(({ value, exponents }) => ({
    id: String(value),
    value,
    exponents,
    rank: exponents.reduce((sum, current) => sum + current, 0),
    complementId: String(n / value),
    factorization: formatNodeFactorization(exponents, factors),
  }))

  const nodeByExponent = new Map(
    nodes.map((node) => [exponentKey(node.exponents), node] as const),
  )
  const edges: CoverEdge[] = []

  for (const node of nodes) {
    factors.forEach((factor, axis) => {
      if (node.exponents[axis] >= factor.exponent) {
        return
      }

      const targetExponents = [...node.exponents]
      targetExponents[axis] += 1
      const target = nodeByExponent.get(exponentKey(targetExponents))

      if (!target) {
        throw new LatticeConstructionError('a generated cover relation has no target node.')
      }

      edges.push({
        id: `${node.id}-${target.id}`,
        sourceId: node.id,
        targetId: target.id,
        axis,
        prime: factor.prime,
      })
    })
  }

  return {
    n,
    factors,
    signature: factors.map(({ exponent: power }) => power).sort((a, b) => b - a),
    nodes,
    edges,
  }
}

