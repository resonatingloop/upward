import { type FormEvent, useMemo, useState } from 'react'

import { HeldFormCabinet, type HeldFormEntry } from './cabinet/held-form-cabinet'
import { assertNaturalDimension, parsePositiveInteger } from './domain/input'
import {
  buildDivisorLattice,
  formatFactorization,
  type DivisorLattice,
} from './domain/lattice'
import { layoutNatural3d } from './domain/layout'
import { compareLattices } from './domain/relations'
import { AXIS_COLORS, LatticeScene } from './scene/lattice-scene'
import { SceneBoundary } from './scene/scene-boundary'
import {
  holdForm,
  readHeldForms,
  releaseForm,
  type SessionStorageLike,
  writeHeldForms,
} from './session/held-forms'

const INITIAL_LATTICE = buildDivisorLattice(348)
const SPECIMENS = [348, 60, 72, 64] as const

function signatureText(lattice: DivisorLattice): string {
  return lattice.signature.length === 0 ? '(point)' : `(${lattice.signature.join(', ')})`
}

function browserSessionStorage(): SessionStorageLike | null {
  try {
    return window.sessionStorage
  } catch {
    return null
  }
}

export function App() {
  const [input, setInput] = useState('348')
  const [lattice, setLattice] = useState(INITIAL_LATTICE)
  const [selectedId, setSelectedId] = useState<string | null>('87')
  const [error, setError] = useState<string | null>(null)
  const [resetToken, setResetToken] = useState(0)
  const [heldValues, setHeldValues] = useState<readonly number[]>(() =>
    readHeldForms(browserSessionStorage()),
  )
  const [inspectedHeldValue, setInspectedHeldValue] = useState<number | null>(null)
  const [cabinetMessage, setCabinetMessage] = useState<string | null>(null)

  const layout = useMemo(() => layoutNatural3d(lattice), [lattice])
  const heldEntries = useMemo<readonly HeldFormEntry[]>(
    () =>
      heldValues.map((value) => {
        const heldLattice = buildDivisorLattice(value)
        return {
          lattice: heldLattice,
          relation: compareLattices(lattice, heldLattice),
        }
      }),
    [heldValues, lattice],
  )
  const inspectedEntry =
    heldEntries.find((entry) => entry.lattice.n === inspectedHeldValue) ?? null
  const embeddedNodeIds = useMemo(
    () => new Set(inspectedEntry?.relation.embeddedNodeIds ?? []),
    [inspectedEntry],
  )
  const embeddedEdgeIds = useMemo(
    () => new Set(inspectedEntry?.relation.embeddedEdgeIds ?? []),
    [inspectedEntry],
  )
  const selectedNode = lattice.nodes.find((node) => node.id === selectedId) ?? null
  const complementNode = selectedNode
    ? lattice.nodes.find((node) => node.id === selectedNode.complementId) ?? null
    : null

  function explore(raw: string) {
    setInput(raw)

    try {
      const value = parsePositiveInteger(raw)
      const nextLattice = buildDivisorLattice(value)
      assertNaturalDimension(nextLattice)
      setLattice(nextLattice)
      setSelectedId(null)
      setError(null)
      setResetToken((token) => token + 1)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'the integer could not be unfolded.')
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    explore(input)
  }

  function persistHeldForms(nextValues: readonly number[], message: string) {
    setHeldValues(nextValues)
    const persisted = writeHeldForms(browserSessionStorage(), nextValues)
    setCabinetMessage(persisted ? message : `${message} · memory only`)
  }

  function holdCurrentForm() {
    const result = holdForm(heldValues, lattice.n)

    if (result.status === 'full') {
      setCabinetMessage('cabinet full · release one form')
      return
    }

    setInspectedHeldValue(lattice.n)

    if (result.status === 'duplicate') {
      setCabinetMessage(`${lattice.n} is already held`)
      return
    }

    persistHeldForms(result.values, `held ${lattice.n} · session cabinet`)
  }

  function inspectHeldForm(value: number) {
    setInspectedHeldValue(value)
    setCabinetMessage(`inspecting ${value} against ${lattice.n}`)
  }

  function unfoldHeldForm(value: number) {
    setInspectedHeldValue(value)
    setCabinetMessage(`unfolded ${value} from the cabinet`)
    explore(String(value))
  }

  function releaseHeldForm(value: number) {
    const releasedIndex = heldValues.indexOf(value)
    const nextValues = releaseForm(heldValues, value)

    if (inspectedHeldValue === value) {
      setInspectedHeldValue(
        nextValues[releasedIndex] ?? nextValues[releasedIndex - 1] ?? null,
      )
    }

    persistHeldForms(nextValues, `released ${value}`)
  }

  return (
    <main className="instrument-shell">
      <section className="control-spine" id="controls" aria-labelledby="app-title">
        <header className="masthead">
          <div className="edition-mark" aria-hidden="true">
            <span>u</span>
            <span>01</span>
          </div>
          <div>
            <p className="eyebrow">integer morphology instrument</p>
            <h1 id="app-title">upward</h1>
            <p className="lede">the recurring bodies integers inhabit.</p>
          </div>
        </header>

        <form className="number-form" onSubmit={submit} noValidate>
          <label htmlFor="integer-input">positive integer</label>
          <div className="input-cluster">
            <input
              id="integer-input"
              value={input}
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="off"
              spellCheck="false"
              aria-describedby="input-boundary"
              onChange={(event) => setInput(event.target.value)}
            />
            <button type="submit">unfold</button>
          </div>
          <p id="input-boundary" className="microcopy">
            exact natural geometry · up to three prime directions
          </p>
          <p className={`input-message${error ? ' is-error' : ''}`} aria-live="polite">
            {error ?? `showing the divisor lattice of ${lattice.n.toLocaleString('en-US')}`}
          </p>
        </form>

        <div className="specimen-row" aria-label="example integers">
          <span>specimens</span>
          {SPECIMENS.map((specimen) => (
            <button
              type="button"
              key={specimen}
              className={lattice.n === specimen ? 'is-current' : ''}
              onClick={() => explore(String(specimen))}
            >
              {specimen}
            </button>
          ))}
        </div>

        <HeldFormCabinet
          current={lattice.n}
          entries={heldEntries}
          inspectedValue={inspectedHeldValue}
          message={cabinetMessage}
          onHold={holdCurrentForm}
          onInspect={inspectHeldForm}
          onUnfold={unfoldHeldForm}
          onRelease={releaseHeldForm}
        />

        <section className="structure-card" aria-labelledby="structure-heading">
          <div className="section-heading">
            <h2 id="structure-heading">structure</h2>
            <span>{signatureText(lattice)}</span>
          </div>
          <p className="factorization">
            <span>{lattice.n}</span>
            <span aria-hidden="true">=</span>
            <strong>{formatFactorization(lattice.factors)}</strong>
          </p>
          <dl className="measure-grid">
            <div>
              <dt>nodes</dt>
              <dd>{lattice.nodes.length}</dd>
            </div>
            <div>
              <dt>covers</dt>
              <dd>{lattice.edges.length}</dd>
            </div>
            <div>
              <dt>rank</dt>
              <dd>{lattice.factors.reduce((sum, factor) => sum + factor.exponent, 0)}</dd>
            </div>
          </dl>
        </section>

        <section className="axis-card" aria-labelledby="axis-heading">
          <div className="section-heading">
            <h2 id="axis-heading">prime directions</h2>
            <span>equal step</span>
          </div>
          {lattice.factors.length === 0 ? (
            <p className="axis-empty">one has no prime direction. it remains a point.</p>
          ) : (
            <ol className="axis-list">
              {lattice.factors.map((factor, axis) => (
                <li key={factor.prime} style={{ '--axis-color': AXIS_COLORS[axis] } as React.CSSProperties}>
                  <span className="axis-swatch" aria-hidden="true" />
                  <span>p{axis + 1}</span>
                  <strong>{factor.prime}</strong>
                  <small>0—{factor.exponent}</small>
                </li>
              ))}
            </ol>
          )}
        </section>

        <footer className="spine-footer">
          <span>drag to orbit</span>
          <span>wheel to traverse</span>
          <span>select a divisor</span>
        </footer>
      </section>

      <section className="field" aria-label={`three-dimensional divisor lattice for ${lattice.n}`}>
        <div className="field-rule field-rule-top" aria-hidden="true" />
        <div className="field-rule field-rule-side" aria-hidden="true" />
        <div className="field-header">
          <div>
            <span className="field-index">n / {lattice.n}</span>
            <span className="field-kind">natural exponent space</span>
          </div>
          <button
            type="button"
            className="reset-camera"
            onClick={() => setResetToken((token) => token + 1)}
          >
            reset view
          </button>
        </div>

        <div className="scene-frame">
          <div className="corner corner-nw" aria-hidden="true" />
          <div className="corner corner-ne" aria-hidden="true" />
          <div className="corner corner-sw" aria-hidden="true" />
          <div className="corner corner-se" aria-hidden="true" />
          <SceneBoundary>
            <LatticeScene
              layout={layout}
              selectedId={selectedId}
              complementId={complementNode?.id ?? null}
              embeddedNodeIds={embeddedNodeIds}
              embeddedEdgeIds={embeddedEdgeIds}
              resetToken={resetToken}
              onSelect={setSelectedId}
            />
          </SceneBoundary>
        </div>

        <aside className={`selection-panel${selectedNode ? ' has-selection' : ''}`} aria-live="polite">
          {selectedNode ? (
            <>
              <div className="selection-number">
                <span>selected divisor</span>
                <strong>{selectedNode.value}</strong>
              </div>
              <dl>
                <div>
                  <dt>factorization</dt>
                  <dd>{selectedNode.factorization}</dd>
                </div>
                <div>
                  <dt>coordinate</dt>
                  <dd>({selectedNode.exponents.join(', ') || 'origin'})</dd>
                </div>
                <div>
                  <dt>rank</dt>
                  <dd>{selectedNode.rank}</dd>
                </div>
                <div>
                  <dt>complement</dt>
                  <dd>{complementNode?.value}</dd>
                </div>
              </dl>
              {complementNode && complementNode.id !== selectedNode.id && (
                <button type="button" onClick={() => setSelectedId(complementNode.id)}>
                  cross to {complementNode.value}
                </button>
              )}
            </>
          ) : (
            <>
              <span className="selection-sigil" aria-hidden="true">◇</span>
              <p>select a node to expose its coordinate, rank, and antipodal complement.</p>
            </>
          )}
        </aside>

        <nav className="divisor-rail" aria-label="divisor index">
          <span className="rail-label">divisors / {lattice.nodes.length}</span>
          <div className="rail-values">
            {lattice.nodes.map((node) => {
              const selected = node.id === selectedId
              const complement = node.id === complementNode?.id && !selected
              const embedded = embeddedNodeIds.has(node.id)
              return (
                <button
                  type="button"
                  key={node.id}
                  aria-pressed={selected}
                  aria-label={`${node.value}${embedded ? `, contained in held form ${inspectedHeldValue}` : ''}`}
                  className={`${embedded ? 'is-embedded' : ''}${selected ? ' is-selected' : ''}${complement ? ' is-complement' : ''}`}
                  onClick={() => setSelectedId(node.id)}
                >
                  {node.value}
                </button>
              )
            })}
          </div>
        </nav>
      </section>
    </main>
  )
}

