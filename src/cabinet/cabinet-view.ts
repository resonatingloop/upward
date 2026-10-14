import type { DivisorLattice } from '../domain/lattice'
import type { FormRelation } from '../domain/relations'

export interface HeldFormEntry {
  lattice: DivisorLattice
  relation: FormRelation
}

export function isAnsweringForm(entry: HeldFormEntry): boolean {
  return entry.relation.kind !== 'none'
}

export function answeringForms(
  entries: readonly HeldFormEntry[],
): readonly HeldFormEntry[] {
  return entries.filter(isAnsweringForm)
}

export function chooseCabinetFront(
  entries: readonly HeldFormEntry[],
  inspectedValue: number | null,
  prioritizeAnswers: boolean,
): number | null {
  if (entries.length === 0) {
    return null
  }

  const inspected = entries.find((entry) => entry.lattice.n === inspectedValue)

  if (prioritizeAnswers) {
    if (inspected && isAnsweringForm(inspected)) {
      return inspected.lattice.n
    }

    const firstAnswer = entries.find(isAnsweringForm)
    if (firstAnswer) {
      return firstAnswer.lattice.n
    }
  }

  return inspected?.lattice.n ?? entries[0].lattice.n
}
