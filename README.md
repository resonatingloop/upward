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

the first experimental slice is usable locally and wired for github pages. it
accepts bounded positive integers whose prime factorizations have at most three
distinct primes, renders their exact natural exponent geometry, and exposes each
selected divisor's factorization, coordinate, rank, and complement. a
session-scoped cabinet can hold up to 12 integers, recognize structural twins,
and illuminate a held divisor lattice when it is embedded in the active form.
the cabinet keeps its insertion order in a compact index, brings an answering
form to one full-size front card, and opens every full card in a pullout drawer.

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

for the relational circuit, unfold `153`, choose **hold 153**, then unfold `306`.
the cabinet identifies a new-prime extrusion by `2`: the six nodes and seven
internal covers of `153` become one illuminated face of the complete 12-node,
20-cover lattice of `306`.

the resting cabinet shows one full-size front card. its index remains in stable
held order even when another form comes forward to answer the active integer.
choose **open cabinet** to extend the complete full-card drawer over the field;
on narrow screens the extension rises from the bottom.

## publication

the public artifact is available at
[`https://resonatrix.tech/upward/`](https://resonatrix.tech/upward/). github pages
serves the generated application beneath `/upward/`.

the repository workflow installs from the lockfile, runs the complete project
check, and uploads only the generated `dist` directory. configured delivery and
observed public availability remain separate facts; see `STATUS.md` for the last
verified observation.

## configuration and data

- configuration: none at runtime; build behavior lives in `vite.config.ts`,
  which explicitly disables environment-file loading.
- secrets: none required. `.env` files are ignored and must not be committed.
- persistent data: at most 12 validated integers in versioned browser
  `sessionStorage`; no derived mathematics, annotations, or durable profile.
- build-time delivery: github actions and github pages; neither is used at runtime.
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
| `specs/002-held-forms-cabinet.md` | planning | retired | completed session cabinet and relational comparison transition |
| `specs/003-cabinet-front-and-drawer.md` | planning | retired | completed front-card and pullout-drawer transition |

## known limitations

- the exact natural renderer supports at most three distinct prime directions;
- input is bounded at `1,000,000,000` and 512 divisor nodes;
- screen-space labels can overlap or hide at some camera angles; rotate the
  sculpture or use the keyboard-accessible divisor rail;
- browsers without webgl retain the mathematical readout but cannot show the
  sculpture;
- morphing, all-pairs cabinet comparison, and export are not implemented;
- the public route is live, but broad public-device coverage remains incomplete.

## project map

- [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md) — why upward exists;
- [`CONTRACTS.md`](CONTRACTS.md) — what must remain mathematically true;
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — how the current system is shaped;
- [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) — how to run and prove it;
- [`DECISIONS.md`](DECISIONS.md) — why consequential choices were made.
