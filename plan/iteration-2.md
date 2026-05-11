# Iteration 2 — Simulation Depth

## Status: Complete

## Goal
Grow the player pool to ~100, add automatic in-match substitutions, a two-half engine with momentum and red cards, stat radar charts, and a richer squad builder with bench slots.

## What Was Built

### Player Data
- Added ~55 players in `packages/player-data/src/players-extended.ts`
- Replaced `era: 'classic' | 'modern'` with `worldCups: WorldCupYear[]` — players classified by which World Cups they actually attended
- Removed players who never attended a World Cup (Cantona, Giggs, Nedvěd, Haaland)
- `WorldCupYear = '1958' | '1962' | ... | '2022'`
- `getAllPlayers()` merges both files and returns ~98 players

### Engine
- Rewrote `matchEngine.ts`: two halves (9 segments × 5 min each) + injury time per half
- `MomentumTracker` class: +15 on goal, decay 4%/segment toward 50, ±0.05 attack bonus at extremes
- Red cards: 1.5%/segment; man-down multipliers (1 red → ×0.88, 2 reds → ×0.78)
- Strengths recomputed per segment (not once at match start)
- **Automatic substitutions**: engine auto-generates subs at minutes 60/65/70/77/84, replacing the weakest same-position-group starter with each bench player in order
- Extended `MatchStats` with `redCards`, `passes`, `passAccuracy`

### Squad Builder
- `SubstituteBench` — 5 bench slots per team with add/clear/replace picker
- `PlayerDetailPanel` — hover side-panel with stat bars, radar chart, WC year badges
- `PlayerStatRadar` — recharts RadarChart hexagon (6 stats, GK-aware labels)
- `PlayerPickerModal` — extended with side-by-side detail panel on hover; filter row replaced with Nation + World Cup multiselect dropdowns (`MultiSelectDropdown` component); Nations list scoped to position-eligible players
- `MultiSelectDropdown` — reusable checkbox popover with `align` prop to prevent modal overflow

### Match Report
- `ScoreboardHeader` — shared animated scoreboard component (live + full-time modes)
- `EventTimeline` — events split into first/second half with dividers; substitution display
- `MatchStatsPanel` — full expanded stats panel

### Formation Fix
- Fixed 3-5-2 CDM coordinate: CDM was positioned more attacking than the CMs (y-axis is inverted — y=88 is GK end); corrected to y=60

### Misc
- `useSimulation` hook wraps `simulateMatch` with react-hot-toast error handling
- Player grid and detail panel in modals set to fixed `h-[480px]` (≈ 3 card rows) with scroll
- World Cup year filter buttons ordered chronologically (1958 → 2022)
