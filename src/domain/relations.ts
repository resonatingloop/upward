import { factorize, type DivisorLattice } from './lattice'

export type FormRelationKind =
  | 'identity'
  | 'structural-twin'
  | 'prime-extrusion'
  | 'divisor-embedding'
  | 'none'

export type FormRelationOrientation =
  | 'same'
  | 'peer'
  | 'held-in-current'
  | 'current-in-held'
  | 'none'

export interface FormRelation {
  kind: FormRelationKind
  orientation: FormRelationOrientation
  quotient: number | null
  embeddedNodeIds: readonly string[]
  embeddedEdgeIds: readonly string[]
}

function signaturesMatch(left: DivisorLattice, right: DivisorLattice): boolean {
  return (
    left.signature.length === right.signature.length &&
    left.signature.every((exponent, index) => exponent === right.signature[index])
  )
}

function isNewPrimeStep(smaller: number, quotient: number): boolean {
  const quotientFactors = factorize(quotient)
  return (
    quotientFactors.length === 1 &&
    quotientFactors[0].exponent === 1 &&
    smaller % quotientFactors[0].prime !== 0
  )
}

function embeddedFacts(
  current: DivisorLattice,
  held: DivisorLattice,
): Pick<FormRelation, 'embeddedNodeIds' | 'embeddedEdgeIds'> {
  if (current.n % held.n !== 0) {
    return { embeddedNodeIds: [], embeddedEdgeIds: [] }
  }

  const embeddedNodeIds = current.nodes
    .filter((node) => held.n % node.value === 0)
    .map((node) => node.id)
  const nodeIds = new Set(embeddedNodeIds)
  const embeddedEdgeIds = current.edges
    .filter((edge) => nodeIds.has(edge.sourceId) && nodeIds.has(edge.targetId))
    .map((edge) => edge.id)

  return { embeddedNodeIds, embeddedEdgeIds }
}

export function compareLattices(
  current: DivisorLattice,
  held: DivisorLattice,
): FormRelation {
  if (current.n === held.n) {
    return {
      kind: 'identity',
      orientation: 'same',
      quotient: 1,
      embeddedNodeIds: [],
      embeddedEdgeIds: [],
    }
  }

  if (signaturesMatch(current, held)) {
    return {
      kind: 'structural-twin',
      orientation: 'peer',
      quotient: null,
      embeddedNodeIds: [],
      embeddedEdgeIds: [],
    }
  }

  const heldFitsCurrent = current.n % held.n === 0
  const currentFitsHeld = held.n % current.n === 0

  if (heldFitsCurrent || currentFitsHeld) {
    const smaller = heldFitsCurrent ? held.n : current.n
    const larger = heldFitsCurrent ? current.n : held.n
    const quotient = larger / smaller

    return {
      kind: isNewPrimeStep(smaller, quotient)
        ? 'prime-extrusion'
        : 'divisor-embedding',
      orientation: heldFitsCurrent ? 'held-in-current' : 'current-in-held',
      quotient,
      ...embeddedFacts(current, held),
    }
  }

  return {
    kind: 'none',
    orientation: 'none',
    quotient: null,
    embeddedNodeIds: [],
    embeddedEdgeIds: [],
  }
}
