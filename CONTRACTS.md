# upward contracts

> **continuity role:** normative invariants
> **status:** current
> **last verified:** 2026-10-14
> **owns:** confirmed promises implementation must not drift from casually
> **update when:** an authorized decision changes an invariant or its proof

changing a contract requires an explicit decision. a failing implementation is
not, by itself, authorization to weaken the contract.

## sources of truth

| fact | owner | proof or inventory |
|---|---|---|
| factorization and lattice structure | `src/domain/lattice.ts` | `src/domain/lattice.test.ts` |
| relationships and embedded lattice facts | `src/domain/relations.ts` | `src/domain/relations.test.ts` |
| natural three-dimensional position | `src/domain/layout.ts` | `src/domain/layout.test.ts` |
| ranked higher-dimensional projection | `src/domain/projection.ts`, `src/domain/spatial-layout.ts` | `src/domain/projection.test.ts` |
| held-form session schema | `src/session/held-forms.ts` | `src/session/held-forms.test.ts` |
| scene, cabinet, and visible details | `src/app.tsx`, `src/cabinet/cabinet-view.ts`, `src/cabinet/held-form-cabinet.tsx`, `src/scene/lattice-scene.tsx` | focused cabinet tests, production build, and browser smoke |
| supported input boundary | `src/domain/input.ts` | `src/domain/input.test.ts` |
| static delivery intent | `.github/workflows/deploy.yml`, `vite.config.ts` | workflow review, production build, subpath smoke |

## invariants

| id | claim | representation owner | proof |
|---|---|---|---|
| `math-001` | the prime factors reconstruct the entered integer exactly. | factorization model | factorization tests |
| `math-002` | each positive divisor appears exactly once with one exponent vector. | lattice model | divisor enumeration tests |
| `math-003` | an edge exists exactly when one exponent increases by one along one prime axis. | cover-relation model | edge tests and count identities |
| `math-004` | the complement of `d` is `n / d`, with exponent vector `a - e`. | node model | complement involution tests |
| `math-005` | structural identity is the descending sorted multiset of prime exponents. | lattice signature | structural-twin tests |
| `relation-001` | a prime extrusion exists exactly when the smaller integer divides the larger, the quotient is prime, and that prime does not divide the smaller integer. | relationship model | relationship classifier tests |
| `relation-002` | when a held integer divides the current integer, its embedded node set contains exactly the current divisors of the held integer and its embedded edge set contains exactly the covers internal to that set. | relationship model | fish-face and axis-extension tests |
| `geo-001` | one to three prime directions use centered, equal-step natural exponent coordinates. | natural layout | layout tests |
| `geo-002` | four or more prime directions use the named deterministic ranked zonotopal projection: exact covers retain equal length and positive equal world-height rise, complements remain antipodal, and higher-dimensional incidence is explicitly reported as projected. | projected layout and ui | projection tests and 210 browser smoke |
| `geo-003` | projected node-center coincidences are domain metadata and their group count is disclosed in the interface; the projection never presents itself as injective without proof. | projected layout and ui | coincidence tests, visible warrant, and browser smoke |
| `state-001` | held forms persist only as a versioned, bounded, validated list of integers in `sessionStorage`; unavailable or malformed storage leaves a working memory-only cabinet. | session adapter | schema, cap, and failure tests plus reload smoke |
| `boundary-001` | superseded by `boundary-002`; the retired first slice performed no runtime network request and persisted no user state. | historical first-slice boundary | retired spec and supersession record |
| `boundary-002` | the application makes no required runtime network request; browser persistence is limited to the integer-only held-form session schema. | application and session boundary | source review, payload inspection, and browser network review |
| `delivery-001` | the pages workflow validates locked source and uploads only the generated `dist` directory. | deployment workflow | workflow review and local production build |

## interfaces and boundaries

- the domain model produces renderer-independent nodes, exponent vectors, and
  cover edges.
- the relationship model consumes complete lattices and produces comparison and
  embedded-set facts without browser, react, three.js, or webgl imports.
- the scene consumes the domain model; it must not recompute mathematical truth.
- the session adapter owns browser-payload validation; application and scene
  code must not treat stored derived facts as authority.
- the public application does not read local corpora or private repositories.
- future export may expose neutral lattice facts only after an accepted spec.
- configured delivery targets github pages at `/upward/`; live provider state is
  external evidence and must not be inferred from the repository.

## data and schema

values are exact javascript integers in the documented input range. node
identity is the divisor's decimal string; exponent vectors remain ordered by
ascending prime.

the sole browser-persisted schema uses key `upward:held-forms:v1` and payload:

```json
{
  "version": 1,
  "values": [153, 306]
}
```

`values` contains at most 12 unique integers in stable insertion order. every
value must remain unfoldable under the current magnitude and divisor-count
boundaries. factorization, signatures, relations, embedded ids, geometry,
selection, and interface state are recomputed and never stored.

## lifecycle and failure semantics

invalid, oversized, or over-budget inputs produce an inline error and leave the
last valid lattice intact. renderer failure must not be represented as
mathematical success. invalid or unavailable session storage must not prevent
the default lattice or a memory-only cabinet from working.

## privacy and secrets

the application and pages workflow require no secret. `.env` files are ignored
and must never be committed. the application has no telemetry, account, durable
profile, user upload, import, or backend boundary. held integers remain scoped
to browser session storage rather than a durable or cross-device identity.

## configuration

there is no runtime configuration in the application. build behavior is owned
by `vite.config.ts`, which disables environment-file loading; deployment intent
is owned by `.github/workflows/deploy.yml`; computation limits are source
constants with test coverage.

## required validation

```text
npm run check
python3 ~/.codex/skills/manage-project-docs/scripts/check_docset.py . --review-claims
browser smoke at desktop and narrow viewport
production preview smoke at `/upward/`
```

## supersession

- `boundary-002`, accepted through `specs/002-held-forms-cabinet.md`, supersedes
  the no-persisted-state portion of `boundary-001`. the no-runtime-network
  portion remains in force.

## intentionally unspecified

- editable projection vectors, alternate projection presets, and exploded
  coincident-shadow views;
- lattice morphing and comparisons among every pair of held forms;
- the neutral export format and any downstream adapter;
- custom domain and release cadence.

