# upward development and operations

> **continuity role:** operational procedure
> **status:** current
> **last verified:** 2026-10-13
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
5. try `210`; confirm a four-direction error while `60` remains visible;
6. repeat at a viewport near 430 pixels wide and confirm no horizontal overflow;
7. disable webgl and confirm the scene failure is named while the divisor rail
   remains present.

## configuration and precedence

| source | location | owns | precedence |
|---|---|---|---|
| source constants | `src/domain/input.ts`, `src/domain/lattice.ts` | computation limits | only runtime limits |
| vite build | `vite.config.ts` | asset base, react transform, test environment | build time |

the application has no runtime environment configuration. never add or inspect a
real `.env` merely to run the first slice.

## persistent data

- location: none;
- backup: not applicable;
- reset: reload the page;
- migrations: none.

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

### source changes do not appear

- diagnose: confirm the vite process was started from this checkout and inspect
  the url printed by `npm run dev`.
- recover: stop the stale process and restart the documented command.
