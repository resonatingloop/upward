# upward architecture

> **continuity role:** implemented system model
> **status:** current
> **last verified:** 2026-10-13
> **owns:** components, boundaries, data flow, and important seams that exist now
> **update when:** structural implementation changes

## system context

upward is one static browser application. it has no backend, database, account,
telemetry, or runtime integration.

```text
decimal input
  -> strict input boundary
  -> pure divisor-lattice model
  -> exact natural 3d layout
  -> react application state
       -> webgl scene
       -> accessible dom readout and divisor rail
```

## components

| component | path | responsibility | public seam |
|---|---|---|---|
| input boundary | `src/domain/input.ts` | decimal parsing, magnitude bound, exact-dimension boundary | `parsePositiveInteger`, `assertNaturalDimension` |
| lattice model | `src/domain/lattice.ts` | factors, divisors, signatures, complements, and cover edges | `buildDivisorLattice` |
| natural layout | `src/domain/layout.ts` | centered equal-step coordinates and camera extent | `layoutNatural3d` |
| application | `src/app.tsx` | current valid lattice, input failure, selection, and visible readout | `App` |
| scene | `src/scene/lattice-scene.tsx` | three.js projection, camera controls, node/edge rendering | `LatticeScene` |
| scene failure boundary | `src/scene/scene-boundary.tsx` | preserve the dom instrument when webgl fails | `SceneBoundary` |
| visual system | `src/styles.css` | responsive layout, tokens, focus, and scene framing | css classes |

## data flow

1. the form passes a string to `parsePositiveInteger`.
2. `buildDivisorLattice` factorizes the integer and creates all nodes and exact
   covers without importing react or three.js.
3. `assertNaturalDimension` refuses four or more prime directions for this slice.
4. `layoutNatural3d` centers each exponent axis. complementary divisors become
   spatial opposites.
5. only after every step succeeds does `App` replace the last valid lattice.
6. the scene consumes positions and edges; the dom consumes the same lattice for
   input status, details, and keyboard selection.

## persistence

none. all state is in react memory and disappears when the page session ends.
future session storage and export require their own accepted specs.

## external boundaries

npm supplies build dependencies. the built application makes no required runtime
network request. it reads no file, private corpus, environment value, or remote
api.

## important invariants

- arithmetic and layout truth live under `src/domain/`, not in scene components;
- failed input leaves the last valid sculpture intact;
- the divisor rail remains usable if webgl is unavailable;
- see [`CONTRACTS.md`](../CONTRACTS.md) for normative wording and proof ownership.

## known structural pressure

- three.js and its react renderer produce a first-slice bundle of about 326 kb
  gzipped; code splitting is not yet useful because the scene is the primary use;
- dom labels remain readable but may occlude one another at some orientations;
- high-dimensional projection must preserve prime-direction meaning without
  claiming lost geometry is exact.

