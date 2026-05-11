import { create } from 'zustand'
import type { MatchResult } from '@eternalxi/types'

export type SimPhase = 'idle' | 'playing' | 'halftime' | 'penalties_pending' | 'done'

interface MatchState {
  result: MatchResult | null
  phase: SimPhase
  displayedEventCount: number
  htBreakIndex: number
  penBreakIndex: number
  setResult: (r: MatchResult) => void
  startPlaying: () => void
  advanceEvent: () => void
  continueSimulation: () => void
  skipToEnd: () => void
  reset: () => void
}

const PENALTY_TYPES = new Set(['PENALTY_SCORED', 'PENALTY_MISSED'])

export const useMatchStore = create<MatchState>((set, get) => ({
  result: null,
  phase: 'idle',
  displayedEventCount: 0,
  htBreakIndex: -1,
  penBreakIndex: -1,

  setResult: r => {
    const htBreakIndex = r.events.findIndex(e => e.minute > 45)
    const penBreakIndex = r.events.findIndex(e => PENALTY_TYPES.has(e.type))
    set({ result: r, displayedEventCount: 0, phase: 'idle', htBreakIndex, penBreakIndex })
  },

  startPlaying: () => set({ phase: 'playing', displayedEventCount: 0 }),

  advanceEvent: () => {
    const { result, displayedEventCount, htBreakIndex, penBreakIndex } = get()
    if (!result) return
    const next = displayedEventCount + 1

    if (htBreakIndex !== -1 && next === htBreakIndex) {
      set({ displayedEventCount: next, phase: 'halftime' })
      return
    }
    if (penBreakIndex !== -1 && next === penBreakIndex) {
      set({ displayedEventCount: next, phase: 'penalties_pending' })
      return
    }
    if (next >= result.events.length) {
      set({ displayedEventCount: result.events.length, phase: 'done' })
    } else {
      set({ displayedEventCount: next })
    }
  },

  continueSimulation: () => set({ phase: 'playing' }),

  skipToEnd: () => {
    const { result } = get()
    if (!result) return
    set({ displayedEventCount: result.events.length, phase: 'done' })
  },

  reset: () => set({ result: null, phase: 'idle', displayedEventCount: 0, htBreakIndex: -1, penBreakIndex: -1 }),
}))
