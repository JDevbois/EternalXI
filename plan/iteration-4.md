# Iteration 4 — World Cup Mode: Full Tournament

## Goal
Transform the World Cup mode from a 2-round exhibition into a proper tournament — group phase, full knockout bracket, and all historically notable squads available as opponents and as squad presets. Every player who ever appeared in a historical squad becomes available in the squad builder.

---

## Data Expansion

### `packages/player-data/src/historicalSquads.ts` — major expansion
Expand from 2 squads per edition (champion + runner-up) to **8 squads per edition** — the quarterfinalists or the 8 strongest/most recognisable teams for that tournament.

| Edition | Squads added (beyond champion + runner-up) |
|---------|---------------------------------------------|
| 1970    | England, West Germany, Uruguay, Peru |
| 1974    | Poland, Brazil, Yugoslavia, Sweden |
| 1978    | Brazil, Italy, Peru, Austria |
| 1982    | Poland, France, Brazil, England |
| 1986    | France, Belgium, Spain, Mexico |
| 1990    | Italy, England, Yugoslavia, Czechoslovakia |
| 1994    | Sweden, Bulgaria, Romania, Netherlands |
| 1998    | Croatia, Netherlands, Italy, Germany |
| 2002    | South Korea, Turkey, Senegal, England |
| 2006    | Germany, Portugal, England, Ukraine |
| 2010    | Uruguay, Germany, Ghana, Brazil |
| 2014    | Brazil, Netherlands, Colombia, Belgium |
| 2018    | Belgium, England, Uruguay, Brazil |
| 2022    | Morocco, Croatia, Netherlands, Brazil |

Each squad: 11 positioned starters + 5 bench, formation, tactic. Player IDs unified with main DB (see below).

### Player ID unification
Current historical squads use isolated `bra70_st`-style IDs that are invisible to the squad builder. Fix:

- **Existing main DB players** (those already in `players.ts` / `players-extended.ts`): historical squads reference their existing ID.
- **Missing players** (present in a historical squad but not yet in the main DB): added to `packages/player-data/src/players-extended.ts` with full stats. These become available in the squad builder like any other player.

After this change, `getAllPlayers()` covers every player ever included in a historical squad. The squad builder picker will surface them naturally through position and World Cup year filters.

### `WcEdition` type update (`packages/player-data/src/historicalSquads.ts`)
```typescript
interface WcEdition {
  year: WorldCupYear
  host: string
  champion: HistoricalSquad
  runnerUp: HistoricalSquad
  groups: HistoricalSquad[][]   // 2 groups of 4 squads (champion + runnerUp placed into groups)
}
```
`groups` contains 2 arrays of 4 teams each. The champion and runner-up are distributed across the two groups. The user's team replaces one of the group-A teams (randomly selected at tournament start).

---

## Tournament Format

### Group phase (2 groups of 4)
- User is seeded into **Group A**; one CPU team is displaced to Group B.
- User plays **3 group matches** sequentially (vs the other 3 teams in Group A).
- The other 6 CPU vs CPU group matches are **auto-simulated** (engine runs silently, no play-through).
- Points: Win = 3, Draw = 1, Loss = 0. Tiebreaker: goal difference → goals scored.
- Top 2 from each group advance to the semi-finals.

### Knockout phase
- **Semi-finals**: Group A 1st vs Group B 2nd · Group B 1st vs Group A 2nd.
- **Final**: SF winners.
- Draws go to penalties (existing engine).
- Losing eliminates the user; winning advances.

### Tournament state — `apps/web/src/store/tournamentStore.ts` (major rewrite)
```typescript
interface GroupEntry {
  squad: HistoricalSquad | null  // null = user's team
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  points: number
}

type TournamentPhase =
  | 'idle'
  | 'group'          // user playing group stage matches
  | 'semifinal'
  | 'final'
  | 'champion'
  | 'eliminated'

interface TournamentState {
  wcYear: WorldCupYear | null
  edition: WcEdition | null
  phase: TournamentPhase
  groupA: GroupEntry[]
  groupB: GroupEntry[]
  groupMatchIndex: number     // 0–2, which group game comes next
  results: MatchResult[]
  lastOpponent: HistoricalSquad | null
  startTournament: (year: WorldCupYear) => void
  recordGroupResult: (result: MatchResult) => void
  advanceToKnockout: () => void
  recordKnockoutResult: (result: MatchResult) => void
  reset: () => void
}
```

---

## Squad Presets

### `apps/web/src/features/squad-builder/components/PresetPicker.tsx`
A "Load Historical Squad" button added to the `SquadPanel`. Opens a two-step modal:
1. **Pick edition** — grid of edition cards (reuses `EditionCard` style)
2. **Pick team** — list of all 8 squads for that edition

On confirm:
- Sets the squad's formation and tactic to match the historical team
- Fills all 11 slots with the historical players (using their shared DB IDs)
- Fills the bench with the historical bench players
- Closes the modal

This lets users play as Brazil 1970, Germany 2014, etc. in either squad builder mode (Play Match or World Cup).

---

## UI Updates

### `apps/web/src/features/world-cup/components/GroupStandings.tsx`
Table component showing a group's current standings: team name, P, W, D, L, GD, Pts. User's team row highlighted. Used on `TournamentPage` during the group phase.

### `apps/web/src/features/world-cup/TournamentPage.tsx` (updated)
Two states:

**Group phase view:**
- Group A standings table (with user's team)
- Group B standings table (auto-simulated, shows results)
- "Next Match" card: opponent squad card + "Play Match" button
- After 3 group matches: "Advance to Knockout" button (if qualified) or "Eliminated" screen

**Knockout view:**
- SF bracket + Final bracket (same `TournamentBracket` component, extended to show 3 rounds)
- Current round opponent card + "Play Match" button

### `apps/web/src/features/world-cup/WorldCupHomePage.tsx` (minor update)
Edition cards updated to show "8 squads" badge instead of just champion + runner-up.

---

## Acceptance Criteria
- [ ] All 8 × 14 = 112 squads have valid 11-player lineups; no duplicate player IDs within a squad
- [ ] Every historical squad player appears in `getAllPlayers()` and is selectable in the squad builder picker
- [ ] Preset picker correctly loads formation, tactic, and all 11 players into the squad builder
- [ ] Group stage: user plays exactly 3 matches; CPU vs CPU results are auto-simulated and reflected in standings
- [ ] Points / goal difference tiebreakers correctly determine the top 2 in each group
- [ ] Knockout: SF draw is correct (Group A 1st vs Group B 2nd, etc.)
- [ ] Tournament completes correctly through SF → Final → champion/eliminated screens
