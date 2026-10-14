# spec: first inhabitable divisor-lattice circuit

status: retired

> **continuity role:** accepted transition
> **owner:** colette
> **created:** 2026-10-13
> **supersedes:** none

the owner accepted the grounded first-slice contract and authorized
implementation on 2026-10-13.

retired on 2026-10-13 after every acceptance criterion was exercised. current
behavior is owned by `README.md`, `STATUS.md`, `CONTRACTS.md`, and the tested
source rather than this transition document.

## context

the repository begins with only an mit license and a two-line placeholder
readme. the first slice must prove that a mathematically correct divisor lattice
can also feel like a small, legible spatial instrument.

## scope

in:

- migrate local repository identity from `upward-drawings` to `upward`;
- bootstrap project continuity documentation;
- strict bounded positive-integer input, defaulting to `348`;
- factorization, divisor enumeration, exponent vectors, structural signature,
  complements, and exact cover relations;
- centered natural exponent geometry for zero to three prime directions;
- interactive 3d orbit, zoom, pan, camera reset, readable labels, and node
  selection;
- selected divisor factorization and complement highlighting;
- automated mathematical proof, production build, document validation, and
  rendered browser smoke.

out:

- four-dimensional and higher projection;
- held forms, session storage, structural-kinship glow, and lattice morphing;
- export or import;
- gematria, qabbala, cipher, corpus, or glossololary integration;
- backend, accounts, telemetry, deployment, or publication.

## governing contracts and decisions

- `CONTRACTS.md`
- `DECISIONS.md` d-001 through d-003

## change shape

| dimension | changed? | source of truth | proof |
|---|---:|---|---|
| user-visible behavior | yes | react application and scene | browser smoke |
| persisted state or schema | no | `CONTRACTS.md` | source review |
| external or provider-visible behavior | no | repository boundary | source review |
| identifiers, secrets or privacy | yes | `.gitignore`, `CONTRACTS.md` | git status and source review |
| lifecycle or terminal states | yes | input/application state | unit tests and browser smoke |
| setup, operation or recovery | yes | `README.md`, `docs/DEVELOPMENT.md` | cold-start commands |
| normative contract or decision | yes | `CONTRACTS.md`, `DECISIONS.md` | document checker and review |
| cross-repository dependency | no | `PROJECT_BRIEF.md` | source review |

## implementation by invariant

1. protect the public repository boundary and establish the continuity surface.
2. implement and test a renderer-independent lattice model.
3. implement and test exact centered natural layout for up to three dimensions.
4. render the model without moving mathematical responsibility into the scene.
5. expose strict input failure and selected-node detail in accessible dom state.
6. prove the happy path, reconcile current documentation, and retire this spec.

## done when

- `348` produces 12 labeled nodes and 20 cover edges;
- selecting `87` identifies and highlights complement `4`;
- `60` has the same `(2, 1, 1)` structural signature;
- invalid and four-plus-prime inputs fail legibly without replacing the last
  valid lattice;
- `npm run check` succeeds;
- desktop and narrow rendered browser smoke succeeds;
- the documentation checker succeeds and current status names remaining gaps.

## risks and unknowns

- dense but allowed lattices may still require later label-density controls;
- webgl interaction and label legibility require rendered evidence, not build
  success alone;
- deployment and public-device compatibility remain outside this slice.

## open questions

- none blocking this slice.
