# upward architecture

> **continuity role:** implemented system model
> **status:** current
> **last verified:** 2026-10-14
> **owns:** components, boundaries, data flow, and important seams that exist now
> **update when:** structural implementation changes

## system context

upward is one static browser application. it has no backend, database, account,
telemetry, or runtime integration. its only browser persistence is a bounded,
integer-only session cabinet.

```text
decimal input
  -> strict input boundary
  -> pure divisor-lattice model
  -> spatial layout dispatch
       -> exact natural 3d layout (0–3 prime directions)
       -> ranked zonotopal projection (4+ prime directions)
  -> react application state
       -> webgl scene
       -> accessible dom readout and divisor rail

held integer session payload
  -> versioned validation
  -> reconstructed held lattices
  -> pure current/held relationship model
       -> stable-order cabinet index
       -> derived front-card selection
       -> full-card pullout drawer
       -> embedded node and edge ids
       -> scene and divisor-rail emphasis
```

## components

| component | path | responsibility | public seam |
|---|---|---|---|
| input boundary | `src/domain/input.ts` | decimal parsing and magnitude bound | `parsePositiveInteger` |
| lattice model | `src/domain/lattice.ts` | factors, divisors, signatures, complements, and cover edges | `buildDivisorLattice` |
| relationship model | `src/domain/relations.ts` | identity, structural twins, oriented divisibility, prime extrusion, and embedded ids | `compareLattices` |
| natural layout | `src/domain/layout.ts` | centered equal-step coordinates and camera extent | `layoutNatural3d` |
| projected layout | `src/domain/projection.ts` | ranked generators, centered projected coordinates, camera extent, and coincidence groups | `layoutRankedZonotopal3d` |
| spatial dispatch | `src/domain/spatial-layout.ts` | select exact natural or named projected geometry | `layoutLattice3d` |
| session adapter | `src/session/held-forms.ts` | schema validation, cap, deduplication, storage reads/writes, and failure isolation | `readHeldForms`, `writeHeldForms` |
| application | `src/app.tsx` | current valid lattice, held integers, inspected relation, input failure, and selection | `App` |
| cabinet view model | `src/cabinet/cabinet-view.ts` | answer-set discovery and deterministic front-card selection without changing held order | `chooseCabinetFront`, `answeringForms` |
| cabinet | `src/cabinet/held-form-cabinet.tsx` | front card, compact index, accessible full-card drawer, and held-form actions | `HeldFormCabinet` |
| scene | `src/scene/lattice-scene.tsx` | three.js projection, camera controls, node/edge rendering | `LatticeScene` |
| scene failure boundary | `src/scene/scene-boundary.tsx` | preserve the dom instrument when webgl fails | `SceneBoundary` |
| visual system | `src/styles.css` | responsive layout, tokens, focus, and scene framing | css classes |

## data flow

1. the form passes a string to `parsePositiveInteger`.
2. `buildDivisorLattice` factorizes the integer and creates all nodes and exact
   covers without importing react or three.js.
3. `layoutLattice3d` retains exact natural coordinates for zero through three
   prime directions and selects the named ranked zonotopal projection thereafter.
4. both layouts center exponent axes, so complementary divisors become spatial
   opposites. the projected layout additionally preserves equal cover length and
   equal positive world-height rise while reporting coincident node centers.
5. only after every step succeeds does `App` replace the last valid lattice.
6. the scene consumes positions and edges; the dom consumes the same lattice for
   input status, details, and keyboard selection.
7. session restoration validates each held integer through the same input and
   divisor-count boundaries, then reconstructs its lattice and spatial layout.
8. `compareLattices` compares each held lattice to the active lattice. after a
   successful unfold, the current answering inspection remains in front or the
   first answer in stable insertion order comes forward. this derived view does
   not reorder session state.
9. only the front relation supplies embedded ids to the scene and divisor rail.
10. holding and releasing write the normalized integer list through the session
   adapter. failed writes leave react's memory-only cabinet intact.

## persistence

the key `upward:held-forms:v1` stores `{ "version": 1, "values": number[] }` in
browser `sessionStorage`. the list contains at most 12 distinct, currently
unfoldable integers in insertion order. it normally survives same-tab reload and
ends with the browsing session, subject to browser session restoration.

factorization, lattice models, relationships, embedded ids, geometry, selected
divisors, front-card selection, drawer state, and other interface state remain
derived or in-memory only. malformed,
wrong-version, blocked, or write-failing storage produces an empty or
memory-only cabinet without interrupting the active lattice.

## external boundaries

npm supplies build dependencies. the built application makes no required runtime
network request. it reads no file, private corpus, environment value, or remote
api. `sessionStorage` is the only runtime browser-state boundary.

## important invariants

- arithmetic and layout truth live under `src/domain/`, not in scene components;
- relationship and embedded-set truth lives in `src/domain/relations.ts`, not in
  cabinet or scene components;
- session storage contains integers only and cannot become mathematical
  authority;
- failed input leaves the last valid sculpture intact;
- the divisor rail remains usable if webgl is unavailable;
- see [`CONTRACTS.md`](../CONTRACTS.md) for normative wording and proof ownership.

## known structural pressure

- three.js and its react renderer produce a first-slice bundle of about 326 kb
  gzipped; code splitting is not yet useful because the scene is the primary use;
- dom labels remain readable but may occlude one another at some orientations;
- the ranked projection reports exact center coincidences but does not yet offer
  exploded views or screen-space label decluttering;

