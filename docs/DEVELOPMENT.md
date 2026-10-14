# upward development and operations

> **continuity role:** operational procedure
> **status:** current
> **last verified:** 2026-10-14
> **owns:** exact setup, run, test, configuration, data, and recovery procedures
> **update when:** any procedure or required environment changes

## prerequisites

- node.js 20.19 or newer;
- npm;
- a modern browser. rendered acceptance requires webgl or a software webgl
  implementation.

the verified local environment used node `26.7.0` and npm `11.19.0`.

## setup

```text
npm install
```

expected result: dependencies install from `package-lock.json` with no audit
findings.

## run

```text
npm run dev
```

expected success:

```text
vite prints a local url; upward opens at 348 with a 12-node, 20-edge scene.
```

the production build uses the github pages project base. prove that artifact
locally with:

```text
npm run build
npm run preview
```

open the printed url beneath `/upward/`.

## test and validate

focused mathematical proof:

```text
npm run test
```

type proof:

```text
npm run typecheck
```

complete code validation:

```text
npm run check
```

documentation structure when the local skill is installed:

```text
python3 ~/.codex/skills/manage-project-docs/scripts/check_docset.py . --review-claims
```

rendered acceptance:

1. open `348`; confirm 12 nodes, 20 covers, selected `87`, and complement `4`;
2. drag, zoom, and reset the scene;
3. choose `4` and confirm the complement reverses to `87`;
4. unfold `60`; confirm signature `(2, 1, 1)`, 12 nodes, and 20 covers;
5. hold `348`, `174`, and `306` in that order, then unfold `153`; confirm the
   full `306` card comes forward while the compact index remains `01 348`,
   `02 174`, `03 306`;
6. open the cabinet; confirm all three full cards appear, escape closes it, and
   focus returns to **open cabinet**;
7. hold `153`, then unfold `306`; confirm the held `153` card reports
   `face · ×2`, six emphasized divisor values, seven internal covers, 12 total
   nodes, and 20 total covers;
8. select `153` and confirm complement `2`;
9. reload the same tab and confirm held integers return from the integer-only
   session payload;
10. inspect held `306`, unfold `348`, and confirm its front card reports
   `same body` with structural signature `(2, 1, 1)`;
11. unfold `210`; confirm a named `4→3` ranked zonotopal projection with 16
    nodes, 32 covers, four labeled prime directions, and a visible information-
    loss warrant;
12. select `105`, cross to complement `2`, hold `210`, reload, and confirm the
    integer returns in the unchanged v1 session payload;
13. return to `348`; confirm the field returns to `natural exponent space` and
    the projection warrant disappears;
14. repeat near 430 pixels wide; confirm no horizontal overflow and that the
    compact projection note remains visible while the cabinet opens as a two-
    column bottom sheet;
15. emulate reduced motion and confirm the drawer opens without travel;
16. disable webgl and confirm the scene failure is named while the projection
    note, relationship readout, and divisor-rail values remain present.
17. unfold `278460`; confirm its 144-node, 480-cover `6→3` redline remains
    admitted and interactive;
18. attempt `12441600`, then `360360`; confirm the first names 216 nodes / 522
    covers, the second names 192 nodes / 656 covers, both report the 192-node /
    640-cover rendering budget, and neither replaces the redline field;
19. repeat one refusal near 430 pixels and confirm no horizontal overflow.

## configuration and precedence

| source | location | owns | precedence |
|---|---|---|---|
| source constants | `src/domain/input.ts`, `src/domain/lattice.ts`, `src/domain/scene-budget.ts` | magnitude, computation, and scene-complexity limits | only runtime limits |
| vite build | `vite.config.ts` | asset base, disabled environment-file loading, react transform, test environment | build time |
| pages workflow | `.github/workflows/deploy.yml` | validation, artifact scope, publication trigger | delivery time |

the application has no runtime environment configuration. vite environment-file
loading is disabled. never add or inspect a real `.env` merely to run the
application.

## github pages publication

configured publication uses github pages without a deployment branch. the
current public artifact is `https://resonatrix.tech/upward/`:

1. in github repository settings, open **pages**;
2. under **build and deployment**, set **source** to **github actions**;
3. review, commit, and push the workflow and vite base change to `main`;
4. inspect the `deploy upward to pages` workflow run;
5. verify the rendered artifact at `https://resonatrix.tech/upward/`.

the workflow also supports a manual run from the actions tab. it needs no
repository secret. the build job receives only `contents: read`; only the
dependent deploy job receives `pages: write` and `id-token: write`. it uploads
`dist` rather than the repository root.

to disable automatic publication without deleting history, disable the workflow
in github or remove its `push` trigger in a reviewed change. removing pages or
changing provider state remains an owner-operated github action.

## persistent data

- location: browser `sessionStorage`, key `upward:held-forms:v1`;
- schema: `{ "version": 1, "values": number[] }`, with at most 12 distinct
  integers inside the current magnitude, computation, and scene boundaries;
- backup: not applicable; the cabinet is intentionally session-scoped;
- reset: release each held form, remove the named key in browser developer
  tools, or end the ordinary tab session. browser session restoration may revive
  a tab and its session storage;
- recovery: malformed or inaccessible storage is ignored; the cabinet continues
  in memory and rewrites a valid payload only after the next hold or release;
- migrations: no earlier schema exists. a future version requires an explicit
  migration or documented discard decision.

## troubleshooting and recovery

### npm reports a read-only cache

- diagnose: the error names a cache path outside the checkout and includes
  `erofs`.
- cause: the execution environment does not permit writes to the default npm
  cache.
- recover: rerun the install with a task-local cache, for example
  `npm install --cache /tmp/upward-npm-cache`.

### the scene reports that webgl is unavailable

- diagnose: inspect browser graphics support and console output.
- cause: webgl is disabled or no gpu/software context can be created.
- recover: enable webgl or use a supported browser. the divisor rail and numeric
  readout remain available, but they do not prove the 3d interaction.

### held forms do not survive reload

- diagnose: inspect whether the browser permits `sessionStorage` for the page;
- cause: storage may be disabled, unavailable, or rejected by browser policy;
- recover: continue with the memory-only cabinet for the current load, or permit
  session storage and perform another hold or release. the lattice itself does
  not depend on storage.

### source changes do not appear

- diagnose: confirm the vite process was started from this checkout and inspect
  the url printed by `npm run dev`.
- recover: stop the stale process and restart the documented command.

### the pages site returns missing assets

- diagnose: inspect `dist/index.html`; generated asset urls must begin with
  `/upward/` for the repository project site.
- cause: the vite base and pages project path disagree, or an older artifact is
  still deployed.
- recover: restore `base: '/upward/'`, rerun `npm run check`, and manually rerun
  the pages workflow after reviewing the pending change.
