# spec: the answering cabinet — front plate and pullout drawer

status: retired

> **continuity role:** proposed transition
> **owner:** colette
> **created:** 2026-10-13
> **supersedes:** none

the owner accepted the front-plate and pullout-cabinet direction and authorized
implementation on 2026-10-13.

retired on 2026-10-13 after the focused, complete, documentation, and rendered
acceptance proofs passed. current behavior is owned by `README.md`, `STATUS.md`,
`CONTRACTS.md`, `docs/ARCHITECTURE.md`, `docs/DEVELOPMENT.md`, `DECISIONS.md`, and
the tested source rather than this transition document.

## context

the session cabinet correctly classifies every held form, but its horizontal row
makes discovery depend on insertion position. with `348`, `174`, and `306` held
while `153` is unfolded, the answering form `306` can sit beyond the visible
edge of the control spine. the mathematical relationship exists, yet the user
must scroll sideways before the fish becomes a face.

the cabinet also asks every held form to remain a full card inside the narrow
rail. the cards are worth preserving, but collection and reading need different
spatial scales.

## accepted transition

the cabinet becomes a specimen deck with a pullout extension:

- its resting state presents one full-size **front card**;
- a compact, stable-order index exposes every held integer and marks answering
  forms without replacing the full card;
- changing the unfolded integer surfaces a directly related held form on the
  front card whenever one exists;
- a native modal drawer opens from the control spine and reveals every held form
  as a full-size card;
- on narrow screens the same drawer rises from the bottom rather than trying to
  extend sideways;
- the existing starter specimens remain visible as the instrument's initial
  invitations.

the front card is a derived view. automatic surfacing never mutates the held
integer list or its persisted insertion order.

## scope

in:

- one full-size front card in the resting cabinet;
- a compact stable-order index with explicit inspected and answering states;
- automatic front-card selection after a successful unfold;
- a count of directly related held forms;
- an expandable full-card drawer with inspect, unfold, and release actions;
- native dialog focus containment, escape dismissal, close control, and focus
  return;
- desktop side-drawer and narrow bottom-sheet layouts;
- restrained opening motion with a reduced-motion path;
- explicit vite refusal to load environment files, enforcing the existing
  no-environment configuration boundary;
- focused selection tests, rendered responsive proof, and documentation close.

out:

- changes to factorization, divisor generation, relationship classification,
  geometry, scene topology, or input limits;
- changes to the held-form session key, payload, validation, cap, ordering, or
  recovery behavior;
- drag reordering, tags, notes, folders, search, import, export, or durable
  cabinet state;
- comparison among held forms;
- deployment or publication;
- removal of the starter specimens.

## front-card behavior

an **answering form** is a held form whose current relationship kind is not
`none`. identity, structural twin, prime extrusion, and divisor embedding all
answer; the interface names the exact kind rather than reducing them to color.

after a successful unfold:

1. if the currently inspected form still answers, it remains in front;
2. otherwise, the first answering form in stable insertion order comes forward;
3. if no form answers, the currently inspected form remains in front;
4. if the prior inspection no longer exists, the first held form becomes front;
5. an empty cabinet has no front card.

manual index or card inspection changes the front card without unfolding a new
integer. holding a form brings that form to the front. releasing the front form
retains the existing next-then-previous stable-order behavior.

the compact index remains in persisted insertion order at all times. each entry
includes its stable ordinal and integer, marks the front card through pressed
state, and names its relationship in accessible text. color or glow is never the
only indication that a form answers.

## drawer behavior

- the drawer opens only when at least one form is held;
- desktop presentation begins at the control-spine edge and overlays the field;
- narrow presentation uses a full-width bottom sheet;
- every held form appears as a full-size card in stable insertion order;
- inspecting a drawer card closes the drawer and brings that card to the front;
- unfolding a drawer card closes the drawer and uses the existing validated
  explore path;
- releasing a card keeps the drawer open unless the cabinet becomes empty;
- the drawer has a visible close control, closes with escape or its native
  cancellation behavior, and restores focus to its opener;
- opening motion is brief and directional; reduced-motion removes the travel.

## likely implementation seams

| component | likely path | responsibility |
|---|---|---|
| cabinet view selection | `src/cabinet/cabinet-view.ts` | pure front-card and answer-set selection |
| cabinet view proof | `src/cabinet/cabinet-view.test.ts` | stable order and automatic surfacing cases |
| cabinet interface | `src/cabinet/held-form-cabinet.tsx` | front card, index, native drawer, and actions |
| application state | `src/app.tsx` | select the next front form on successful unfold |
| visual system | `src/styles.css` | deck, pullout, bottom sheet, focus, and motion |

## change shape

| dimension | changed? | source of truth | proof |
|---|---:|---|---|
| user-visible behavior | yes | cabinet component and styles | focused tests and rendered interaction smoke |
| persisted state or schema | no | `src/session/held-forms.ts` | storage tests and payload inspection |
| external or provider-visible behavior | no | static client boundary | source and network review |
| identifiers, secrets or privacy | no | `CONTRACTS.md` boundary | diff review |
| lifecycle or terminal states | no | existing session lifecycle | session tests |
| setup, operation or recovery | yes | `vite.config.ts`, `docs/DEVELOPMENT.md` | checks run without loading environment files |
| normative contract or decision | no | `CONTRACTS.md` | explicit contract review |
| cross-repository dependency | no | repository boundary | dependency and diff review |

## acceptance

1. with held values `348`, `174`, and `306`, successfully unfolding `153`
   presents the full `306` card without horizontal scrolling and reports one
   answering form;
2. the compact index remains ordered `01 348`, `02 174`, `03 306` while `306`
   is in front;
3. opening the cabinet reveals full-size cards for all three held values;
4. inspecting, unfolding, and releasing from the drawer preserve their existing
   meanings;
5. `153` and `306` still illuminate exactly six nodes and seven internal covers;
6. `306` and `348` still report `same body`;
7. starter specimens remain available;
8. the drawer is operable by keyboard, escape closes it, and focus returns to
   the opener;
9. desktop and approximately 430-pixel-wide layouts have no page-level
   horizontal overflow;
10. reduced-motion presentation has no drawer travel;
11. the session payload remains version `1` with integer values only;
12. `npm run check`, the documentation checker, and rendered smoke pass.

## validation

```text
npm run test
npm run check
python3 ~/.codex/skills/manage-project-docs/scripts/check_docset.py . --review-claims
production preview at /upward/
desktop, narrow, keyboard, reduced-motion, and no-webgl browser smoke
```

## risks and unknowns

- a top-layer dialog must not cover the persistent control spine at desktop
  widths or strand focus after close;
- dense twelve-card drawers may require internal scrolling, but must not create
  page-level overflow;
- multiple answering forms have no mathematical priority. stable insertion order
  is the deterministic fallback rather than an invented hierarchy;
- broad public-device behavior remains unverified until publication is
  separately authorized and observed.

