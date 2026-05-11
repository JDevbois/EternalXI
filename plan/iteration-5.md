# Iteration 5 — Player Profiles & Discovery

## Goal
Give players a life beyond the picker modal. Users can browse the full roster, read about each player's career, compare two players head-to-head, and see pre-match odds before simulating.

## New Data: Player Bios

### `packages/player-data/src/playerBios.ts`
Short curated metadata per player — kept brief so it's maintainable by hand:

```typescript
interface PlayerBio {
  id: string
  peakYears: string          // e.g. '1969–1974'
  playingStyle: string       // 2–3 sentences, factual
  achievements: string[]     // e.g. ['World Cup 1970', 'Ballon d\'Or 1959, 1960, 1961']
}
```

One entry for every player in the database. Exported as a `Record<string, PlayerBio>` and merged into the player data index.

## New Pages

### `apps/web/src/features/players/PlayerDirectoryPage.tsx`
Route: `/players`

Browsable grid of all players. Filters:
- Name search (text input)
- Position (multiselect — reuses `MultiSelectDropdown`)
- Nationality (multiselect)
- World Cup year (multiselect)

Each result is a `PlayerCard`. Clicking navigates to `/players/:id`. No pagination — all players render at once.

### `apps/web/src/features/players/PlayerProfilePage.tsx`
Route: `/players/:id`

Full-page player profile:
- Large position-colored header band with name, nationality, position, overall badge
- `PlayerStatRadar` hexagon
- Stat bars for all 7 attributes
- Peak years + playing style (from `PlayerBio`)
- Achievement list
- World Cup year badges (reuses the badge style from `PlayerDetailPanel`)
- "Add to Home Squad" / "Add to Away Squad" shortcuts — opens squad builder with this player pre-selected for a compatible slot (or shows a toast if no compatible slot is open)
- "Compare with…" button — opens a player search modal, then navigates to `/compare/:id1/:id2`

### `apps/web/src/features/players/PlayerComparisonPage.tsx`
Route: `/compare/:id1/:id2`

Side-by-side comparison of two players:
- Two `PlayerCard` columns at the top
- Attribute-by-attribute stat bars, winner of each highlighted
- Overlaid `PlayerStatRadar` (two datasets on one hexagon — different colored lines)
- World Cup appearances compared
- "Swap" button to swap player 1 and player 2
- "Pick different player" replaces either slot (opens player search modal)

## Pre-Match Odds

### `apps/web/src/lib/matchOdds.ts`
Pure function — no server needed:

```typescript
function calculateOdds(
  homeSquad: Squad,
  awaySquad: Squad,
  iterations = 200
): { homeWin: number; draw: number; awayWin: number }
```

Runs `simulateMatch` 200 times, counts outcomes, returns percentages. 200 iterations runs in <100ms in the browser.

### Updated: `apps/web/src/features/match-simulator/MatchSimulatorPage.tsx`
Pre-match view gains an odds bar:
- Three segments: Home Win % / Draw % / Away Win %
- Calculated on page load (or when squads change)
- Shows a brief "Calculating…" state while running
- Styled as a vintage betting slip

## Navigation Updates

### Home Page
New "Player Directory" entry point alongside "Play Match" and "World Cup Mode".

### `apps/web/src/router/index.tsx`
New routes: `/players`, `/players/:id`, `/compare/:id1/:id2`

## Acceptance Criteria
- [ ] All players have a bio entry; profile page renders for every player without errors
- [ ] Directory filters work in combination (nation + position + WC year)
- [ ] Comparison radar renders two overlaid datasets correctly
- [ ] "Add to squad" shortcut correctly places the player in the first open compatible slot
- [ ] Odds bar always sums to 100%; updates if the user navigates back and changes squads
- [ ] 200-simulation odds calculation completes in under 200ms on a mid-range device
