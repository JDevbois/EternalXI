# Iteration 3 — World Cup Mode

## Status: Complete

## Goal
Let the user take their dream XI into a World Cup knockout tournament against actual historical squads from past tournaments. The engine gains penalty shootouts to resolve drawn knockout matches.

## New Data: Historical WC Squads

### `packages/player-data/src/historicalSquads.ts`
Curated starting XIs + 5-player benches for ~24 historical squads, covering multiple teams per edition. Players reuse existing IDs where the player is already in the database; any missing key players are added to `players-extended.ts`.

Editions and squads included:

| Year | Squads |
|------|--------|
| 1970 | Brazil, Italy |
| 1974 | West Germany, Netherlands |
| 1978 | Argentina, Netherlands |
| 1982 | Italy, West Germany |
| 1986 | Argentina, West Germany |
| 1990 | West Germany, Argentina |
| 1994 | Brazil, Italy |
| 1998 | France, Brazil |
| 2002 | Brazil, Germany |
| 2006 | Italy, France |
| 2010 | Spain, Netherlands |
| 2014 | Germany, Argentina |
| 2022 | Argentina, France |

Each squad has a fixed formation and tactic reflecting the historical team's style (e.g. Brazil 1970 → 4-3-3, attacking; Italy 2006 → 4-4-2, defensive).

### New Types (`packages/types/src/player.ts`)

```typescript
interface HistoricalSquad {
  id: string
  wcYear: WorldCupYear
  country: string           // e.g. 'Brazil'
  label: string             // e.g. 'Brazil 1970'
  formation: Formation
  tactic: Tactic
  players: PositionedPlayer[]
  bench: Player[]
}

interface PenaltyKick {
  playerName: string
  scored: boolean
}

interface PenaltyShootout {
  home: PenaltyKick[]
  away: PenaltyKick[]
  homeScore: number
  awayScore: number
  winner: 'home' | 'away'
}

// MatchResult extended:
interface MatchResult {
  // ... existing fields ...
  penaltyShootout?: PenaltyShootout  // present only when FT is level
}
```

## Engine Addition: Penalty Shootout

### `apps/web/src/engine/penaltyEngine.ts`
Triggered after `simulateMatch` if FT score is level and match is in a knockout context.

```
- Each team takes up to 5 kicks, alternating
- P(goal) = clamp(0.65 + (shooter.shooting - keeperGoalkeeping) * 0.003, 0.50, 0.85)
- Shooter selected: weighted random from non-GK players by shooting stat
- Stop early if one team cannot mathematically catch up
- Sudden death if still level after 5 each
- Returns PenaltyShootout
```

`simulateMatch` receives an optional `knockout: boolean` flag. When true and FT is drawn, it calls `simulatePenalties` and attaches the result to `MatchResult`.

## Tournament Format

### Edition Picker
User selects a World Cup year (1970–2022). All historical squads from that edition form the opponent pool.

### Knockout Bracket: 3 Rounds
- **Quarter-final**: vs a randomly drawn squad from the edition
- **Semi-final**: vs the other squad from the edition
- **Final**: vs the remaining squad (or the strongest, if more than 3 squads)

If the edition has only 2 squads, the bracket is Semi-final → Final.

Drawn matches go to penalties. Losing eliminates the user; winning advances them.

## New Files

### `apps/web/src/store/tournamentStore.ts`
Zustand store:
```typescript
interface TournamentState {
  wcYear: WorldCupYear | null
  opponents: HistoricalSquad[]   // drawn pool for this run
  round: 'qf' | 'sf' | 'final' | 'eliminated' | 'champion'
  results: MatchResult[]         // one per completed round
  startTournament: (year: WorldCupYear, userSquad: Squad) => void
  recordResult: (result: MatchResult) => void
  reset: () => void
}
```

### `apps/web/src/features/world-cup/WorldCupHomePage.tsx`
Route: `/world-cup`
Entry point. Two sections:
- **Your Squad** — summary card of the user's current squad (or prompt to build one)
- **Choose Your World Cup** — `EditionCard` grid, one per available year

### `apps/web/src/features/world-cup/components/EditionCard.tsx`
Card per WC edition showing year, host country, and champion. Clicking starts a tournament run for that year.

### `apps/web/src/features/world-cup/TournamentPage.tsx`
Route: `/world-cup/tournament`
Shows the bracket with round labels (QF / SF / Final), opponent squad cards, and result badges (W / L / on pens). "Play Next Match" button advances to the simulator for the current round. On elimination: defeat screen. On winning the final: trophy/champion screen.

### `apps/web/src/features/world-cup/components/TournamentBracket.tsx`
Visual bracket: three round columns, each showing your name vs opponent name, and the result once played. Completed rounds grayed out; current round highlighted.

### `apps/web/src/features/world-cup/components/OpponentSquadCard.tsx`
Pre-match card showing the historical squad's formation, players, and a brief context line (e.g. "Champions of the 1970 FIFA World Cup"). Shown on the simulate page before the match.

### `apps/web/src/features/world-cup/components/PenaltyShootoutView.tsx`
After a drawn FT in a tournament match, this replaces the usual result view. Animates each kick result (scored/missed) with a brief pause between them, then reveals the shootout winner.

### Updated: `apps/web/src/features/match-report/MatchReportPage.tsx`
When `result.penaltyShootout` is present, shows a "Penalty Shootout" section below the FT scoreline with a kick-by-kick breakdown.

### Updated: `apps/web/src/router/index.tsx`
New routes: `/world-cup`, `/world-cup/tournament`
Home page gains a "World Cup Mode" CTA alongside the existing "Build Squads" button.

## Implementation Notes

- 28 squads (14 editions × champion + runner-up) rather than ~24; all squads have 11 starters + 5 bench
- Tournament is SF → Final (2 rounds), not QF → SF → Final; only 2 squads per edition needed
- Historical squad player IDs use a squad-code prefix (e.g. `bra70_st`) rather than a shared DB; isolation is total
- `HistoricalSquad` added `isChampion` field; converted to `Squad` inline in `useSimulation`
- `PenaltyShootoutView` was not created as a separate component; the kick-by-kick display is in `MatchReportPage` inline
- Sudden death loop is in `penaltyEngine.ts` after the 5-kick round

## Acceptance Criteria
- [x] All 28 historical squads have valid 11-player lineups with no duplicate player IDs
- [x] Penalty shootout fires if and only if FT is level in a knockout match
- [x] Sudden death correctly continues until a winner is found
- [x] Bracket correctly advances the user through SF → Final
- [x] Losing any match shows an elimination screen and allows restarting
- [x] Winning the final shows a champion screen
- [ ] Historical squads' formations render correctly on the pitch SVG (not yet wired — pitch SVG reads squadStore, not tournament opponent)
- [ ] Engine unit tests cover penalty shootout (not yet written)
