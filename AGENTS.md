# upward agent guide

this file governs ai coding agents working in this repository. read it before
acting.

## required reading

1. `README.md` for the operational front door and authority map.
2. `STATUS.md` for the last verified checkpoint.
3. `CONTRACTS.md` before changing behavior, input limits, geometry, persistence,
   export, or public boundaries.
4. the active accepted spec in `specs/` when one exists.
5. `PROJECT_BRIEF.md` for generative or scope-changing work.

if documents disagree, identify which one owns the disputed fact. do not infer
authority from the filename alone. surface unresolved conflicts before editing.

## authorization

- discussion, brainstorming, critique, planning, resume, and audit requests are
  read-only unless the user explicitly requests changes.
- a direct bounded change request authorizes that change.
- new-project, substantial-feature, ambiguous, or cross-cutting implementation
  requires an explicitly accepted spec.
- agents may draft specs. only the owner may mark them accepted.
- never change a normative contract merely to make implementation agree.
- never deploy, publish, change repository visibility, or add integrations
  without explicit authorization.

## project boundaries

- `src/domain/` owns arithmetic and natural layout truth and must remain usable
  without react, three.js, webgl, or browser state.
- scene components consume complete domain models; they do not reconstruct
  factorization, divisors, signatures, complements, or cover relations.
- failed input leaves the last valid lattice intact.
- four-plus-dimensional geometry requires an explicit, named projection.
- no private phrase, cipher, corpus, database, or glossololary dependency enters
  this public repository.
- do not read, stage, or commit `.env` files. the current application needs none.
- dependencies and public interfaces require an accepted slice or explicit
  bounded authorization.

## common commands

```text
npm install
npm run test
npm run typecheck
npm run check
python3 ~/.codex/skills/manage-project-docs/scripts/check_docset.py . --review-claims
```

## working protocol

before changing files:

1. read the governing documents for the task.
2. inspect version-control status and preserve unrelated work.
3. state the authorized slice, risk floor, rollback shape, and likely proof.

during implementation:

1. work by invariant rather than accumulating unrelated changes.
2. run focused domain proof after each mathematical change.
3. render frontend changes at desktop and narrow width; build success is not
   visual acceptance.
4. surface contract conflicts, undeclared scope, and uncertain facts promptly.

before completion:

1. revisit the accepted spec's change-shape matrix.
2. reconcile code, state, visible behavior, tests, and affected documents.
3. update `STATUS.md` at the new checkpoint.
4. record consequential decisions without inventing retrospective rationale.
5. run `npm run check`, the documentation checker, and rendered interaction smoke.
6. inspect the complete diff, report unresolved unknowns, and name the next
   authorized transition.

## stop and ask

- a normative mathematical or public-boundary contract must change;
- persistence, import, export, deployment, or a cross-repository interface enters
  scope without an accepted spec;
- the task has multiple materially different interpretations;
- verification would require destructive, privileged, external, or costly action;
- the requested change exceeds the authorized slice.
