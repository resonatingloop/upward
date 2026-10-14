import type { DivisorLattice } from './lattice'
import {
  layoutNatural3d,
  MAX_NATURAL_DIMENSIONS,
  type NaturalLayout,
} from './layout'
import {
  layoutRankedZonotopal3d,
  type RankedZonotopalLayout,
} from './projection'

export type SpatialLayout = NaturalLayout | RankedZonotopalLayout

export function layoutLattice3d(lattice: DivisorLattice): SpatialLayout {
  return lattice.factors.length <= MAX_NATURAL_DIMENSIONS
    ? layoutNatural3d(lattice)
    : layoutRankedZonotopal3d(lattice)
}
