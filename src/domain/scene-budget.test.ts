import { describe, expect, it } from 'vitest'

import { buildDivisorLattice, MAX_DIVISOR_NODES } from './lattice'
import {
  assertSceneBudget,
  MAX_SCENE_COVERS,
  MAX_SCENE_NODES,
  SceneBudgetError,
} from './scene-budget'

describe('assertSceneBudget', () => {
  it('admits the owner-visible redline body', () => {
    const lattice = assertSceneBudget(buildDivisorLattice(278_460))

    expect(lattice.nodes).toHaveLength(144)
    expect(lattice.edges).toHaveLength(480)
  })

  it('admits a sparse seven-dimensional cube by scene complexity', () => {
    const lattice = assertSceneBudget(buildDivisorLattice(510_510))

    expect(lattice.factors).toHaveLength(7)
    expect(lattice.nodes).toHaveLength(128)
    expect(lattice.edges).toHaveLength(448)
  })

  it('refuses the node boundary independently of cover count', () => {
    const lattice = buildDivisorLattice(12_441_600)

    expect(lattice.nodes).toHaveLength(216)
    expect(lattice.edges).toHaveLength(522)
    expect(lattice.edges.length).toBeLessThan(MAX_SCENE_COVERS)
    expect(() => assertSceneBudget(lattice)).toThrow(SceneBudgetError)
    expect(() => assertSceneBudget(lattice)).toThrow(
      /216 nodes and 522 covers.*192 nodes and 640 covers/,
    )
  })

  it('refuses the cover boundary independently of node count', () => {
    const lattice = buildDivisorLattice(360_360)

    expect(lattice.nodes).toHaveLength(MAX_SCENE_NODES)
    expect(lattice.edges).toHaveLength(656)
    expect(() => assertSceneBudget(lattice)).toThrow(SceneBudgetError)
    expect(() => assertSceneBudget(lattice)).toThrow(
      /192 nodes and 656 covers.*192 nodes and 640 covers/,
    )
  })

  it('leaves the larger mathematical construction boundary intact', () => {
    const lattice = buildDivisorLattice(223_092_870)

    expect(lattice.nodes).toHaveLength(MAX_DIVISOR_NODES)
    expect(lattice.edges).toHaveLength(2_304)
    expect(() => assertSceneBudget(lattice)).toThrow(SceneBudgetError)
  })
})
