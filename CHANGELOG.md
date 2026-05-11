# Changelog

## 2026-05-08 (session 3)

### Match simulator improvements

- Match events window expanded from `max-h-80` (320px) to `max-h-[60vh]`
- Simulation now pauses at half time with a "Continue to Second Half →" button
- Simulation now pauses before a penalty shootout with a "Continue to Penalties →" button
- Added `'halftime'` and `'penalties_pending'` phases to `matchStore`; `advanceEvent` detects the HT and penalty break indices computed at `setResult` time; `continueSimulation` resumes from either pause
- Penalty kicks converted to `MatchEvent`s (`PENALTY_SCORED` / `PENALTY_MISSED`) and appended to `result.events` — the existing ticker plays them out one by one automatically
- `EventTimeline` gains a "Penalty Shootout" divider section; missed kicks shown with strikethrough
- `PenaltyShootoutSection` on the report page simplified to a one-line summary (kick-by-kick already in the timeline)

### Squad builder

- Added "↺ Randomize Squad" button per squad panel — fills all 11 slots by position eligibility then fills the bench with 5 more players; excludes players already in the other squad
- `randomizeSquad` action added to `squadStore`

### Plan

- Inserted new `iteration-4.md` (World Cup Mode: Full Tournament — group phase, 8 squads per edition, player unification, squad presets); old iterations 4 and 5 shifted to 5 and 6

## 2026-05-08 (session 2)

### World Cup Mode — fixes & UX

- Squad builder now shows only the home squad (single panel, centered) when accessed via `?from=world-cup`; bottom button reads "Confirm Squad →" and returns to `/world-cup` on confirm
- Fixed redirect bug in `MatchSimulatorPage`: guard effect now exits early when `phase !== 'idle'`, preventing a spurious navigation to `/` when `recordResult` changes the tournament round mid-simulation
- "Build Your Squad" button on home page renamed to "Play Match"
- "Play Match" now also resets the tournament store, so a finished World Cup run no longer bleeds into a subsequent regular match report

## 2026-05-08 (continued)

### World Cup Mode — Iteration 3

- Added `packages/player-data/src/historicalSquads.ts`: 28 historical WC squads across 14 editions (1970–2022), champion + runner-up per edition; self-contained player objects with unique `hist_`-prefixed IDs
- Exported `WC_EDITIONS`, `getWcEdition`, `WcEdition` from `packages/player-data/src/index.ts`
- Created `apps/web/src/engine/penaltyEngine.ts`: alternating kicks, `P(goal) = clamp(0.65 + (shooter − keeper) * 0.003, 0.50, 0.85)`, stop-early logic, sudden death if level after 5
- Updated `simulateMatch` to accept `options?: { knockout?: boolean }`; calls penalty engine on drawn FT when `knockout: true`
- Created `apps/web/src/store/tournamentStore.ts` (Zustand): tracks edition, round (`idle/semifinal/final/champion/eliminated`), results, lastOpponent
- Updated `useSimulation`: when tournament active, uses historical squad as away team and passes `knockout: true`
- Updated `MatchSimulatorPage`: shows tournament round banner and historical lineup when in tournament mode; back button navigates to tournament page
- Updated `MatchReportPage`: penalty shootout section with kick-by-kick breakdown; champion/elimination banners; context-appropriate action buttons (Continue to Final, Play Another Edition, Try Again)
- Created `WorldCupHomePage` (`/world-cup`): edition picker grid with squad readiness check
- Created `TournamentPage` (`/world-cup/tournament`): bracket view, next opponent card, Play button
- Created `TournamentBracket`, `EditionCard`, `OpponentSquadCard` components
- Added `/world-cup` and `/world-cup/tournament` routes to router
- Added "World Cup Mode" CTA to homepage

## 2026-05-08

### Automatic Substitutions

- Removed user-facing `SubstitutionPlanner` component and all related store actions (`addSubstitution`, `removeSubstitution`)
- Removed `substitutions` field from `BuilderSquad`, `Squad` type, and `useSimulation` squad builder
- Engine now auto-generates substitutions via `planAutoSubs`: bench players are subbed in at minutes 60/65/70/77/84, replacing the weakest same-position-group starter (falls back to any outfield player if no position match)

### Filter UI Rework — Multiselect Dropdowns

- Created `MultiSelectDropdown` component (`apps/web/src/components/ui/MultiSelectDropdown.tsx`): checkbox popover with click-outside close, "N selected" summary, "Clear all" button; added `align` prop (`'left'` | `'right'`) to control which edge the panel anchors to
- Replaced WC year toggle buttons in `PlayerPickerModal` with Nation + World Cup multiselect dropdowns; Nations list scoped to position-eligible players; World Cups dropdown uses `align="right"` to prevent horizontal overflow
- Applied same multiselect treatment to bench picker modal in `SubstituteBench`; Nations list covers all players
- Fixed player grid and detail panel to fixed `h-[480px]` (≈ 3 rows of cards) with `overflow-y-auto` in both modals

### World Cup Classification System

- Replaced `Era` type with `WorldCupYear` (`'1958'`–`'2022'`); replaced `era: Era` with `worldCups: WorldCupYear[]` on `Player`
- Reclassified all players by actual World Cup participation; players can appear in multiple tournaments
- Removed players who never attended a World Cup: Cantona (France failed to qualify '90/'94), Giggs (Wales never qualified), Nedvěd (Czech Republic never qualified as independent nation), Haaland (Norway not at WC since '98)
- `PlayerPickerModal` filter now shows individual WC years ('22–'58) instead of era labels
- `PlayerCard` era badge now shows WC year range (e.g. `'82–'94`)
- `PlayerDetailPanel` now lists all WC years the player attended
- Renamed `getPlayersByEra` → `getPlayersByWorldCup` in player-data index

### Era System Reclassification

- Changed `Era` type from `'classic' | 'modern'` to `'80s' | '90s' | '00s' | '10s' | 'present'`
- Reclassified all ~100 players: pre-80s legends grouped into `'80s'`; Mbappé, Haaland, Son moved to `'present'`
- Updated `PlayerPickerModal` era filter buttons to show all 5 new era options
- Updated `PlayerCard` era badge to display the era string directly instead of a symbol

### Iteration 2 — Enhanced Engine & Squad Builder

- Extended `packages/types/src/player.ts`: added `Substitution` type, `SUBSTITUTION` event type, `bench`/`substitutions` on `Squad`, `redCards`/`passes`/`passAccuracy` on `MatchStats`
- Added 58 new players in `packages/player-data/src/players-extended.ts` (Mbappé, Haaland, Neymar, Drogba, Ibrahimović, Robben, Ribéry, etc.)
- Updated `packages/player-data/src/index.ts` to merge both player arrays; `getAllPlayers()` now returns ~100 players
- Created `apps/web/src/engine/momentum.ts`: `MomentumTracker` class (+15 on goal, decay 4%/segment, ±0.05 atk bonus at extremes)
- Rewrote `apps/web/src/engine/matchEngine.ts`: two halves (9 segments each), injury time per half, planned substitutions applied at exact minutes, red cards (1.5%/segment, -12%/-22% strength penalty), momentum integration, strengths recomputed per segment
- Updated `apps/web/src/store/squadStore.ts`: added `bench`/`substitutions` to `BuilderSquad`, added `setBenchPlayer`/`addSubstitution`/`removeSubstitution` actions, `getUsedPlayerIds` includes bench players
- Created `PlayerStatRadar.tsx`: recharts RadarChart hexagon (6 stats, GK-aware axis labels)
- Created `PlayerDetailPanel.tsx`: hover stats panel with radar, stat bars, era badge
- Updated `PlayerPickerModal.tsx`: side-by-side layout with sticky detail panel on hover
- Updated `PlayerCard.tsx`: added `onMouseEnter`/`onMouseLeave` props
- Created `SubstituteBench.tsx`: 5 bench slots with add/clear/replace picker modal
- Created `SubstitutionPlanner.tsx`: up to 3 pre-planned subs at minutes 45/60/70/80
- Updated `SquadBuilderPage.tsx`: bench and substitution planner shown below pitch
- Created `useSimulation.ts` hook: wraps `simulateMatch` with `react-hot-toast` error handling, builds `Squad` with bench/subs from store
- Created `ScoreboardHeader.tsx`: shared animated scoreboard (live + full-time modes)
- Created `EventTimeline.tsx`: events grouped by first/second half with half-dividers, substitution display
- Created `MatchStatsPanel.tsx`: expanded stats including red cards, passes, pass accuracy
- Updated `MatchSimulatorPage.tsx`: uses `useSimulation` hook and `ScoreboardHeader`; bench shown in pre-match lineup
- Updated `MatchReportPage.tsx`: uses `ScoreboardHeader`, `EventTimeline`, `MatchStatsPanel`
- Updated `apps/web/src/main.tsx`: added `<Toaster>` with retro styling

### Iteration 1 — Initial Build

- Scaffolded pnpm monorepo with `apps/web` and `packages/types`, `packages/player-data`
- Defined all shared TypeScript types: `Player`, `Squad`, `MatchResult`, `MatchEvent`, `FormationSlot`
- Added 40 hand-crafted players spanning all eras (Pre-1960s through 2010s+)
- Implemented `matchEngine.ts`: 90-min simulation (18 × 5-min segments), attack/defense strength calculation, tactic modifiers, home advantage, weighted scorer/assister selection
- Built formation coordinate system for 5 formations (4-3-3, 4-4-2, 4-2-3-1, 3-5-2, 5-3-2)
- Implemented Zustand stores: `squadStore` (builder state, slot management) and `matchStore` (result, play-by-play phase)
- Built `FormationPitch` SVG component with clickable position dots, player display and picker integration
- Built `PlayerPickerModal` with search, era filter, and position compatibility filtering
- Built `PlayerCard` with Panini sticker aesthetic (colored position band, silhouette initials, overall badge)
- Built `MatchSimulatorPage` with pre-match lineup view → animated play-by-play event ticker (800ms intervals) → result CTA
- Built `MatchReportPage` with scoreboard, stats bars, event log
- Built retro/classic visual theme: parchment palette, Playfair Display + Roboto Slab fonts, paper grain overlay
- Added Vitest unit tests for `matchEngine` (scores, HT≤FT, possession, event sorting, win rate)
- Set up `tailwind.config.ts` with custom retro color palette and typography

### Players

- Added Giorgio Chiellini (CB, Italy, modern) and Leonardo Bonucci (CB/CDM, Italy, modern) to player database

### Setup / Fixes

- Ran `pnpm install` — dependencies installed (241 packages)
- Fixed Vitest win-rate test: player assignments were inverted (elite attackers in CB/LB/RB slots, giving weak team better defense); corrected IDs and changed assertion to `wins + draws > 55%` (outright win rate is mathematically bounded by draw frequency in low-scoring matches)
- Added `pnpm.allowBuild: ["esbuild"]` to `package.json` for pnpm 11 build approval
