import type { DivisorLattice } from './lattice'

export const MAX_SCENE_NODES = 192
export const MAX_SCENE_COVERS = 640

export class SceneBudgetError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SceneBudgetError'
  }
}

export function assertSceneBudget(lattice: DivisorLattice): DivisorLattice {
  const nodeCount = lattice.nodes.length
  const coverCount = lattice.edges.length

  if (nodeCount <= MAX_SCENE_NODES && coverCount <= MAX_SCENE_COVERS) {
    return lattice
  }

  throw new SceneBudgetError(
    `${lattice.n.toLocaleString('en-US')} exceeds the current rendering budget ` +
      `with ${nodeCount.toLocaleString('en-US')} nodes and ` +
      `${coverCount.toLocaleString('en-US')} covers; this instrument renders at most ` +
      `${MAX_SCENE_NODES.toLocaleString('en-US')} nodes and ` +
      `${MAX_SCENE_COVERS.toLocaleString('en-US')} covers.`,
  )
}
