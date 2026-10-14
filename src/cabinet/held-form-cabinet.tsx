import { useEffect, useRef, useState } from 'react'

import { formatFactorization, type DivisorLattice } from '../domain/lattice'
import { MAX_HELD_FORMS } from '../session/held-forms'
import {
  answeringForms,
  isAnsweringForm,
  type HeldFormEntry,
} from './cabinet-view'

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

interface SpecimenCardProps {
  entry: HeldFormEntry
  index: number
  current: number
  inspected: boolean
  onInspect: () => void
  onUnfold: () => void
  onRelease: () => void
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

function SpecimenCard({
  entry,
  index,
  current,
  inspected,
  onInspect,
  onUnfold,
  onRelease,
}: SpecimenCardProps) {
  const { lattice, relation } = entry
  const copy = relationCopy(entry, current)

  return (
    <article
      className={`cabinet-specimen relation-${relation.kind}${inspected ? ' is-inspected' : ''}`}
      data-held-form={lattice.n}
    >
      <button
        type="button"
        className="cabinet-inspect"
        aria-pressed={inspected}
        aria-label={`inspect held form ${lattice.n}. ${copy.detail}`}
        onClick={onInspect}
      >
        <span className="cabinet-card-index">{String(index + 1).padStart(2, '0')}</span>
        <strong>{lattice.n}</strong>
        <span className="cabinet-signature">{signatureText(lattice)}</span>
        <span className="cabinet-relation">{copy.short}</span>
        <small>{formatFactorization(lattice.factors)}</small>
      </button>
      <div className="cabinet-actions">
        <button type="button" onClick={onUnfold}>
          unfold
        </button>
        <button
          type="button"
          className="cabinet-release"
          aria-label={`release held form ${lattice.n}`}
          title="release form"
          onClick={onRelease}
        >
          ×
        </button>
      </div>
    </article>
  )
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
  const [drawerOpen, setDrawerOpen] = useState(false)
  const drawerRef = useRef<HTMLDialogElement>(null)
  const drawerTriggerRef = useRef<HTMLButtonElement>(null)
  const answers = answeringForms(entries)
  const frontEntry =
    entries.find((entry) => entry.lattice.n === inspectedValue) ?? null
  const frontIndex = frontEntry ? entries.indexOf(frontEntry) : -1

  useEffect(() => {
    const drawer = drawerRef.current
    if (!drawer) {
      return
    }

    if (drawerOpen && !drawer.open) {
      drawer.showModal()
    } else if (!drawerOpen && drawer.open) {
      drawer.close()
    }
  }, [drawerOpen])

  useEffect(() => {
    if (entries.length === 0) {
      setDrawerOpen(false)
    }
  }, [entries.length])

  function closeDrawer() {
    setDrawerOpen(false)
  }

  function handleDrawerClose() {
    setDrawerOpen(false)
    drawerTriggerRef.current?.focus()
  }

  function inspectFromDrawer(value: number) {
    onInspect(value)
    closeDrawer()
  }

  function unfoldFromDrawer(value: number) {
    onUnfold(value)
    closeDrawer()
  }

  return (
    <section className="held-cabinet" aria-labelledby="cabinet-heading">
      <div className="section-heading cabinet-heading">
        <h2 id="cabinet-heading">held forms</h2>
        <span>
          {String(entries.length).padStart(2, '0')} / {MAX_HELD_FORMS}
        </span>
      </div>

      <div className="cabinet-command">
        <p role="status" aria-live="polite">
          {message ?? (entries.length === 0 ? 'the cabinet is listening.' : 'session cabinet · integers only')}
        </p>
        <button type="button" onClick={onHold}>
          hold {current}
          <span aria-hidden="true">＋</span>
        </button>
      </div>

      {frontEntry && (
        <>
          <div className="cabinet-aperture-heading">
            <span>
              {answers.length > 0
                ? `resonance · ${String(answers.length).padStart(2, '0')} answering`
                : 'cabinet quiet'}
            </span>
            <button
              ref={drawerTriggerRef}
              type="button"
              aria-haspopup="dialog"
              onClick={() => setDrawerOpen(true)}
            >
              open cabinet <span aria-hidden="true">⟫</span>
            </button>
          </div>

          <div className="cabinet-front" aria-label="front held form">
            <SpecimenCard
              entry={frontEntry}
              index={frontIndex}
              current={current}
              inspected
              onInspect={() => onInspect(frontEntry.lattice.n)}
              onUnfold={() => onUnfold(frontEntry.lattice.n)}
              onRelease={() => onRelease(frontEntry.lattice.n)}
            />
          </div>

          <nav className="cabinet-index-rail" aria-label="held form index">
            <ol>
              {entries.map((entry, index) => {
                const copy = relationCopy(entry, current)
                const inspected = inspectedValue === entry.lattice.n
                const answering = isAnsweringForm(entry)

                return (
                  <li key={entry.lattice.n}>
                    <button
                      type="button"
                      className={`relation-${entry.relation.kind}${answering ? ' is-answering' : ''}`}
                      aria-pressed={inspected}
                      aria-label={`bring held form ${entry.lattice.n} to front. ${copy.detail}`}
                      title={copy.short}
                      onClick={() => onInspect(entry.lattice.n)}
                    >
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <strong>{entry.lattice.n}</strong>
                      <i aria-hidden="true">{answering ? '↟' : '·'}</i>
                    </button>
                  </li>
                )
              })}
            </ol>
          </nav>
        </>
      )}

      <dialog
        ref={drawerRef}
        className="cabinet-drawer"
        aria-labelledby="cabinet-drawer-heading"
        onCancel={(event) => {
          event.preventDefault()
          closeDrawer()
        }}
        onClose={handleDrawerClose}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.preventDefault()
            closeDrawer()
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeDrawer()
          }
        }}
      >
        <div className="cabinet-drawer-surface">
          <header>
            <div>
              <p>session cabinet / {String(entries.length).padStart(2, '0')}</p>
              <h3 id="cabinet-drawer-heading">specimen drawer</h3>
            </div>
            <button type="button" className="cabinet-drawer-close" onClick={closeDrawer}>
              close <span aria-hidden="true">×</span>
            </button>
          </header>

          <div className="cabinet-drawer-grid" role="list" aria-label="all held forms">
            {entries.map((entry, index) => (
              <div key={entry.lattice.n} role="listitem">
                <SpecimenCard
                  entry={entry}
                  index={index}
                  current={current}
                  inspected={inspectedValue === entry.lattice.n}
                  onInspect={() => inspectFromDrawer(entry.lattice.n)}
                  onUnfold={() => unfoldFromDrawer(entry.lattice.n)}
                  onRelease={() => onRelease(entry.lattice.n)}
                />
              </div>
            ))}
          </div>
        </div>
      </dialog>
    </section>
  )
}
