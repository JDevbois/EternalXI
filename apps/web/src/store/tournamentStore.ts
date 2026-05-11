import { create } from 'zustand'
import type { MatchResult, WorldCupYear, HistoricalSquad } from '@eternalxi/types'
import type { WcEdition } from '@eternalxi/player-data'
import { getWcEdition } from '@eternalxi/player-data'

export type TournamentRound = 'idle' | 'semifinal' | 'final' | 'champion' | 'eliminated'

interface TournamentState {
  wcYear: WorldCupYear | null
  edition: WcEdition | null
  round: TournamentRound
  results: MatchResult[]
  lastOpponent: HistoricalSquad | null
  startTournament: (year: WorldCupYear) => void
  recordResult: (result: MatchResult) => void
  reset: () => void
}

export const useTournamentStore = create<TournamentState>((set) => ({
  wcYear: null,
  edition: null,
  round: 'idle',
  results: [],
  lastOpponent: null,

  startTournament: (year: WorldCupYear) => {
    const edition = getWcEdition(year)
    if (!edition) return
    set({ wcYear: year, edition, round: 'semifinal', results: [], lastOpponent: null })
  },

  recordResult: (result: MatchResult) => {
    set(state => {
      const { round, edition } = state
      const results = [...state.results, result]

      const opponent: HistoricalSquad | null =
        round === 'semifinal' ? (edition?.runnerUp ?? null) :
        round === 'final'     ? (edition?.champion ?? null) :
        null

      const userWon = result.penaltyShootout
        ? result.penaltyShootout.winner === 'home'
        : result.homeScore > result.awayScore

      if (!userWon) return { results, round: 'eliminated', lastOpponent: opponent }

      const nextRound: TournamentRound =
        round === 'semifinal' ? 'final' :
        round === 'final'     ? 'champion' :
        round

      return { results, round: nextRound, lastOpponent: opponent }
    })
  },

  reset: () => set({ wcYear: null, edition: null, round: 'idle', results: [], lastOpponent: null }),
}))
