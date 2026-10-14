import { formatFactorization, type DivisorLattice } from '../domain/lattice'
import type { FormRelation } from '../domain/relations'
import { MAX_HELD_FORMS } from '../session/held-forms'

export interface HeldFormEntry {
  lattice: DivisorLattice
  relation: FormRelation
}

interface HeldFormCabinetProps {
  current: number
  entries: readonly HeldFormEntry[]
  inspectedValue: number | null
  message: string | null
  onHold: () => void
  onInspect: (value: number) => void
  onUnfold: (value: number) => void
  onRelease: (value: number) => void
}

interface RelationCopy {
  short: string
  detail: string
}

function signatureText(lattice: DivisorLattice): string {
  return lattice.signature.length === 0 ? '(point)' : `(${lattice.signature.join(', ')})`
}

function relationCopy(entry: HeldFormEntry, current: number): RelationCopy {
  const { lattice, relation } = entry

  switch (relation.kind) {
    case 'identity':
      return {
        short: 'current form',
        detail: `${lattice.n} is currently unfolded.`,
      }
    case 'structural-twin':
      return {
        short: 'same body',
        detail: `${lattice.n} and ${current} share structural signature ${signatureText(lattice)}.`,
      }
    case 'prime-extrusion':
      return relation.orientation === 'held-in-current'
        ? {
            short: `face · ×${relation.quotient}`,
            detail: `${lattice.n} is a complete face of ${current}, extruded along the new prime direction ${relation.quotient}.`,
          }
        : {
            short: `contains face · ×${relation.quotient}`,
            detail: `${lattice.n} contains ${current} as a complete face along the new prime direction ${relation.quotient}.`,
          }
    case 'divisor-embedding':
      return relation.orientation === 'held-in-current'
        ? {
            short: `nested · ×${relation.quotient}`,
            detail: `the divisor lattice of ${lattice.n} is contained in ${current} with quotient ${relation.quotient}.`,
          }
        : {
            short: `contains · ×${relation.quotient}`,
            detail: `the divisor lattice of ${lattice.n} contains ${current} with quotient ${relation.quotient}.`,
          }
    case 'none':
      return {
        short: 'no direct relation',
        detail: `${lattice.n} has no identity, structural-twin, or divisibility relation to ${current}.`,
      }
  }
}

export function HeldFormCabinet({
  current,
  entries,
  inspectedValue,
  message,
  onHold,
  onInspect,
  onUnfold,
  onRelease,
}: HeldFormCabinetProps) {
  return (
    <section className="held-cabinet" aria-labelledby="cabinet-heading">
      <div className="section-heading cabinet-heading">
        <h2 id="cabinet-heading">held forms</h2>
        <span>
          {String(entries.length).padStart(2, '0')} / {MAX_HELD_FORMS}
        </span>
      </div>

      <div className="cabinet-command">
        <p>session cabinet · integers only</p>
        <button type="button" onClick={onHold}>
          hold {current}
          <span aria-hidden="true">＋</span>
        </button>
      </div>

      <p className="cabinet-message" role="status" aria-live="polite">
        {message ?? (entries.length === 0 ? 'the cabinet is listening.' : 'inspect a form to expose its relation.')}
      </p>

      {entries.length > 0 && (
        <ol className="cabinet-list" aria-label="held integer forms">
          {entries.map((entry, index) => {
            const { lattice, relation } = entry
            const copy = relationCopy(entry, current)
            const inspected = inspectedValue === lattice.n

            return (
              <li
                key={lattice.n}
                className={`cabinet-specimen relation-${relation.kind}${inspected ? ' is-inspected' : ''}`}
              >
                <button
                  type="button"
                  className="cabinet-inspect"
                  aria-pressed={inspected}
                  aria-label={`inspect held form ${lattice.n}. ${copy.detail}`}
                  onClick={() => onInspect(lattice.n)}
                >
                  <span className="cabinet-index">{String(index + 1).padStart(2, '0')}</span>
                  <strong>{lattice.n}</strong>
                  <span className="cabinet-signature">{signatureText(lattice)}</span>
                  <span className="cabinet-relation">{copy.short}</span>
                  <small>{formatFactorization(lattice.factors)}</small>
                </button>
                <div className="cabinet-actions">
                  <button type="button" onClick={() => onUnfold(lattice.n)}>
                    unfold
                  </button>
                  <button
                    type="button"
                    className="cabinet-release"
                    aria-label={`release held form ${lattice.n}`}
                    title="release form"
                    onClick={() => onRelease(lattice.n)}
                  >
                    ×
                  </button>
                </div>
              </li>
            )
          })}
        </ol>
      )}
    </section>
  )
}
