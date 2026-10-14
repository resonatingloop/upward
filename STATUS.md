# upward status

> **continuity role:** operational checkpoint
> **status:** current
> **last verified:** 2026-10-13
> **owns:** verified current state, active work, known gaps, and next useful action
> **update when:** a meaningful stopping point changes any of those facts

## Verified checkpoint

two slices are implemented and verified: a bounded integer becomes a tested
divisor lattice and responsive webgl instrument; a session-scoped cabinet can
hold integers, name their relationship to the active form, and illuminate an
embedded divisor lattice without changing its topology.

verification performed:

```text
npm run typecheck
npm run test
npm run build
manage-project-docs check_docset.py
headless chromium desktop, narrow, interaction, and no-webgl smoke
fresh-profile headless firefox webgl2 smoke
production preview at `/upward/`
```

evidence of success:

```text
32 tests passed; documentation 0 errors/0 warnings; 348 rendered 12 nodes/20 covers;
orbit, zoom, pan, and reset passed; 87/4 reversed; 60 retained (2, 1, 1);
210 failed in place; narrow overflow 0; no browser console errors; no-webgl fallback held.
owner-visible chrome rendered and moved smoothly; fresh firefox 157 acquired webgl2
through llvmpipe and mounted three.js r186 with a live context.
153/306 resolved as prime extrusion ×2 with 6 embedded nodes/7 internal covers;
153 retained complement 2; same-tab reload restored only {version, integer values};
306/348 reported same body; 430 px cabinet overflow 0; no-webgl relation rail held.
pages workflow reviewed; production assets resolved beneath `/upward/` locally.
public custom-domain route returned http 200 from github pages.
```

## Working now

- strict decimal input from `1` through `1,000,000,000`;
- complete divisor lattice generation with a 512-node computation guard;
- exact centered natural geometry for zero through three prime directions;
- orbit, zoom, pan, reset, selected-node detail, complement highlight, and
  keyboard-accessible divisor selection;
- a 12-place session cabinet with hold, inspect, unfold, and release actions;
- pure identity, structural-twin, divisor-embedding, and prime-extrusion
  classification with explicit orientation;
- one-at-a-time embedded node/edge emphasis, structural-kinship glow, and
  equivalent relationship text when webgl is unavailable;
- versioned, integer-only `sessionStorage` with validation and memory fallback;
- responsive desktop and narrow layouts;
- explicit webgl failure boundary;
- framework-independent domain tests;
- sha-pinned github pages workflow gated by the complete project check;
- canonical github pages project base at `/upward/`;
- public custom-domain route at `https://resonatrix.tech/upward/`.

## Incomplete or broken

- some screen-space labels can hide or overlap at a fixed orientation; rotation
  and the divisor rail remain available;
- the production javascript chunk is about 329 kb gzipped and triggers vite's
  500 kb uncompressed chunk warning;
- four-dimensional projection, morphing, all-pairs cabinet comparison, export,
  and broader public-device coverage are deferred;
- an owner-visible firefox profile could not acquire a webgl context while a
  fresh firefox 157 profile on the same machine could; the profile, graphics
  configuration, or driver divergence remains unisolated;
- public-device coverage beyond the locally exercised chrome and fresh firefox
  profiles remains incomplete.

## Active work

- accepted spec: none; `specs/001-first-slice.md` and
  `specs/002-held-forms-cabinet.md` are retired
- current focus: none
- blockers: none

## Next useful action

review and commit the held-form cabinet diff, push it to `main`, observe the
pages workflow, and exercise the fish acceptance at the public custom-domain
route before treating the deployed artifact as updated.

## Re-entry notes

- runtime configuration required: none;
- delivery configuration: github pages through the repository actions workflow;
- persistent state: at most 12 validated integers at
  `sessionStorage['upward:held-forms:v1']`; release them or end the ordinary tab
  session to clear the cabinet, subject to browser session restoration;
- external dependencies: npm packages at build time only;
- recovery warning: preserve the last valid lattice on input failure and never
  silently project four-plus-dimensional exponent space.

