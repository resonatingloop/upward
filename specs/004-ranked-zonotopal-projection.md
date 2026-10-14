# spec: the zonotropal nightclub — ranked zonotopal projection

status: retired

> **continuity role:** proposed transition
> **owner:** colette
> **created:** 2026-10-14
> **supersedes:** none

the owner accepted the ranked zonotopal projection and authorized implementation
on 2026-10-14 with: "accepted - open the nightclub!"

retired on 2026-10-14 after the mathematical, session, natural-regression,
desktop, narrow, interaction, no-webgl, production-preview, and documentation
acceptance proofs passed. current behavior is owned by the tested source,
`README.md`, `STATUS.md`, `CONTRACTS.md`, `docs/ARCHITECTURE.md`,
`docs/DEVELOPMENT.md`, and `DECISIONS.md`.

## context

at the start of this transition, upward refuses an integer with four or more
distinct prime factors.
that refusal is deliberate: its natural exponent space cannot be embedded in
three dimensions without loss, and the first slice would not disguise an
arbitrary layout as exact geometry.

the domain lattice is already dimension-independent. the next transition can
therefore preserve its exact nodes and covers while naming the separate act of
casting a higher-dimensional exponent body into three-dimensional space.

the public mathematical name is **ranked zonotopal projection**. the internal
nickname may remain **the zonotropal nightclub**.

## proposed transition

integers with zero through three distinct prime factors continue to use the
existing exact natural exponent layout without coordinate drift.

integers with four or more distinct prime factors, still bounded by the current
integer and divisor-count limits, use a deterministic three-dimensional linear
projection of their centered exponent vectors. every prime axis receives an
equal-length generator with the same positive world-height component and a
deterministic horizontal bearing.

for a divisor exponent vector `e`, factor maxima `a`, and projected prime-axis
generators `v`, its position is:

```text
position(e) = sum((e[i] - a[i] / 2) * v[i])
```

the projection therefore preserves these facts:

- every divisor and cover relation remains exact;
- every cover edge has the same length;
- every cover rises by the same positive world-height step, so rank remains
  monotone;
- edges belonging to one prime direction remain parallel and share one color;
- complementary divisors occupy antipodal positions around the origin;
- the projection is deterministic and depends on exponent structure rather
  than prime magnitude.

it does **not** claim to preserve higher-dimensional distance, angle, face
incidence, enclosure, or injectivity.

## generator construction

projected axes are assigned in canonical structural order: descending maximum
exponent, then ascending prime for ties. this makes structural signatures drive
the body while prime labels and edge ownership remain exact.

for canonical axis index `j`:

```text
theta[j] = j * pi * (3 - sqrt(5))
raw[j] = (cos(theta[j]), vertical-rise, sin(theta[j]))
v[j] = normalize(raw[j]) * natural-step
```

`vertical-rise` is one fixed positive project constant, chosen once through
rendered comparison and then tested. it must not depend on the integer or prime
values. the golden-angle bearing avoids the guaranteed opposite-axis
coincidences produced by evenly spaced rays while remaining deterministic.

## visible warrant

the field names its geometry rather than silently changing modes:

```text
natural exponent space
```

or:

```text
ranked zonotopal projection · 4→3 · 0 coincident shadows
```

the projected room also carries a compact warrant stating that rank,
complements, and the cover graph remain exact while higher-dimensional
incidence is projected. the wording remains legible without webgl.

coincident projected node centers are detected in the domain layout and
reported. the divisor rail remains the exact selection escape hatch if two
nodes share one shadow. exploded views, projection editing, and claims about
screen-space label collisions are outside this transition.

prime-direction colors extend deterministically through every dimension
reachable under the current input boundary. color is never the only axis
identifier; the ordered prime-direction list remains authoritative.

`210 = 2 × 3 × 5 × 7` becomes the first projected specimen and remains the
primary acceptance body. the existing specimens remain available.

## scope

in:

- a pure ranked-zonotopal domain layout and collision metadata;
- an explicit dispatcher between exact natural and projected geometry;
- support for four-plus-prime inputs within the existing magnitude and
  512-divisor limits;
- unchanged natural coordinates for all currently supported integers;
- field, input-boundary, axis, and no-webgl language that names projection and
  information loss;
- enough deterministic axis colors for every reachable prime direction;
- `210` as a projected starter specimen;
- projected integers in the existing held-form cabinet without changing the
  stored payload shape, cap, or key;
- focused mathematical tests, full project checks, and rendered desktop and
  narrow interaction proof.

out:

- user-editable projection vectors, presets, morphing, or projection animation;
- force-directed or stochastic graph layout;
- exploded collision views or automatic label decluttering;
- changes to factorization, divisor enumeration, complements, signatures,
  cover relations, input magnitude, or divisor-count limits;
- changes to the cabinet key, schema version, integer-only payload, ordering,
  or session lifetime;
- export, import, annotations, private data, integrations, deployment, or
  publication.

## governing contracts and decision

- `math-001` through `math-005`, relationship contracts, state contracts, and
  public boundaries remain unchanged;
- `geo-001` remains unchanged for one through three prime directions;
- owner acceptance authorizes replacing `geo-002` with an explicit projected
  geometry contract and appending a decision that supersedes only d-003's
  temporary refusal, not its honesty requirement;
- failed input continues to leave the last valid lattice intact.

## likely implementation seams

| component | likely path | responsibility |
|---|---|---|
| natural layout | `src/domain/layout.ts` | retain exact zero-to-three-dimensional coordinates |
| projected layout | `src/domain/projection.ts` | pure generator construction, centered positions, metadata, and coincidence groups |
| projection proof | `src/domain/projection.test.ts` | rank, equal step, complements, determinism, structure ordering, and 210 fixture |
| layout dispatch | `src/domain/spatial-layout.ts` | choose exact natural or named projected mode |
| input/session boundary | `src/domain/input.ts`, `src/session/held-forms.ts` | admit projected values without changing magnitude, node, or payload bounds |
| application | `src/app.tsx` | expose layout mode and warrant while preserving failed-input semantics |
| scene | `src/scene/lattice-scene.tsx` | consume the complete spatial model and extended axis palette |
| visual system | `src/styles.css` | compact warrant and projected-room treatment at desktop and narrow widths |

## change shape

| dimension | changed? | source of truth | proof |
|---|---:|---|---|
| user-visible behavior | yes | application, scene, and spatial layout | 210 desktop/narrow browser acceptance |
| persisted state or schema | yes | held-form validator and unchanged v1 payload | session tests and payload inspection |
| external or provider-visible behavior | no | static client boundary | source and runtime network review |
| identifiers, secrets or privacy | no | existing public-boundary contracts | diff and dependency review |
| lifecycle or terminal states | yes | successful-input and held-form validation paths | input/session regression tests |
| setup, operation or recovery | yes | readme and development smoke path | cold-run and no-webgl review |
| normative contract or decision | yes | `CONTRACTS.md` and `DECISIONS.md` | owner acceptance and final document review |
| cross-repository dependency | no | project brief public boundary | source and dependency review |

the held-form schema itself does not change, but its accepted integer set does:
a valid projected integer such as `210` will survive same-tab reload instead of
being discarded as unsupported.

## implementation by invariant

1. prove the projected coordinate construction below react and three.js.
2. prove natural-layout coordinates are byte-for-byte unchanged for the current
   fixtures.
3. replace the application-only dimension refusal with explicit spatial-layout
   dispatch while preserving the last valid lattice on every remaining error.
4. admit projected integers through the existing session validator without
   changing its wire schema.
5. name the projection, dimensional reduction, and coincident-shadow count in
   accessible dom state before applying visual atmosphere.
6. extend axis rendering and add `210` as a specimen without obscuring the
   original invitations.
7. reconcile contracts, decisions, architecture, operations, and current
   status; retire this spec only after its acceptance paths are exercised.

## acceptance criteria

### 210 enters the nightclub

1. unfold `210` from the specimen rail or integer input;
2. the application reports a ranked zonotopal `4→3` projection rather than an
   unsupported-dimension error;
3. the lattice contains all 16 divisors and all 32 cover relations;
4. its four prime directions have distinct, labeled edge treatments;
5. every cover has the common natural-step length and positive equal world
   height;
6. divisor `1` and `210`, and every other complement pair, are spatial
   antipodes;
7. the visible warrant distinguishes exact graph/rank/complement facts from
   projected higher-dimensional incidence;
8. orbit, zoom, pan, reset, node selection, complement crossing, and the
   divisor rail continue to work.

### the old room does not move

- `348`, `60`, `72`, `64`, and the lower-dimensional layout fixtures retain
  their existing coordinates, edge counts, camera behavior, and visible
  natural-space label;
- the fish-face and same-body cabinet regressions remain green;
- invalid, oversized, and over-512-divisor inputs still leave the last valid
  lattice intact.

### the shadow tells the truth

- the same projected lattice produces the same coordinates across repeated
  construction;
- generator choice is independent of prime magnitude;
- projected coincidence metadata matches the rendered/readable count;
- a projected held form survives same-tab reload in the unchanged integer-only
  v1 payload;
- no-webgl presentation still states that the active geometry is projected and
  retains exact divisor selection through the rail;
- approximately 430-pixel and desktop layouts have no page-level horizontal
  overflow, including five specimen controls and the projection warrant;
- no new runtime network request, dependency, secret, or environment input is
  introduced.

## validation

focused proof:

```text
npm run test -- src/domain/layout.test.ts src/domain/projection.test.ts src/domain/input.test.ts src/session/held-forms.test.ts
```

complete repository proof:

```text
npm run check
python3 ~/.codex/skills/manage-project-docs/scripts/check_docset.py . --review-claims
```

rendered proof:

1. unfold and manipulate `210` at desktop width with webgl;
2. select at least one complement pair and inspect all four prime directions;
3. hold `210`, reload the tab, and inspect the exact session payload;
4. return to `348` and exercise the fish-face cabinet circuit;
5. repeat `210` near 430 pixels and with webgl unavailable;
6. inspect runtime console, network, and page-level overflow;
7. compare natural-layout fixture coordinates before and after the change.

## risks and rollback shape

- a mathematically honest projection can still be visually illegible; rendered
  proof owns that judgment, not unit tests;
- golden-angle generators avoid forced symmetry collisions but do not prove
  injectivity for every bounded exponent box, so coincidence disclosure is a
  required fact rather than decorative copy;
- expanding session validation means formerly rejected projected values can now
  persist under the existing schema; rollback must restore the validator and
  remove such values through ordinary normalization, not reinterpret them;
- additional axis colors can become chromatic soup; labels and stable ordering
  remain primary;
- rollback is bounded to the projection module, spatial dispatcher, expanded
  validation, projection ui, and added specimen. the existing natural layout
  and exact lattice model remain intact.

## owner transition

no blocking question remained at acceptance, and the transition is complete.
