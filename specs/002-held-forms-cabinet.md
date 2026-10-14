# spec: the unbroken net — held-form cabinet

status: retired

> **continuity role:** proposed transition
> **owner:** colette
> **created:** 2026-10-13
> **supersedes:** none

the owner accepted this transition and authorized implementation on 2026-10-13.

retired on 2026-10-13 after the automated and rendered acceptance criteria were
exercised. current behavior is owned by `README.md`, `STATUS.md`, `CONTRACTS.md`,
`docs/ARCHITECTURE.md`, `docs/DEVELOPMENT.md`, and the tested source rather than
this transition document.

## context

the first slice makes one integer's divisor lattice inhabitable. the next useful
instrument is not a durable bookmark list but a small relational cabinet: hold a
few forms during one browser session, unfold another integer, and let upward name
what the forms are doing to one another.

the motivating pair is `153` and `306`:

```text
153 = 3² × 17
306 = 2 × 3² × 17
```

because the quotient is the new prime `2`, the divisor lattice of `306` is
exactly the divisor lattice of `153` extruded one step along a new prime axis:

```text
d  ──×2──  2d
```

the six divisors of `153` form one complete face of the 12-node lattice of
`306`; their doubles form the opposite face; six new cover edges join them.
`153` itself sits one cover below `306` and has complement `2`.

this observation makes containment a first-class relationship beside the
existing unlabeled structural signature. it also supplies an unusually exact
acceptance ritual: put the fish in the cabinet, summon `306`, and watch the fish
become a face without breaking the net.

the numerical relationship is public mathematical fixture data. this slice
does not encode gematria, qabbala, private phrases, user annotations, or a claim
about what any number means.

## proposed contract decision

the current `boundary-001` contract says that the first slice persists no user
state. implementation is blocked until the owner accepts this spec and thereby
authorizes a narrow supersession:

- upward continues to make no required runtime network request;
- upward may store a bounded list of positive integers in browser
  `sessionStorage` for the current tab session;
- upward does not use `localStorage`, cookies, a backend, an account, telemetry,
  or cross-device synchronization;
- all factorization, lattice, embedding, and relationship facts are recomputed
  from the held integers by the domain layer and are never stored as authority.

acceptance should add a new normative boundary contract and record the session
cabinet decision in `DECISIONS.md`. `boundary-001` remains an accurate historical
description of the retired first slice but must no longer describe the current
application after implementation.

## goals

- let a visitor hold and revisit a small set of integers within one tab session;
- make structural kinship and divisor containment visible without obscuring the
  active sculpture;
- recognize a one-prime extrusion as a stronger, geometrically meaningful kind
  of containment;
- keep mathematical comparison pure, deterministic, and independent of react,
  three.js, webgl, and browser storage;
- fail open into the existing instrument if session storage is absent, blocked,
  malformed, or stale.

## scope

in:

- a compact held-form cabinet in the control spine;
- hold, inspect, unfold, and release actions;
- at most 12 distinct held integers, kept in stable insertion order;
- versioned, validated, integer-only `sessionStorage` persistence;
- current-versus-held relationship classification;
- textual relationship labels plus restrained, non-color-only visual states;
- structural-kinship glow for different integers with the same signature;
- embedded-node and embedded-edge emphasis when a held integer is contained in
  the currently unfolded lattice;
- graceful memory-only fallback when storage cannot be read or written;
- focused domain, storage, and browser acceptance proof;
- continuity reconciliation and retirement of this spec after implementation.

out:

- `localStorage`, cookies, accounts, backend persistence, synchronization, or
  telemetry;
- notes, tags, aliases, phrases, cipher values, gematria, qabbala, or private
  research data;
- import, export, shareable urls, or cross-tab cabinet synchronization;
- comparison among every pair of held forms;
- more than one inspected relationship at a time;
- lattice morphing or animated interpolation between integers;
- four-dimensional projection or a zonotopal shadow;
- arbitrary sublattice discovery beyond exact divisibility relationships;
- redesign of the established scene, divisor rail, or mathematical layout.

## relationship model

comparison is always between the active integer and one held integer. the pure
domain classifier returns one strongest relationship with explicit orientation.

| relationship | exact condition | visible meaning |
|---|---|---|
| identity | the integers are equal | this form is already unfolded |
| structural twin | different integers have equal descending exponent signatures | same unlabeled multiplicative body |
| prime extrusion | the smaller divides the larger; the quotient is prime; and that prime does not divide the smaller | the smaller lattice is a complete codimension-one face of the larger |
| divisor embedding | the smaller divides the larger without satisfying prime extrusion | one divisor lattice is canonically contained in the other |
| none | none of the preceding conditions hold | no privileged relationship is asserted |

`prime extrusion` is deliberately narrow. for `153 → 306`, the quotient is
prime and introduces a previously absent axis, so
`d(306) ≅ d(153) × c₂`. multiplying by a prime that already divides the smaller
integer extends an existing axis and is therefore ordinary divisor embedding,
not a new-face extrusion.

the classifier owns facts, not prose styling. interface copy may say
`same body`, `contained · ×2`, or `new prime direction · ×2`, but it must retain
the exact relationship and orientation in accessible text.

## cabinet behavior

- the cabinet begins empty when no valid session payload exists;
- **hold form** adds the currently valid lattice integer once and makes it the
  inspected held form;
- holding a duplicate is an idempotent no-op rather than a second specimen;
- the thirteenth hold is refused with a quiet `cabinet full · release one form`
  message; the cabinet never silently evicts a specimen;
- releasing the inspected form selects the next remaining form in stable order,
  or leaves no form inspected when the cabinet becomes empty;
- one held form may be inspected at a time;
- a held item exposes separate inspect, unfold, and release actions so examining
  a relationship never unexpectedly replaces the active lattice;
- unfolding from the cabinet uses the existing validated `explore` path and
  therefore preserves current input, dimension, divisor-count, selection, and
  failure semantics;
- relationship text remains useful when webgl is unavailable;
- visual glow is static or gently transitional, respects reduced-motion
  preferences, and is never the sole carrier of relationship meaning.

when the inspected held integer divides the current integer, the scene must
emphasize exactly those current nodes whose values divide the held integer and
exactly those cover edges whose endpoints both lie in that set. no node or edge
is removed, reordered, or reinterpreted. when the current integer instead
divides the held integer, the cabinet names the relationship but does not imply
that the unseen larger lattice is rendered.

## session schema and recovery

proposed key:

```text
upward:held-forms:v1
```

payload:

```json
{
  "version": 1,
  "values": [153, 306]
}
```

rules:

- `values` contains at most 12 unique integers in insertion order;
- each value must pass the same positive-integer, magnitude, divisor-count, and
  natural-dimension boundaries as a currently unfoldable lattice;
- invalid entries are discarded independently; one bad entry does not erase
  otherwise valid held forms;
- an invalid version or malformed top-level payload is ignored as an empty
  cabinet and replaced only after the next user-initiated cabinet write;
- storage reads and writes are exception-safe. failure leaves a working
  memory-only cabinet and does not replace the current lattice;
- derived factorization, signatures, relationships, node ids, edges, geometry,
  selection, and interface state are never persisted;
- session storage is expected to survive reload in the same tab. closing the
  tab ends the ordinary session, though browser session-restoration behavior is
  outside upward's control and must not be represented as guaranteed deletion.

there is no migration from earlier application state because no earlier
persisted schema exists. future schema versions require an explicit migration
or a documented discard policy.

## likely implementation seams

| component | likely path | responsibility |
|---|---|---|
| relationship classifier | `src/domain/relations.ts` | pure identity, signature, divisibility, extrusion, orientation, and embedded-set facts |
| relationship proof | `src/domain/relations.test.ts` | exact fixtures and general boundary cases |
| session adapter | `src/session/held-forms.ts` | versioned decode, validation, bounded writes, and storage failure fallback |
| session proof | `src/session/held-forms.test.ts` | malformed payload, deduplication, cap, and exception behavior |
| cabinet interface | `src/cabinet/held-form-cabinet.tsx` | accessible held-form actions and relationship readout |
| application state | `src/app.tsx` | active lattice, inspected held form, and existing explore path |
| scene emphasis | `src/scene/lattice-scene.tsx` | consume domain-owned embedded node and edge ids without reconstructing arithmetic |
| visual system | `src/styles.css` | cabinet layout, kinship glow, containment emphasis, focus, and narrow behavior |

these paths are proposed seams rather than an instruction to create abstraction
for its own sake. mathematical truth must remain below the browser and renderer
boundaries even if the final component split is smaller.

## change shape

| dimension | changed? | source of truth | proof |
|---|---:|---|---|
| user-visible behavior | yes | react application, cabinet, and scene consumers | desktop and narrow browser acceptance |
| persisted state or schema | yes | versioned session adapter and `CONTRACTS.md` | decode/write unit tests and reload smoke |
| external or provider-visible behavior | no | client-only application boundary | source and browser network review |
| identifiers, secrets or privacy | yes | integer-only schema and public-boundary contract | payload inspection and source review |
| lifecycle or terminal states | yes | cabinet reducer/state owner and session adapter | cap, release, malformed-state, and unavailable-storage tests |
| setup, operation or recovery | yes | `README.md` and `docs/DEVELOPMENT.md` | cold-run and recovery review |
| normative contract or decision | yes | `CONTRACTS.md` and `DECISIONS.md` | owner acceptance, document check, and final diff review |
| cross-repository dependency | no | `PROJECT_BRIEF.md` public boundary | source and dependency review |

## implementation by invariant

1. define and test relation vocabulary without browser, react, or renderer
   imports.
2. prove `153 → 306` as a prime extrusion with the exact embedded node and edge
   sets before adding visual treatment.
3. introduce a versioned session adapter that stores only validated integers and
   degrades to memory without disturbing the active lattice.
4. add bounded cabinet state and actions while routing every unfold through the
   existing successful-input transition.
5. expose relationship labels and controls accessibly before adding glow.
6. pass domain-owned embedded ids into the scene and emphasize them without
   changing lattice topology or selection semantics.
7. reconcile contracts, decisions, architecture, operations, and current status;
   then retire this spec only after every criterion is exercised.

## acceptance criteria

### the fish becomes a face

given an empty cabinet:

1. unfold `153` and hold it;
2. unfold `306`;
3. inspect the held `153` form;
4. the cabinet reports an oriented prime extrusion with quotient `2`;
5. the active scene emphasizes exactly `1, 3, 9, 17, 51, 153` and the seven
   cover edges internal to that set;
6. the scene still contains all 12 nodes and all 20 cover edges of `306`;
7. selecting `153` still reports complement `2`.

### structural kin recognize one another

- hold `306`, unfold `348`, and inspect the held form;
- both signatures resolve to `(2, 1, 1)`;
- the cabinet reports structural twins and supplies the kinship glow plus
  equivalent accessible text;
- no divisor-containment relationship is invented.

### the cabinet remembers only what it may

- hold at least `153` and `306`, reload the same tab, and observe both values in
  their original order;
- inspect the stored payload and find only schema version plus integer values;
- attempt a duplicate hold and observe no duplicate;
- fill all 12 places and observe the thirteenth refused without eviction;
- close the ordinary tab session and begin a new one with an empty cabinet,
  subject to the documented browser-restoration caveat.

### yet was not the net broken

- malformed, wrong-version, partially invalid, unavailable, and write-failing
  session storage never prevents the default `348` lattice from opening;
- invalid input and unsupported four-prime input continue to leave the last
  valid lattice intact;
- relationship emphasis changes no node, edge, complement, signature, or
  coordinate fact;
- orbit, zoom, pan, reset, divisor selection, complement crossing, keyboard
  access, no-webgl fallback, and narrow layout continue to work;
- the built application makes no new required runtime network request;
- every pre-existing automated test remains green.

## validation

focused proof:

```text
npm run test -- src/domain/relations.test.ts src/session/held-forms.test.ts
```

complete repository proof:

```text
npm run check
python3 ~/.codex/skills/manage-project-docs/scripts/check_docset.py . --review-claims
```

rendered proof:

1. exercise the complete fish acceptance at desktop width;
2. reload and confirm same-tab restoration;
3. exercise structural kinship with `306` and `348`;
4. inject malformed storage and simulate unavailable storage;
5. repeat cabinet actions near 430 pixels without horizontal overflow;
6. repeat relationship readout with webgl unavailable;
7. inspect runtime network and session payload boundaries.

## risks and rollback shape

- browser storage can throw even when the api exists; every access must remain
  behind the adapter and preserve memory-only behavior;
- session restoration differs by browser, so upward promises session scope and
  same-tab reload survival rather than irreversible deletion at tab close;
- multiple glows can quickly turn the sculpture into soup; only the inspected
  relationship may affect the scene at one time;
- a contained divisor lattice is always a canonical subposet, but only the
  narrow prime-extrusion condition warrants the geometric word `face`;
- the control spine may become crowded at narrow heights and requires rendered
  inspection rather than build-only acceptance;
- rollback is bounded: remove cabinet ui and scene emphasis, stop reading the
  versioned key, and leave the core input-to-lattice circuit untouched. an
  accepted normative decision remains in history and must be superseded rather
  than silently erased.

## open questions

- none blocking this slice.
