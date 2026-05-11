import type {
  Squad,
  MatchResult,
  MatchEvent,
  MatchStats,
  PositionedPlayer,
  Player,
  Substitution,
  Position,
} from '@eternalxi/types'
import { MomentumTracker } from './momentum'
import { simulatePenalties } from './penaltyEngine'

function posGroup(pos: Position): 'gk' | 'def' | 'mid' | 'att' {
  if (pos === 'GK') return 'gk'
  if (pos === 'CB' || pos === 'LB' || pos === 'RB') return 'def'
  if (pos === 'CDM' || pos === 'CM' || pos === 'CAM') return 'mid'
  return 'att'
}

const AUTO_SUB_MINUTES = [60, 65, 70, 77, 84] as const

function planAutoSubs(starters: PositionedPlayer[], bench: Player[]): Substitution[] {
  const subs: Substitution[] = []
  const subbedOutIds = new Set<string>()

  for (let i = 0; i < Math.min(bench.length, AUTO_SUB_MINUTES.length); i++) {
    const benchPlayer = bench[i]
    const minute = AUTO_SUB_MINUTES[i]
    const group = posGroup(benchPlayer.primaryPosition)

    const sameGroup = starters.filter(
      s => !subbedOutIds.has(s.player.id) && s.assignedPosition !== 'GK' && posGroup(s.assignedPosition) === group
    )
    const pool = sameGroup.length > 0
      ? sameGroup
      : starters.filter(s => !subbedOutIds.has(s.player.id) && s.assignedPosition !== 'GK')

    if (pool.length === 0) continue
    const target = pool.reduce((min, p) => p.player.stats.overall < min.player.stats.overall ? p : min)

    subbedOutIds.add(target.player.id)
    subs.push({ minute, playerOutId: target.player.id, playerInId: benchPlayer.id })
  }

  return subs
}

function weightedRandom<T>(items: T[], weightFn: (item: T) => number): T {
  const weights = items.map(weightFn)
  const total = weights.reduce((a, b) => a + b, 0)
  let rand = Math.random() * total
  for (let i = 0; i < items.length; i++) {
    rand -= weights[i]
    if (rand <= 0) return items[i]
  }
  return items[items.length - 1]
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val))
}

function attackStrength(players: PositionedPlayer[]): number {
  const outfield = players.filter(p => p.assignedPosition !== 'GK')
  if (outfield.length === 0) return 0.5
  const total = outfield.reduce((sum, p) => {
    const s = p.player.stats
    return sum + (s.shooting * 0.4 + s.dribbling * 0.3 + s.passing * 0.2 + s.pace * 0.1) / 99
  }, 0)
  return total / outfield.length
}

function defenseStrength(players: PositionedPlayer[]): number {
  const defenders = players.filter(p =>
    ['CB', 'LB', 'RB', 'CDM'].includes(p.assignedPosition)
  )
  const pool = defenders.length > 0 ? defenders : players.filter(p => p.assignedPosition !== 'GK')
  if (pool.length === 0) return 0.5
  const total = pool.reduce((sum, p) => {
    const s = p.player.stats
    return sum + (s.defending * 0.5 + s.physical * 0.3 + s.pace * 0.2) / 99
  }, 0)
  return total / pool.length
}

function avgPassing(players: PositionedPlayer[]): number {
  const outfield = players.filter(p => p.assignedPosition !== 'GK')
  if (outfield.length === 0) return 70
  return outfield.reduce((s, p) => s + p.player.stats.passing, 0) / outfield.length
}

function tacticBonus(tactic: string): { atk: number; def: number } {
  if (tactic === 'attacking') return { atk: 0.08, def: -0.05 }
  if (tactic === 'defensive') return { atk: -0.05, def: 0.08 }
  return { atk: 0, def: 0 }
}

function manDownMultiplier(redCards: number): number {
  if (redCards >= 2) return 0.78
  if (redCards === 1) return 0.88
  return 1
}

function getGK(players: PositionedPlayer[]): Player | null {
  return players.find(p => p.assignedPosition === 'GK')?.player ?? null
}

function scorerPool(players: PositionedPlayer[]): PositionedPlayer[] {
  const att = players.filter(p => ['ST', 'LW', 'RW', 'CAM'].includes(p.assignedPosition))
  return att.length > 0 ? att : players.filter(p => p.assignedPosition !== 'GK')
}

function assisterPool(players: PositionedPlayer[], scorer: PositionedPlayer): PositionedPlayer[] {
  return players.filter(
    p => p !== scorer && ['CM', 'CDM', 'CAM', 'LW', 'RW', 'RB', 'LB'].includes(p.assignedPosition)
  )
}

function applySubstitutions(
  activePlayers: PositionedPlayer[],
  bench: Player[],
  plannedSubs: Substitution[],
  minute: number,
  events: MatchEvent[],
  team: 'home' | 'away'
): PositionedPlayer[] {
  let lineup = [...activePlayers]
  for (const sub of plannedSubs) {
    if (sub.minute !== minute) continue
    const outIdx = lineup.findIndex(p => p.player.id === sub.playerOutId)
    const benchPlayer = bench.find(p => p.id === sub.playerInId)
    if (outIdx === -1 || !benchPlayer) continue

    const outPlayer = lineup[outIdx]
    const newPositioned: PositionedPlayer = {
      player: benchPlayer,
      assignedPosition: outPlayer.assignedPosition,
    }
    lineup = [
      ...lineup.slice(0, outIdx),
      newPositioned,
      ...lineup.slice(outIdx + 1),
    ]
    events.push({
      type: 'SUBSTITUTION',
      minute,
      team,
      playerName: benchPlayer.name,
      assistName: outPlayer.player.name,
    })
  }
  return lineup
}

interface SegmentResult {
  events: MatchEvent[]
  homeGoals: number
  awayGoals: number
  homeRedCards: number
  awayRedCards: number
  updatedHomePlayers: PositionedPlayer[]
  updatedAwayPlayers: PositionedPlayer[]
}

function simulateSegment(
  segmentStart: number,
  homePlayers: PositionedPlayer[],
  awayPlayers: PositionedPlayer[],
  homeTacticBonus: { atk: number; def: number },
  awayTacticBonus: { atk: number; def: number },
  homeAdvantage: number,
  homeRedCards: number,
  awayRedCards: number,
  momentum: MomentumTracker,
  stats: MatchStats,
  homeSubs: Substitution[],
  awaySubs: Substitution[],
  homeBench: Player[],
  awayBench: Player[]
): SegmentResult {
  const events: MatchEvent[] = []
  let homeGoals = 0
  let awayGoals = 0
  let newHomeRedCards = 0
  let newAwayRedCards = 0

  // Apply planned substitutions at this exact minute
  let currentHomePlayers = applySubstitutions(homePlayers, homeBench, homeSubs, segmentStart, events, 'home')
  let currentAwayPlayers = applySubstitutions(awayPlayers, awayBench, awaySubs, segmentStart, events, 'away')

  const homeManDown = manDownMultiplier(homeRedCards)
  const awayManDown = manDownMultiplier(awayRedCards)

  const homeRaw = attackStrength(currentHomePlayers)
  const awayRaw = attackStrength(currentAwayPlayers)
  const homeDef = defenseStrength(currentHomePlayers)
  const awayDef = defenseStrength(currentAwayPlayers)

  const homeAtk = clamp(
    (homeRaw + homeTacticBonus.atk + homeAdvantage + momentum.atkBonus('home')) * homeManDown,
    0.1, 1.0
  )
  const awayAtk = clamp(
    (awayRaw + awayTacticBonus.atk + momentum.atkBonus('away')) * awayManDown,
    0.1, 1.0
  )
  const homeDefFinal = clamp((homeDef + homeTacticBonus.def) * homeManDown, 0.1, 1.0)
  const awayDefFinal = clamp((awayDef + awayTacticBonus.def) * awayManDown, 0.1, 1.0)

  const homeGK = getGK(currentAwayPlayers)
  const awayGK = getGK(currentHomePlayers)

  const pairs: Array<{
    team: 'home' | 'away'
    atk: number
    def: number
    attackers: PositionedPlayer[]
    savingGK: Player | null
  }> = [
    { team: 'home', atk: homeAtk, def: awayDefFinal, attackers: currentHomePlayers, savingGK: homeGK },
    { team: 'away', atk: awayAtk, def: homeDefFinal, attackers: currentAwayPlayers, savingGK: awayGK },
  ]

  for (const { team, atk, def, attackers, savingGK } of pairs) {
    const minute = segmentStart + Math.floor(Math.random() * 5) + 1
    const shotProb = clamp((atk - def * 0.7) * 0.15 + 0.05, 0.02, 0.25)

    if (Math.random() < shotProb) {
      stats.shots[team]++
      const goalProb = clamp(atk * 0.35, 0.08, 0.55)

      if (Math.random() < goalProb) {
        stats.shotsOnTarget[team]++
        const pool = scorerPool(attackers)
        const scored = weightedRandom(pool, p => p.player.stats.shooting)
        const assisted = assisterPool(attackers, scored)
        const assister = assisted.length > 0
          ? weightedRandom(assisted, p => p.player.stats.passing)
          : null

        events.push({
          type: 'GOAL',
          minute,
          team,
          playerName: scored.player.name,
          assistName: assister?.player.name,
        })
        momentum.onGoal(team)
        if (team === 'home') homeGoals++
        else awayGoals++
      } else {
        stats.shotsOnTarget[team]++
        if (savingGK) {
          const savingTeam = team === 'home' ? 'away' : 'home'
          events.push({
            type: 'SAVE',
            minute,
            team: savingTeam,
            playerName: savingGK.name,
          })
        }
      }
    }

    // Yellow card (8% per segment per team)
    if (Math.random() < 0.08) {
      const cardMinute = segmentStart + Math.floor(Math.random() * 5) + 1
      const allOutfield = attackers.filter(p => p.assignedPosition !== 'GK')
      if (allOutfield.length > 0) {
        const carded = allOutfield[Math.floor(Math.random() * allOutfield.length)]
        events.push({ type: 'YELLOW_CARD', minute: cardMinute, team, playerName: carded.player.name })
        stats.yellowCards[team]++
        stats.fouls[team]++
      }
    }

    // Red card (1.5% per segment per team)
    if (Math.random() < 0.015) {
      const cardMinute = segmentStart + Math.floor(Math.random() * 5) + 1
      const allOutfield = attackers.filter(p => p.assignedPosition !== 'GK')
      if (allOutfield.length > 0) {
        const carded = allOutfield[Math.floor(Math.random() * allOutfield.length)]
        events.push({ type: 'RED_CARD', minute: cardMinute, team, playerName: carded.player.name })
        stats.redCards[team]++
        stats.fouls[team]++
        if (team === 'home') newHomeRedCards++
        else newAwayRedCards++
      }
    }
  }

  momentum.decay()

  return {
    events,
    homeGoals,
    awayGoals,
    homeRedCards: newHomeRedCards,
    awayRedCards: newAwayRedCards,
    updatedHomePlayers: currentHomePlayers,
    updatedAwayPlayers: currentAwayPlayers,
  }
}

function injuryTime(): number {
  return Math.floor(Math.random() * 5) + 1
}

export interface SimulateMatchOptions {
  knockout?: boolean
}

export function simulateMatch(homeSquad: Squad, awaySquad: Squad, options: SimulateMatchOptions = {}): MatchResult {
  const stats: MatchStats = {
    shots: { home: 0, away: 0 },
    shotsOnTarget: { home: 0, away: 0 },
    fouls: { home: 0, away: 0 },
    yellowCards: { home: 0, away: 0 },
    redCards: { home: 0, away: 0 },
    corners: { home: 0, away: 0 },
    passes: { home: 0, away: 0 },
    passAccuracy: { home: 0, away: 0 },
  }

  const homeBonus = tacticBonus(homeSquad.tactic)
  const awayBonus = tacticBonus(awaySquad.tactic)
  const momentum = new MomentumTracker()

  const homeBench: Player[] = homeSquad.bench ?? []
  const awayBench: Player[] = awaySquad.bench ?? []
  const homeSubs = planAutoSubs(homeSquad.players, homeBench)
  const awaySubs = planAutoSubs(awaySquad.players, awayBench)

  const allEvents: MatchEvent[] = []
  let homeScore = 0
  let awayScore = 0
  let htHomeScore = 0
  let htAwayScore = 0
  let homeRedCards = 0
  let awayRedCards = 0

  let homePlayers = [...homeSquad.players]
  let awayPlayers = [...awaySquad.players]

  // First half: segments 0–8 (minutes 0–45)
  for (let seg = 0; seg < 9; seg++) {
    const segStart = seg * 5
    const result = simulateSegment(
      segStart,
      homePlayers, awayPlayers,
      homeBonus, awayBonus,
      0.04, // home advantage
      homeRedCards, awayRedCards,
      momentum, stats,
      homeSubs, awaySubs,
      homeBench, awayBench
    )
    allEvents.push(...result.events)
    homeScore += result.homeGoals
    awayScore += result.awayGoals
    homeRedCards += result.homeRedCards
    awayRedCards += result.awayRedCards
    homePlayers = result.updatedHomePlayers
    awayPlayers = result.updatedAwayPlayers
  }

  // First half injury time
  const ht1InjuryTime = injuryTime()
  {
    const result = simulateSegment(
      45, homePlayers, awayPlayers,
      homeBonus, awayBonus, 0.04,
      homeRedCards, awayRedCards,
      momentum, stats, homeSubs, awaySubs, homeBench, awayBench
    )
    // Clamp events to within injury window
    result.events.forEach(e => { e.minute = clamp(e.minute, 45, 45 + ht1InjuryTime) })
    allEvents.push(...result.events)
    homeScore += result.homeGoals
    awayScore += result.awayGoals
    homeRedCards += result.homeRedCards
    awayRedCards += result.awayRedCards
    homePlayers = result.updatedHomePlayers
    awayPlayers = result.updatedAwayPlayers
  }

  htHomeScore = homeScore
  htAwayScore = awayScore

  // Second half: segments 0–8 mapped to minutes 45–90
  // Sub windows: minute 45 (seg start), 60, 70, 80
  for (let seg = 0; seg < 9; seg++) {
    const segStart = 45 + seg * 5
    const result = simulateSegment(
      segStart,
      homePlayers, awayPlayers,
      homeBonus, awayBonus, 0.04,
      homeRedCards, awayRedCards,
      momentum, stats, homeSubs, awaySubs, homeBench, awayBench
    )
    allEvents.push(...result.events)
    homeScore += result.homeGoals
    awayScore += result.awayGoals
    homeRedCards += result.homeRedCards
    awayRedCards += result.awayRedCards
    homePlayers = result.updatedHomePlayers
    awayPlayers = result.updatedAwayPlayers
  }

  // Second half injury time
  const ht2InjuryTime = injuryTime()
  {
    const result = simulateSegment(
      90, homePlayers, awayPlayers,
      homeBonus, awayBonus, 0.04,
      homeRedCards, awayRedCards,
      momentum, stats, homeSubs, awaySubs, homeBench, awayBench
    )
    result.events.forEach(e => { e.minute = clamp(e.minute, 90, 90 + ht2InjuryTime) })
    allEvents.push(...result.events)
    homeScore += result.homeGoals
    awayScore += result.awayGoals
    homePlayers = result.updatedHomePlayers
    awayPlayers = result.updatedAwayPlayers
  }

  stats.corners.home = Math.floor(stats.shots.home * 0.3)
  stats.corners.away = Math.floor(stats.shots.away * 0.3)

  const homePass = avgPassing(homePlayers)
  const awayPass = avgPassing(awayPlayers)
  const totalPass = homePass + awayPass
  const possession = {
    home: Math.round((homePass / totalPass) * 100),
    away: Math.round((awayPass / totalPass) * 100),
  }

  stats.passes.home = Math.round(homePass * 5)
  stats.passes.away = Math.round(awayPass * 5)
  stats.passAccuracy.home = Math.round(clamp(homePass / 99 * 95, 55, 95))
  stats.passAccuracy.away = Math.round(clamp(awayPass / 99 * 95, 55, 95))

  allEvents.sort((a, b) => a.minute - b.minute)

  let penaltyShootout: import('@eternalxi/types').PenaltyShootout | undefined
  if (options.knockout && homeScore === awayScore) {
    const { shootout, events: penaltyEvents } = simulatePenalties(homePlayers, awayPlayers)
    penaltyShootout = shootout
    allEvents.push(...penaltyEvents)
  }

  return {
    homeScore,
    awayScore,
    htHomeScore,
    htAwayScore,
    possession,
    events: allEvents,
    stats,
    penaltyShootout,
  }
}
