# upward 🪩

upward is an interactive instrument for exploring the hidden structure of integers.
It turns numbers into navigable divisor bodies: exact lattices when the structure fits natural exponent space, and ranked zonotopal projections when the form exceeds three prime directions.
Or, less formally:
upward is a zonotopal nightclub for projected hypercubes.
With it, you can:
- unfold a positive integer into its divisor lattice
- compare integers by structural signature
- detect when one number appears as a face or nested body within another
- project higher-dimensional multiplicative forms into view
- inspect complements, ranks, and prime-direction structure
The result is part mathematical instrument, part curiosity cabinet: a way to see the recurring bodies integers inhabit.

---

> **continuity role:** operational front door
> **status:** experimental
> **last verified:** 2026-10-14
> **owns:** the shortest successful use and the map to deeper documentation
> **update when:** installation, primary use, maturity, or document authority changes

upward is a public, client-only instrument for encountering the multiplicative
architecture of a positive integer as an interactive three-dimensional divisor
lattice.

## current state

the experimental instrument is usable locally and wired for github pages. it
renders bounded integers with up to three distinct primes in exact natural
exponent geometry, then casts higher-dimensional exponent bodies through an
explicitly named ranked zonotopal projection. every selected divisor retains
its exact factorization, coordinate, rank, and complement. a session-scoped
cabinet can hold up to 12 integers, recognize structural twins, and illuminate a
held divisor lattice when it is embedded in the active form. the cabinet keeps
its insertion order in a compact index, brings an answering form to one full-
size front card, and opens every full card in a pullout drawer.

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

choose specimen `210` to enter the ranked projection: its four prime directions
become a deterministic `4→3` zonotopal shadow with 16 divisors, 32 covers, exact
rank rise, antipodal complements, and an explicit information-loss warrant.

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
| `specs/004-ranked-zonotopal-projection.md` | planning | retired | completed named-projection transition for four-plus-dimensional lattices |

## known limitations

- exact natural coordinates stop at three distinct prime directions; higher
  dimensions use the disclosed ranked zonotopal projection;
- input is bounded at `1,000,000,000` and 512 divisor nodes;
- screen-space labels can overlap or hide at some camera angles; rotate the
  sculpture or use the keyboard-accessible divisor rail;
- browsers without webgl retain the mathematical readout but cannot show the
  sculpture;
- editable projectors, exploded coincident shadows, morphing, all-pairs cabinet
  comparison, and export are not implemented;
- the public route is live, but broad public-device coverage remains incomplete.

## project map

- [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md) — why upward exists;
- [`CONTRACTS.md`](CONTRACTS.md) — what must remain mathematically true;
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — how the current system is shaped;
- [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) — how to run and prove it;
- [`DECISIONS.md`](DECISIONS.md) — why consequential choices were made.
