import { describe, it, expect } from 'vitest'
import { simulateMatch } from '../matchEngine'
import type { Squad } from '@eternalxi/types'
import { players } from '@eternalxi/player-data'

function makeSquad(playerIds: string[], formation: Squad['formation'] = '4-3-3'): Squad {
  const slots: Squad['players'] = []
  const positions: Squad['players'][0]['assignedPosition'][] =
    ['GK', 'RB', 'CB', 'CB', 'LB', 'CM', 'CM', 'CM', 'RW', 'ST', 'LW']
  for (let i = 0; i < 11; i++) {
    const p = players.find(x => x.id === playerIds[i])!
    slots.push({ player: p, assignedPosition: positions[i] })
  }
  return { teamName: 'Test', formation, tactic: 'balanced', players: slots }
}

// GK, RB, CB, CB, LB, CM, CM, CM, RW, ST, LW
// Elite: proper defenders in back four + elite midfield/attack
const eliteIds = ['yashin', 'cafu', 'baresi', 'maldini', 'roberto-carlos', 'zidane', 'xavi', 'iniesta', 'cr7', 'pele', 'messi']
// Weak: attackers/midfielders in defensive slots (low defending stats)
const weakIds = ['buffon', 'beckham', 'raul', 'pirlo', 'de-bruyne', 'kaka', 'modric', 'rivaldo', 'figo', 'shevchenko', 'henry']

describe('matchEngine', () => {
  it('returns non-negative scores', () => {
    const r = simulateMatch(makeSquad(eliteIds), makeSquad(weakIds))
    expect(r.homeScore).toBeGreaterThanOrEqual(0)
    expect(r.awayScore).toBeGreaterThanOrEqual(0)
  })

  it('HT scores are not greater than FT scores', () => {
    const r = simulateMatch(makeSquad(eliteIds), makeSquad(weakIds))
    expect(r.htHomeScore).toBeLessThanOrEqual(r.homeScore)
    expect(r.htAwayScore).toBeLessThanOrEqual(r.awayScore)
  })

  it('possession sums to 100', () => {
    const r = simulateMatch(makeSquad(eliteIds), makeSquad(weakIds))
    expect(r.possession.home + r.possession.away).toBe(100)
  })

  it('all events reference valid player names', () => {
    const allNames = new Set(players.map(p => p.name))
    const r = simulateMatch(makeSquad(eliteIds), makeSquad(weakIds))
    for (const e of r.events) {
      expect(allNames.has(e.playerName), `Unknown player: ${e.playerName}`).toBe(true)
    }
  })

  it('events are sorted by minute', () => {
    const r = simulateMatch(makeSquad(eliteIds), makeSquad(weakIds))
    for (let i = 1; i < r.events.length; i++) {
      expect(r.events[i].minute).toBeGreaterThanOrEqual(r.events[i - 1].minute)
    }
  })

  it('higher-rated squad wins or draws in majority of matches', () => {
    let winsOrDraws = 0
    for (let i = 0; i < 200; i++) {
      const r = simulateMatch(makeSquad(eliteIds), makeSquad(weakIds))
      if (r.homeScore >= r.awayScore) winsOrDraws++
    }
    expect(winsOrDraws / 200).toBeGreaterThan(0.55)
  })
})
