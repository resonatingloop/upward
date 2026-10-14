# spec: the velvet rope — bounded scene complexity

status: retired

> **continuity role:** proposed transition
> **owner:** colette
> **created:** 2026-10-14
> **supersedes:** none

the owner accepted the bounded scene-complexity transition and authorized
implementation on 2026-10-14 with: "accepted - mind the velvet rope!! or the
fire marshal will shut us down t_t"

retired on 2026-10-14 after the independent node and cover boundaries, redline
admission, session normalization, desktop, narrow, interaction,
production-preview, and documentation proofs passed. current behavior is owned
by the tested source, `README.md`, `STATUS.md`, `CONTRACTS.md`,
`docs/ARCHITECTURE.md`, `docs/DEVELOPMENT.md`, and `DECISIONS.md`.

## context

upward currently admits every lattice with at most 512 divisor nodes. that
limit bounds mathematical construction, but it does not describe what the
current renderer can keep legible and fluid: every node adds a sphere and html
label, while every cover adds a separately rendered line.

`278460 = 2² × 3² × 5 × 7 × 13 × 17` produces 144 nodes and 480
covers. owner-visible use found only a small rotation lag, but the body is near
the limit of useful visual distinction. it should remain an admitted redline,
not evidence that the 512-node mathematical ceiling is a pleasant scene
ceiling.

## proposed transition

retain the 512-node computation guard for the renderer-independent lattice
model. add a separate public scene budget:

```text
maximum scene nodes: 192
maximum scene covers: 640
```

an integer is explorable only when it satisfies both limits. refusal names the
rendering budget rather than implying mathematical invalidity, and it leaves
the last valid lattice intact.

the budget follows lattice complexity rather than dimensionality. a sparse
higher-dimensional body remains admissible; a lower-dimensional but densely
incident body may be refused.

## scope

in:

- pure, renderer-independent scene-budget constants and validation over a
  complete divisor lattice;
- the active unfold path and specimen/cabinet unfold path using the same
  validation;
- held-form normalization discarding values no longer explorable under the
  current scene budget without changing the session schema;
- inline refusal that reports the active node and cover budgets;
- focused boundary tests, full project checks, and rendered error-state proof;
- reconciliation of the public boundary, development guidance, decision log,
  and current status.

out:

- lowering the existing 512-node computation guard;
- changing factorization, divisor enumeration, cover generation, geometry, or
  projection mathematics;
- adaptive quality, instanced meshes, batched edges, label decluttering, or
  automatic performance measurement;
- device-specific limits or runtime gpu capability detection;
- cabinet schema, cap, order, or session lifetime changes;
- export, import, integrations, dependencies, deployment, or publication.

## governing contracts and decision

- `math-001` through `math-005`, `geo-001` through `geo-003`, relationship
  contracts, and public privacy boundaries remain unchanged;
- the lifecycle promise that failed input leaves the last valid lattice intact
  remains unchanged;
- `state-001` retains the integer-only v1 wire schema, but “validated” now also
  means within the scene budget;
- owner acceptance authorizes a new normative scene-budget contract and an
  appended decision distinguishing computation safety from inhabitable
  rendering.

## likely implementation seams

| component | likely path | responsibility |
|---|---|---|
| exact lattice model | `src/domain/lattice.ts` | retain the 512-node construction boundary |
| scene-budget policy | `src/domain/scene-budget.ts` | own the 192-node / 640-cover exploration boundary and refusal |
| application | `src/app.tsx` | validate before replacing the active lattice |
| held-form session | `src/session/held-forms.ts` | retain only integers that remain explorable |
| focused proof | `src/domain/scene-budget.test.ts`, `src/session/held-forms.test.ts` | prove both independent limits and storage normalization |

## change shape

| dimension | changed? | source of truth | proof |
|---|---:|---|---|
| user-visible behavior | yes | application and scene-budget policy | desktop and narrow refusal smoke |
| persisted state or schema | yes | held-form normalization; unchanged v1 payload | session tests and payload inspection |
| external or provider-visible behavior | no | static client boundary | source and runtime network review |
| identifiers, secrets or privacy | no | existing public-boundary contracts | diff review |
| lifecycle or terminal states | yes | successful-input and refusal paths | focused tests and browser smoke |
| setup, operation or recovery | yes | readme and development boundary notes | documentation review |
| normative contract or decision | yes | `CONTRACTS.md` and `DECISIONS.md` | owner acceptance and final review |
| cross-repository dependency | no | project brief boundary | source and dependency review |

the persisted json representation does not change. its accepted value set may
shrink when an older session contains a lattice above the new scene budget.

## implementation by invariant

1. preserve complete lattice construction through 512 nodes and prove that the
   new policy is separate.
2. validate both node and cover counts through one shared pure boundary before
   any candidate replaces active state.
3. apply the same boundary while normalizing held forms so the cabinet cannot
   restore a form the application refuses to unfold.
4. expose one accurate inline refusal while retaining the previous field,
   selection, cabinet comparison, and camera state.
5. reconcile normative and operational documentation, then retire this spec
   only after focused, complete, and rendered proof.

## acceptance criteria

### the redline remains inhabitable

- `278460` remains accepted with exactly 144 nodes and 480 covers;
- its ranked `6→3` projection, cabinet relations, selection, and orbit remain
  available;
- `306` and other sparse bodies remain governed by their counts, not their
  source dimension.

### each side of the rope is proved

- `12441600 = 2¹¹ × 3⁵ × 5²` constructs a complete 216-node,
  522-cover mathematical lattice but is refused by the 192-node scene limit;
- `360360 = 2³ × 3² × 5 × 7 × 11 × 13` constructs a complete
  192-node, 656-cover mathematical lattice but is refused by the 640-cover
  scene limit;
- `223092870` can still be constructed and projected below the existing
  512-node computation ceiling in focused domain proof, but the application
  refuses to render it;
- each refusal reports a rendering budget and leaves the last valid lattice,
  selected divisor, inspected held form, and field geometry intact.

### session and boundary truth remain aligned

- a stored over-budget integer is removed during ordinary held-form
  normalization while adjacent valid integers retain stable order;
- the storage key, schema version, integer-only payload, and 12-form cap do not
  change;
- invalid, non-decimal, oversized, and over-512-divisor inputs retain their
  established failures;
- no dependency, runtime request, secret, environment input, or deployment
  behavior is introduced.

## validation

focused proof:

```text
npm run test -- src/domain/lattice.test.ts src/domain/scene-budget.test.ts src/session/held-forms.test.ts
```

complete repository proof:

```text
npm run check
python3 ~/.codex/skills/manage-project-docs/scripts/check_docset.py . --review-claims
```

rendered proof:

1. unfold `278460` at desktop width and confirm 144 nodes / 480 covers;
2. attempt `12441600` and `360360` independently and confirm each named refusal
   leaves `278460` visible and interactive;
3. repeat one refusal near 430 pixels and confirm no horizontal overflow;
4. inspect the console, session payload, and production preview beneath
   `/upward/`.

## risks and rollback shape

- the chosen budget is a product judgment grounded in one owner-visible device,
  not a universal gpu benchmark;
- keeping the budget in source makes it deterministic and honest, but some
  slower devices may still feel lag before reaching it;
- a future batched renderer may justify raising or replacing this policy only
  through a later accepted decision and rendered proof;
- rollback removes the scene-budget validator from active and session paths,
  restores the former public-boundary prose, and leaves the 512-node lattice
  model untouched.

## owner transition

accepted on 2026-10-14; implementation and acceptance proof are complete.
