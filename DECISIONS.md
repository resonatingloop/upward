# upward decisions

> **continuity role:** historical rationale and supersession
> **status:** append-only
> **last verified:** 2026-10-14
> **owns:** consequential choices another maintainer should not have to re-derive
> **update when:** a decision introduces, clarifies, or supersedes a durable fact

## d-001 — equal-step exponent geometry is the native view

- date: 2026-10-13
- status: accepted
- supersedes: none
- related spec: `specs/001-first-slice.md`

context:

prime magnitudes and prime exponents offer different possible spatial meanings.

decision:

natural geometry gives each increment of a prime exponent the same spatial step.
ascending primes determine labeled axes; descending sorted exponents determine
the unlabeled structural signature.

alternatives considered:

- logarithmic prime weighting, which reveals magnitude but distorts lattice
  morphology;
- force-directed layout, which obscures the arithmetic source of geometry.

consequences:

- numbers such as `348` and `60` visibly share one multiplicative skeleton;
- prime magnitude may return only as a separately named lens.

evidence:

- accepted first-slice discussion and `math-005` / `geo-001` in `CONTRACTS.md`.

## d-002 — client-only react and three.js boundary

- date: 2026-10-13
- status: accepted
- supersedes: none
- related spec: `specs/001-first-slice.md`

context:

the artifact needs a substantial interactive scene plus ordinary form and
selection state, while remaining a small static public application.

decision:

use typescript and react for application state, react three fiber over three.js
for the scene, and keep all mathematical construction in framework-free modules.

alternatives considered:

- imperative three.js, which would require a parallel state bridge for the ui;
- a backend, which the first slice does not need.

consequences:

- scene and dom interaction share one state owner;
- mathematical tests do not require webgl or react.

evidence:

- implemented module boundaries and required validation.

## d-003 — name information loss before projecting it

- date: 2026-10-13
- status: accepted
- supersedes: none
- related spec: `specs/001-first-slice.md`

context:

integers with four or more distinct prime factors have natural exponent spaces
of dimension four or greater.

decision:

the first slice reports those inputs as unsupported. it does not silently use a
force layout or imply that an arbitrary three-dimensional projection is exact.

alternatives considered:

- an immediate deterministic zonotopal projection, deferred until its visual
  and collision behavior can be evaluated as its own slice.

consequences:

- the first slice supports a smaller domain honestly;
- the pure lattice model remains dimension-independent for later projection work.

evidence:

- `geo-002` in `CONTRACTS.md` and the accepted spec.

## d-004 — publish the static artifact through github pages

- date: 2026-10-13
- status: accepted
- supersedes: none
- related authorization: owner request to wire the first public deployment

context:

upward is already a client-only vite application whose complete deployable
output is the generated `dist` directory. it needs a legible public home without
introducing a runtime service or committed build output.

decision:

target the repository project site at `/upward/`. use a github actions workflow
that installs from the lockfile, runs the complete project check, uploads only
`dist`, and deploys through github pages. pin third-party actions to reviewed
commit identifiers while retaining version comments. isolate read-only build
permissions from the later job that receives publication permissions.

alternatives considered:

- committing generated files to a `gh-pages` branch, which duplicates derived
  state and obscures the source-to-artifact path;
- deploying the repository root, which would expose source and documentation
  rather than the production artifact;
- a separate hosting provider, which adds another account boundary before the
  artifact needs one.

consequences:

- a push to `main` can publish after the owner enables github actions as the
  pages source;
- configured intent remains distinct from observed public availability;
- a custom domain would require a later base-path and provider decision.

evidence:

- `.github/workflows/deploy.yml`, the production build, and the `/upward/`
  preview smoke.

## d-005 — held forms are session-scoped mathematical relations

- date: 2026-10-13
- status: accepted
- supersedes: the no-persisted-state portion of `boundary-001`
- related spec: `specs/002-held-forms-cabinet.md`

context:

the first slice can expose one integer at a time. holding `153` while unfolding
`306` reveals a stronger relationship than a bookmark: `306 = 2 × 153`, where
the new prime `2` extrudes the entire divisor lattice of `153` into one complete
face of the larger lattice. structural twins such as `306` and `348` reveal a
different relation through their common exponent signature.

decision:

add a cabinet of at most 12 integers scoped to browser `sessionStorage`. store
only a schema version and integer values; recompute all mathematical facts.
compare each held form with the active form through a pure domain classifier.
name identity, structural twins, divisor embedding, and the narrow prime-
extrusion case explicitly. only one inspected held form may emphasize the scene
at a time.

alternatives considered:

- react memory alone, which would lose an investigation on accidental reload;
- `localStorage`, which would create a durable profile beyond the intended
  session cabinet;
- storing factorization, geometry, or relationships, which would duplicate and
  potentially drift from domain truth;
- comparing every held pair or illuminating several embeddings at once, which
  would turn a small relational instrument into visual soup.

consequences:

- same-tab reload preserves held integers while ordinary session closure ends
  the cabinet subject to browser restoration behavior;
- storage denial or corruption degrades to a memory-only cabinet rather than
  breaking the active lattice;
- structural kinship receives a violet cabinet glow; an inspected embedded form
  receives gold node, edge, label, and divisor-rail emphasis;
- qabbalistic meaning, user annotation, and private research data remain outside
  the public repository and its session schema.

evidence:

- `relation-001`, `relation-002`, `state-001`, and `boundary-002` in
  `CONTRACTS.md`; focused tests and rendered acceptance named by the related spec.

## d-006 — the cabinet separates collection from reading

- date: 2026-10-13
- status: accepted
- supersedes: none
- related spec: `specs/003-cabinet-front-and-drawer.md`

context:

full-size held-form cards preserve the cabinet's specimen character, but a
horizontal row inside the narrow control spine can hide the only form related to
the active integer. making discovery depend on sideways scrolling weakens the
cabinet as a relational instrument.

decision:

preserve held integers in a compact, stable-order index while presenting one
full-size front card as the active reading. after a successful unfold, retain an
inspected answering form or bring forward the first answer in stable insertion
order. expose every full-size card through a native modal drawer that extends
over the field on desktop and rises from the bottom on narrow screens.

alternatives considered:

- automatically scrolling the existing row, which reveals the answer but keeps
  collection and reading entangled;
- reordering held forms by relationship, which makes the persisted sequence
  appear unstable and invents a hierarchy among relation kinds;
- reducing every form to a permanent chip, which removes the cards' useful
  mathematical and visual detail.

consequences:

- an answering form can become immediately visible without mutating session
  order or schema;
- the compact index remains an overview while the front card remains legible;
- opening the cabinet temporarily occupies part of the sculpture field and must
  retain explicit dismissal, focus return, and reduced-motion behavior;
- starter specimens remain a separate invitation rather than becoming cabinet
  contents.

evidence:

- focused front-selection tests and rendered desktop, narrow, keyboard,
  reduced-motion, and no-webgl acceptance named by the related spec.

## d-007 — higher dimensions enter through a ranked zonotopal shadow

- date: 2026-10-14
- status: accepted
- supersedes: d-003's temporary refusal of four-plus-prime inputs; retains its
  requirement to name information loss
- related spec: `specs/004-ranked-zonotopal-projection.md`

context:

the dimension-independent lattice model can describe integers such as
`210 = 2 × 3 × 5 × 7`, but its natural exponent body occupies four dimensions.
the initial refusal protected mathematical honesty while leaving a deliberate
door for a separately named projection.

decision:

retain exact natural coordinates through three prime directions. for four or
more, center every exponent vector and map each canonically ordered prime axis
to an equal-length three-dimensional generator. every generator receives one
common positive world-height component and a golden-angle horizontal bearing.
call the result a **ranked zonotopal projection** and disclose its source-to-
target dimension plus coincident-shadow count in the interface.

canonical generator order is descending maximum exponent, then ascending prime
for ties. prime labels still own their exact edges and colors; prime magnitude
does not weight spatial length.

alternatives considered:

- evenly spaced horizontal bearings, which create forced opposing-axis
  cancellations and visually guaranteed coincidences;
- a generic force layout, which would sever geometry from exponent structure;
- continuing to refuse all higher-dimensional inputs, which preserves honesty
  but leaves the already dimension-independent domain model underused;
- user-editable projectors in the first transition, which would conflate one
  deterministic instrument with a projection laboratory.

consequences:

- cover identity remains exact, every cover has equal length and equal positive
  rank rise, and complements remain antipodal;
- higher-dimensional distance, angle, face incidence, enclosure, and
  injectivity are not claimed;
- projected coincidences are computed and disclosed rather than hidden;
- projected integers use the unchanged integer-only session schema;
- `210` becomes the first public projected specimen while lower-dimensional
  coordinates remain unchanged.

evidence:

- `geo-002` and `geo-003` in `CONTRACTS.md`, focused projection tests, and the
  desktop, narrow, session-reload, complement, fish-face, and no-webgl browser
  acceptance named by the related spec.

