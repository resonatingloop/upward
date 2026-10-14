# upward contracts

> **continuity role:** normative invariants
> **status:** current
> **last verified:** 2026-10-13
> **owns:** confirmed promises implementation must not drift from casually
> **update when:** an authorized decision changes an invariant or its proof

changing a contract requires an explicit decision. a failing implementation is
not, by itself, authorization to weaken the contract.

## sources of truth

| fact | owner | proof or inventory |
|---|---|---|
| factorization and lattice structure | `src/domain/lattice.ts` | `src/domain/lattice.test.ts` |
| natural three-dimensional position | `src/domain/layout.ts` | `src/domain/layout.test.ts` |
| scene interaction and visible details | `src/app.tsx`, `src/scene/lattice-scene.tsx` | production build and browser smoke |
| supported input boundary | `src/domain/input.ts` | `src/domain/input.test.ts` |

## invariants

| id | claim | representation owner | proof |
|---|---|---|---|
| `math-001` | the prime factors reconstruct the entered integer exactly. | factorization model | factorization tests |
| `math-002` | each positive divisor appears exactly once with one exponent vector. | lattice model | divisor enumeration tests |
| `math-003` | an edge exists exactly when one exponent increases by one along one prime axis. | cover-relation model | edge tests and count identities |
| `math-004` | the complement of `d` is `n / d`, with exponent vector `a - e`. | node model | complement involution tests |
| `math-005` | structural identity is the descending sorted multiset of prime exponents. | lattice signature | structural-twin tests |
| `geo-001` | one to three prime directions use centered, equal-step natural exponent coordinates. | natural layout | layout tests |
| `geo-002` | four or more prime directions are reported as unsupported until a named projection is accepted. | natural layout and ui | error-state tests and browser smoke |
| `boundary-001` | the first slice performs no runtime network request and persists no user state. | application boundary | source review and browser network review |

## interfaces and boundaries

- the domain model produces renderer-independent nodes, exponent vectors, and
  cover edges.
- the scene consumes the domain model; it must not recompute mathematical truth.
- the public application does not read local corpora or private repositories.
- future export may expose neutral lattice facts only after an accepted spec.

## data and schema

the first slice has no persisted schema. values are exact javascript integers in
the documented input range. node identity is the divisor's decimal string;
exponent vectors remain ordered by ascending prime.

## lifecycle and failure semantics

invalid, oversized, or currently unsupported inputs produce an inline error and
leave the last valid lattice intact. renderer failure must not be represented as
mathematical success.

## privacy and secrets

the application requires no secret. `.env` files are ignored and must never be
committed. the first slice has no telemetry, account, storage, upload, import, or
backend boundary.

## configuration

there is no runtime configuration in the first slice. build behavior is owned by
`vite.config.ts`; computation limits are source constants with test coverage.

## required validation

```text
npm run check
python3 ~/.codex/skills/manage-project-docs/scripts/check_docset.py . --review-claims
browser smoke at desktop and narrow viewport
```

## supersession

- none.

## intentionally unspecified

- the eventual high-dimensional projection;
- the held-form cabinet, session storage, structural glow, and morphing;
- the neutral export format and any downstream adapter;
- deployment provider and public url.

