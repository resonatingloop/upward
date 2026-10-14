# upward decisions

> **continuity role:** historical rationale and supersession
> **status:** append-only
> **last verified:** 2026-10-13
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

