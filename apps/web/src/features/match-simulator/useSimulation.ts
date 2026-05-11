import toast from 'react-hot-toast'
import type { Squad } from '@eternalxi/types'
import { simulateMatch } from '@/engine/matchEngine'
import { useSquadStore } from '@/store/squadStore'
import { useMatchStore } from '@/store/matchStore'
import { useTournamentStore } from '@/store/tournamentStore'

function buildSquad(builder: ReturnType<typeof useSquadStore.getState>['home']): Squad {
  return {
    teamName: builder.teamName,
    formation: builder.formation,
    tactic: builder.tactic,
    players: builder.slots.filter(Boolean) as Squad['players'],
    bench: builder.bench.filter(Boolean) as NonNullable<typeof builder.bench[0]>[],
  }
}

function historicalToSquad(squad: import('@eternalxi/types').HistoricalSquad): Squad {
  return {
    teamName: squad.label,
    formation: squad.formation,
    tactic: squad.tactic,
    players: squad.players,
    bench: squad.bench,
  }
}

export function useSimulation() {
  const { home, away } = useSquadStore()
  const { setResult, startPlaying } = useMatchStore()
  const { round, edition, recordResult } = useTournamentStore()

  function kickOff() {
    try {
      const homeSquad = buildSquad(home)
      const isTournamentActive = round === 'semifinal' || round === 'final'

      let awaySquad: Squad
      let knockout = false

      if (isTournamentActive && edition) {
        const opponent = round === 'semifinal' ? edition.runnerUp : edition.champion
        awaySquad = historicalToSquad(opponent)
        knockout = true
      } else {
        awaySquad = buildSquad(away)
      }

      const result = simulateMatch(homeSquad, awaySquad, { knockout })

      if (isTournamentActive) {
        recordResult(result)
      }

      setResult(result)
      startPlaying()
    } catch (err) {
      toast.error('Match simulation failed. Please check your squads.')
      console.error(err)
    }
  }

  return { kickOff }
}
