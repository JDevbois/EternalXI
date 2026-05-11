# Iteration 6 — Engine Depth & Polish

## Goal
Make matches feel more realistic, add tactical depth, and bring the presentation to a finished state — highlight reel, mobile layout, and advanced tactics.

## Engine Additions

### Stamina Degradation (`apps/web/src/engine/matchEngine.ts`)
Players tire in the second half. After minute 70, outfield players with low physical stats have their effective contribution reduced:

```
stamina = (physical * 0.8) + 20        // range ~36–99
after min 70: if stamina < 75, stats × 0.95
after min 80: if stamina < 75, stats × 0.90
```

Effect: rewards picking physically strong players and makes automatic substitutions (bench players fresh) strategically meaningful.

### Set Pieces

**Corners**:
- Each shot that misses has a 25% chance of generating a corner
- Corner → header attempt by the tallest CB or ST in the attacking team
- `P(header goal) = (physical + shooting) / 2 * 0.004`
- New event type: `CORNER_GOAL` (displayed as a headed goal in the timeline)

**Free kicks**:
- Yellow card events have a 30% chance of occurring in a dangerous position
- Dead-ball specialist (highest `shooting` stat in the squad) takes it
- `P(goal) = shooting * 0.003 + 0.04`, clamped 0.05–0.20
- New event type: `FREEKICK_GOAL`

Both are reflected in the match event timeline with distinct labels.

### Advanced Tactics
Replaces the current three-option tactic toggle (attacking / balanced / defensive) with three independent settings:

```typescript
interface Tactic {
  pressing: 'high' | 'medium' | 'low'
  passingStyle: 'direct' | 'possession'
  defensiveLine: 'high' | 'normal' | 'deep'
}
```

| Setting | Effect |
|---------|--------|
| Pressing: high | +0.06 own attack, +0.04 opponent counter-attack risk |
| Pressing: low | Physical-decay after min 70 is 40% slower |
| Passing: possession | −0.03 opponent shot frequency, +possession differential |
| Passing: direct | +0.05 attack speed, reduces passing stat contribution to possession |
| Defensive line: high | 10%/segment offside trap chance nullifies attack; fails 35% when avg opponent pace > 84 |
| Defensive line: deep | −0.04 attack, +0.06 defense vs counter-attacks |

The old `Tactic = 'attacking' | 'balanced' | 'defensive'` type is replaced. All existing squad data migrated to `{ pressing: 'medium', passingStyle: 'direct', defensiveLine: 'normal' }` as the neutral default.

### Updated: `apps/web/src/features/squad-builder/components/TacticsPanel.tsx`
Three dropdowns (pressing / passing style / defensive line) with a one-line tooltip explaining the in-game effect of each option. Replaces the current tactic button row.

## Match Highlight Reel

### `apps/web/src/features/match-report/components/HighlightReel.tsx`
Shown at the top of the match report, above the event timeline.

An animated top-down SVG pitch:
- For each goal event: a colored dot (team color) travels from the center circle toward the goal mouth, using a Framer Motion spring path
- "GOAL" stamp text appears over the net with a scale-in animation
- Events play sequentially with a short pause between them
- Set piece goals (corners, free kicks) have a distinct path animation (curved cross for corners, direct shot for free kicks)
- "Replay" button restarts the animation
- Skipped automatically after 8 seconds of inactivity

## Mobile Layout

### `apps/web/src/components/layout/MobileNav.tsx`
Bottom tab bar visible on viewports < 768px. Tabs:
- Home
- Build Squads
- World Cup
- Players

Hidden on desktop (sidebar-style nav is not added — desktop layout stays as-is).

### Responsive Fixes
- Squad builder: two-column layout collapses to single column on mobile; formation pitch scales to fill width
- Player picker modal: full-screen on mobile (removes the side detail panel, shows detail below the grid instead)
- Match report: stat bars stack vertically on narrow viewports
- Tournament bracket: scrollable horizontally on mobile

## Acceptance Criteria
- [ ] Stamina degradation measurably reduces late-game shot conversion in unit tests (compare seg 9 vs seg 18 for low-physical squads)
- [ ] Corner and free kick goals appear in event logs with correct types
- [ ] All three tactic dimensions work independently and produce measurable differences over 100 simulations
- [ ] Highlight reel plays all goal events in match order; "Replay" restarts correctly
- [ ] App is fully navigable on a 375px viewport (iPhone SE width)
- [ ] No horizontal scroll on any page at 375px
- [ ] Bottom nav correctly highlights the active tab
