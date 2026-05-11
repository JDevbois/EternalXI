import type { PositionedPlayer, PenaltyShootout, PenaltyKick, MatchEvent } from '@eternalxi/types'

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val))
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

function takeKick(shooterShooting: number, keeperGoalkeeping: number): boolean {
  const prob = clamp(0.65 + (shooterShooting - keeperGoalkeeping) * 0.003, 0.50, 0.85)
  return Math.random() < prob
}

function getKickers(players: PositionedPlayer[]): PositionedPlayer[] {
  return players.filter(p => p.assignedPosition !== 'GK')
}

function getGKGoalkeeping(players: PositionedPlayer[]): number {
  const gk = players.find(p => p.assignedPosition === 'GK')
  return gk?.player.stats.goalkeeping ?? 70
}

export interface PenaltyResult {
  shootout: PenaltyShootout
  events: MatchEvent[]
}

export function simulatePenalties(
  homePlayers: PositionedPlayer[],
  awayPlayers: PositionedPlayer[]
): PenaltyResult {
  const homeKickers = getKickers(homePlayers)
  const awayKickers = getKickers(awayPlayers)
  const homeGKSaving = getGKGoalkeeping(awayPlayers)
  const awayGKSaving = getGKGoalkeeping(homePlayers)

  const homeKicks: PenaltyKick[] = []
  const awayKicks: PenaltyKick[] = []
  const events: MatchEvent[] = []

  const usedHome = new Set<string>()
  const usedAway = new Set<string>()
  let minute = 91

  function pickShooter(pool: PositionedPlayer[], used: Set<string>): PositionedPlayer {
    const available = pool.filter(p => !used.has(p.player.id))
    const candidates = available.length > 0 ? available : pool
    const shooter = weightedRandom(candidates, p => p.player.stats.shooting)
    used.add(shooter.player.id)
    if (used.size >= pool.length) used.clear()
    return shooter
  }

  function recordKick(
    shooter: PositionedPlayer,
    scored: boolean,
    team: 'home' | 'away',
    kicks: PenaltyKick[]
  ) {
    kicks.push({ playerName: shooter.player.name, scored })
    events.push({
      type: scored ? 'PENALTY_SCORED' : 'PENALTY_MISSED',
      minute,
      team,
      playerName: shooter.player.name,
    })
    minute++
  }

  // 5 rounds
  for (let round = 0; round < 5; round++) {
    const homeShooter = pickShooter(homeKickers, usedHome)
    recordKick(homeShooter, takeKick(homeShooter.player.stats.shooting, homeGKSaving), 'home', homeKicks)

    const awayShooter = pickShooter(awayKickers, usedAway)
    recordKick(awayShooter, takeKick(awayShooter.player.stats.shooting, awayGKSaving), 'away', awayKicks)

    const homeGoals = homeKicks.filter(k => k.scored).length
    const awayGoals = awayKicks.filter(k => k.scored).length
    const remaining = 4 - round

    if (homeGoals > awayGoals + remaining || awayGoals > homeGoals + remaining) break
  }

  // Sudden death
  let homeGoals = homeKicks.filter(k => k.scored).length
  let awayGoals = awayKicks.filter(k => k.scored).length

  while (homeGoals === awayGoals) {
    const homeShooter = pickShooter(homeKickers, usedHome)
    recordKick(homeShooter, takeKick(homeShooter.player.stats.shooting, homeGKSaving), 'home', homeKicks)

    const awayShooter = pickShooter(awayKickers, usedAway)
    recordKick(awayShooter, takeKick(awayShooter.player.stats.shooting, awayGKSaving), 'away', awayKicks)

    homeGoals = homeKicks.filter(k => k.scored).length
    awayGoals = awayKicks.filter(k => k.scored).length
  }

  return {
    shootout: {
      home: homeKicks,
      away: awayKicks,
      homeScore: homeGoals,
      awayScore: awayGoals,
      winner: homeGoals > awayGoals ? 'home' : 'away',
    },
    events,
  }
}
