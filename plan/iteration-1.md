# Iteration 1 — Static Foundation

## Status: Complete

## Goal
Deliver a working single-page app where a user can browse a hardcoded list of 40 legendary players, assemble two squads of 11, and simulate a match that returns a scoreline and event log.

## Tech Stack
- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** with retro/classic theme (sepia, aged parchment, dark ink)
- **Zustand** for state management
- **React Router v6** for navigation
- **Vitest** for unit tests
- **pnpm workspaces** monorepo

## What Was Built
- `packages/types` — all shared TypeScript interfaces (`Player`, `Squad`, `MatchResult`, `MatchEvent`, `FormationSlot`)
- `packages/player-data` — 40 hand-crafted legendary players
- `apps/web/src/engine/matchEngine.ts` — 90-min simulation (18 × 5-min segments), attack/defense strength, tactic modifiers, home advantage, weighted scorer/assister selection
- `apps/web/src/lib/formations.ts` — coordinate system for 5 formations (4-3-3, 4-4-2, 4-2-3-1, 3-5-2, 5-3-2)
- `FormationPitch` SVG component with clickable position dots and player picker integration
- `PlayerPickerModal` with search, position filtering, duplicate prevention
- `PlayerCard` with Panini sticker aesthetic
- `MatchSimulatorPage` — pre-match view → animated play-by-play ticker → result CTA
- `MatchReportPage` — scoreboard, possession bar, stat comparison, event log
- Retro visual theme: parchment palette, Playfair Display + Roboto Slab, paper grain overlay
- Vitest unit tests for the match engine (scores, HT≤FT, possession, event sorting, win rate)
