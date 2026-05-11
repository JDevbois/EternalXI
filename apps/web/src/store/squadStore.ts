import { create } from 'zustand'
import type { Formation, Tactic, PositionedPlayer, Player, Position } from '@eternalxi/types'
import { FORMATIONS } from '@/lib/formations'
import { getAllPlayers } from '@eternalxi/player-data'

export interface BuilderSquad {
  teamName: string
  formation: Formation
  tactic: Tactic
  slots: (PositionedPlayer | null)[]
  bench: (Player | null)[]
}

function makeEmptySlots(formation: Formation): (PositionedPlayer | null)[] {
  return FORMATIONS[formation].map(() => null)
}

function defaultSquad(teamName: string): BuilderSquad {
  const formation: Formation = '4-3-3'
  return {
    teamName,
    formation,
    tactic: 'balanced',
    slots: makeEmptySlots(formation),
    bench: [null, null, null, null, null],
  }
}

interface SquadState {
  home: BuilderSquad
  away: BuilderSquad
  setTeamName: (side: 'home' | 'away', name: string) => void
  setFormation: (side: 'home' | 'away', f: Formation) => void
  setTactic: (side: 'home' | 'away', t: Tactic) => void
  setSlotPlayer: (side: 'home' | 'away', slotIndex: number, pp: PositionedPlayer | null) => void
  setBenchPlayer: (side: 'home' | 'away', benchIndex: number, player: Player | null) => void
  isComplete: (side: 'home' | 'away') => boolean
  getUsedPlayerIds: () => Set<string>
  randomizeSquad: (side: 'home' | 'away') => void
  reset: () => void
}

export const useSquadStore = create<SquadState>((set, get) => ({
  home: defaultSquad('Home'),
  away: defaultSquad('Away'),

  setTeamName: (side, name) =>
    set(s => ({ [side]: { ...s[side], teamName: name } })),

  setFormation: (side, f) =>
    set(s => ({
      [side]: { ...s[side], formation: f, slots: makeEmptySlots(f) },
    })),

  setTactic: (side, t) =>
    set(s => ({ [side]: { ...s[side], tactic: t } })),

  setSlotPlayer: (side, slotIndex, pp) =>
    set(s => {
      const slots = [...s[side].slots]
      slots[slotIndex] = pp
      return { [side]: { ...s[side], slots } }
    }),

  setBenchPlayer: (side, benchIndex, player) =>
    set(s => {
      const bench = [...s[side].bench]
      bench[benchIndex] = player
      return { [side]: { ...s[side], bench } }
    }),

  isComplete: side => get()[side].slots.every(s => s !== null),

  getUsedPlayerIds: () => {
    const { home, away } = get()
    const ids = new Set<string>()
    for (const slot of [...home.slots, ...away.slots]) {
      if (slot) ids.add(slot.player.id)
    }
    for (const player of [...home.bench, ...away.bench]) {
      if (player) ids.add(player.id)
    }
    return ids
  },

  randomizeSquad: (side) => {
    const state = get()
    const other = side === 'home' ? state.away : state.home

    // Exclude players already in the other squad
    const excludedIds = new Set<string>()
    for (const slot of other.slots) if (slot) excludedIds.add(slot.player.id)
    for (const p of other.bench) if (p) excludedIds.add(p.id)

    // Shuffle the available pool
    const pool = getAllPlayers()
      .filter(p => !excludedIds.has(p.id))
      .sort(() => Math.random() - 0.5)

    const pickedIds = new Set<string>()

    function pick(position: Position): Player | null {
      const eligible = pool.filter(p => !pickedIds.has(p.id) && p.positions.includes(position))
      const candidates = eligible.length > 0 ? eligible : pool.filter(p => !pickedIds.has(p.id))
      if (candidates.length === 0) return null
      return candidates[Math.floor(Math.random() * candidates.length)]
    }

    const formation = state[side].formation
    const newSlots: (PositionedPlayer | null)[] = FORMATIONS[formation].map(slot => {
      const player = pick(slot.position)
      if (!player) return null
      pickedIds.add(player.id)
      return { player, assignedPosition: slot.position }
    })

    const newBench: (Player | null)[] = pool
      .filter(p => !pickedIds.has(p.id))
      .slice(0, 5)

    set(s => ({ [side]: { ...s[side], slots: newSlots, bench: newBench } }))
  },

  reset: () =>
    set({ home: defaultSquad('Home'), away: defaultSquad('Away') }),
}))
