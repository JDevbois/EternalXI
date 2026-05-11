import type { Player, Position, WorldCupYear } from '@eternalxi/types'
import { players } from './players'
import { playersExtended } from './players-extended'
export { WC_EDITIONS, getWcEdition } from './historicalSquads'
export type { WcEdition } from './historicalSquads'

const allPlayers: Player[] = [...players, ...playersExtended]

export { players, playersExtended, allPlayers }

export function getAllPlayers(): Player[] {
  return allPlayers
}

export function getPlayerById(id: string): Player | undefined {
  return allPlayers.find(p => p.id === id)
}

export function getPlayersByPosition(position: Position): Player[] {
  return allPlayers.filter(p => p.positions.includes(position))
}

export function getPlayersByWorldCup(year: WorldCupYear): Player[] {
  return allPlayers.filter(p => p.worldCups.includes(year))
}

export function searchPlayers(query: string): Player[] {
  const q = query.toLowerCase()
  return allPlayers.filter(
    p =>
      p.name.toLowerCase().includes(q) ||
      p.nationality.toLowerCase().includes(q)
  )
}
