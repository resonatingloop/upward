# upward project brief

> **continuity role:** durable intent
> **status:** current
> **last verified:** 2026-10-13
> **owns:** purpose, users, scope, non-goals, constraints, and success
> **update when:** project direction changes, not when implementation merely advances

## purpose

upward is a small public web instrument for encountering the multiplicative
architecture of a positive integer as an interactive three-dimensional divisor
lattice.

## intended users and consumers

- people exploring number theory through direct spatial manipulation;
- researchers who may eventually carry neutral lattice data into separate local
  investigations;
- public visitors who should need no account, backend, or prior mathematical
  vocabulary.

## goals

- make correct divisor-lattice structure visible and enjoyable to manipulate;
- derive geometry from prime-exponent structure rather than an arbitrary graph
  layout;
- keep the mathematical model independent of the renderer;
- preserve a clean public boundary for future, explicitly requested export.

## non-goals

- a generic number-theory course or worksheet system;
- gematria, qabbala, cipher, corpus, or glossololary integration;
- accounts, telemetry, server persistence, or a durable user profile;
- pretending a three-dimensional projection preserves every property of a
  higher-dimensional exponent lattice.

## repository boundary

this repository owns a client-only mathematical model, its interactive web
projection, and public documentation. private phrase data and downstream local
analysis remain outside the repository. any future integration must cross an
explicit, mathematically neutral export boundary.

## current phase

the first slice proves one complete circuit: enter a bounded positive integer
with at most three distinct prime factors, construct its correct divisor lattice,
explore the natural exponent geometry, and inspect a divisor with its complement.

## success

- `348` renders as a usable 12-node, 20-edge lattice;
- `60` renders with the same structural signature and geometry;
- a cold checkout reaches the instrument and passes its documented validation;
- deferred integrations do not determine the first implementation.

## constraints

- static browser application with no required backend or runtime network calls;
- deterministic equal-step geometry for the exact one-, two-, and
  three-dimensional cases;
- strict computation limits protect the browser from hostile or accidental
  resource use;
- public source contains no private corpus material, secret, or environment
  value.

