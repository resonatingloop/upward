# upward

> **continuity role:** operational front door
> **status:** experimental
> **last verified:** 2026-10-13
> **owns:** the shortest successful use and the map to deeper documentation
> **update when:** installation, primary use, maturity, or document authority changes

upward is a public, client-only instrument for encountering the multiplicative
architecture of a positive integer as an interactive three-dimensional divisor
lattice.

## current state

the first experimental slice is usable locally. it accepts bounded positive
integers whose prime factorizations have at most three distinct primes, renders
their exact natural exponent geometry, and exposes each selected divisor's
factorization, coordinate, rank, and complement.

see [`STATUS.md`](STATUS.md) for the verified checkpoint and remaining gaps.

## quickest successful use

prerequisites:

- node.js 20.19 or newer;
- npm;
- a modern browser with webgl for the three-dimensional scene.

from a cold checkout, in order:

```text
npm install
npm run dev
```

open the local url printed by vite. expected evidence of success:

```text
upward opens at 348 with 12 nodes, 20 cover edges, and 87 paired with complement 4.
```

## common use

enter `60` and choose **unfold**. its labels change, but its structural signature
remains `(2, 1, 1)`, the same multiplicative skeleton as `348`.

## configuration and data

- configuration: none at runtime; build behavior lives in `vite.config.ts`.
- secrets: none required. `.env` files are ignored and must not be committed.
- persistent data: none. the first slice does not use browser storage.
- external integrations: none.
- runtime network: none required after the static assets load.

## documentation authority

| document | role | status | owns |
|---|---|---|---|
| `README.md` | operational | current | front door and shortest successful use |
| `STATUS.md` | operational | current | verified checkpoint and next useful action |
| `AGENTS.md` | behavioral | current | agent authorization and completion protocol |
| `PROJECT_BRIEF.md` | durable intent | current | purpose, scope, and non-goals |
| `CONTRACTS.md` | normative | current | mathematical and public-boundary invariants |
| `docs/ARCHITECTURE.md` | operational | current | implemented components and data flow |
| `docs/DEVELOPMENT.md` | operational | current | exact setup and validation procedures |
| `DECISIONS.md` | historical | append-only | accepted rationale and supersession |
| `specs/001-first-slice.md` | planning | retired | the completed first transition and its original boundary |

## known limitations

- the exact natural renderer supports at most three distinct prime directions;
- input is bounded at `1,000,000,000` and 512 divisor nodes;
- screen-space labels can overlap or hide at some camera angles; rotate the
  sculpture or use the keyboard-accessible divisor rail;
- browsers without webgl retain the mathematical readout but cannot show the
  sculpture;
- session holding, structural glow, export, and deployment are not implemented.

## project map

- [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md) — why upward exists;
- [`CONTRACTS.md`](CONTRACTS.md) — what must remain mathematically true;
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — how the current system is shaped;
- [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) — how to run and prove it;
- [`DECISIONS.md`](DECISIONS.md) — why consequential choices were made.
