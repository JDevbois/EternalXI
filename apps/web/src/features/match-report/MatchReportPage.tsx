import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMatchStore } from '@/store/matchStore'
import { useSquadStore } from '@/store/squadStore'
import { useTournamentStore } from '@/store/tournamentStore'
import { Button } from '@/components/ui/Button'
import { ScoreboardHeader } from './ScoreboardHeader'
import { EventTimeline } from './EventTimeline'
import { MatchStatsPanel } from './MatchStatsPanel'

function PenaltyShootoutSection({ result }: { result: import('@eternalxi/types').MatchResult }) {
  const ps = result.penaltyShootout
  if (!ps) return null

  return (
    <div className="text-center border-2 border-sepia bg-sepia/5 py-3 px-4 shadow-card">
      <span className="font-display text-lg font-black text-sepia-dark">
        {ps.homeScore} – {ps.awayScore}
      </span>
      <span className="font-body text-xs text-ink-faded ml-2 uppercase tracking-widest">
        on penalties · {ps.winner === 'home' ? 'Home win' : 'Away win'}
      </span>
    </div>
  )
}

export function MatchReportPage() {
  const navigate = useNavigate()
  const result = useMatchStore(s => s.result)
  const { home, away, reset: resetSquads } = useSquadStore()
  const resetMatch = useMatchStore(s => s.reset)
  const { round, edition, lastOpponent, reset: resetTournament } = useTournamentStore()

  useEffect(() => {
    if (!result) navigate('/')
  }, [result, navigate])

  if (!result) return null

  const goalEvents = result.events.filter(e => e.type === 'GOAL')

  const isTournamentResult = round === 'final' || round === 'champion' || round === 'eliminated'
  const awayTeamName = isTournamentResult && lastOpponent
    ? lastOpponent.label
    : away.teamName

  const userWon = result.penaltyShootout
    ? result.penaltyShootout.winner === 'home'
    : result.homeScore > result.awayScore

  // Derived tournament state
  const isChampion = round === 'champion'
  const isEliminated = round === 'eliminated'
  const advancedToFinal = round === 'final' && userWon

  return (
    <div className="grain-overlay min-h-screen bg-parchment">
      <header className="bg-ink border-b-4 border-sepia px-6 py-4 flex items-center justify-between">
        <div />
        <h1 className="font-display text-2xl font-black text-parchment">
          ETERNAL<span className="text-sepia">XI</span>
        </h1>
        <div className="w-16" />
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-8">
        {/* Tournament round result banner */}
        {round === 'champion' && (
          <div className="text-center border-4 border-sepia bg-sepia/10 p-6 shadow-card">
            <div className="font-display text-4xl font-black text-sepia-dark mb-2">WORLD CHAMPIONS</div>
            <div className="font-body text-sm text-ink-faded">You conquered the World Cup {edition?.year}!</div>
          </div>
        )}
        {round === 'eliminated' && (
          <div className="text-center border-4 border-ink/30 bg-ink/5 p-6 shadow-card">
            <div className="font-display text-3xl font-black text-ink mb-2">ELIMINATED</div>
            <div className="font-body text-sm text-ink-faded">Better luck next time.</div>
          </div>
        )}

        {/* Scoreboard */}
        <div className="flex flex-col items-center">
          <ScoreboardHeader
            result={result}
            homeTeamName={home.teamName}
            awayTeamName={awayTeamName}
          />

          {/* Goal scorers under scoreboard */}
          {goalEvents.length > 0 && (
            <div className="w-full max-w-md mt-3 grid grid-cols-2 gap-2 text-sm font-body">
              <div className="text-left">
                {goalEvents.filter(e => e.team === 'home').map((e, i) => (
                  <div key={i} className="text-ink/80">⚽ {e.minute}' {e.playerName}</div>
                ))}
              </div>
              <div className="text-right">
                {goalEvents.filter(e => e.team === 'away').map((e, i) => (
                  <div key={i} className="text-ink/80">{e.playerName} {e.minute}' ⚽</div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Penalty shootout */}
        {result.penaltyShootout && <PenaltyShootoutSection result={result} />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MatchStatsPanel result={result} />

          <div className="border-2 border-ink bg-cream shadow-card overflow-hidden flex flex-col">
            <div className="bg-ink px-4 py-2">
              <h3 className="font-display text-base font-bold text-parchment">Match Events</h3>
            </div>
            <EventTimeline events={result.events} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center flex-wrap">
          {advancedToFinal && (
            <Button size="md" onClick={() => { resetMatch(); navigate('/world-cup/tournament') }}>
              Continue to Final →
            </Button>
          )}
          {(isChampion || isEliminated) && (
            <>
              <Button size="md" onClick={() => { resetMatch(); navigate('/world-cup/tournament') }}>
                View Tournament
              </Button>
              <Button variant="secondary" onClick={() => { resetMatch(); resetTournament(); navigate('/world-cup') }}>
                {isChampion ? 'Play Another Edition' : 'Try Again'}
              </Button>
            </>
          )}
          {!isTournamentResult && (
            <>
              <Button
                variant="secondary"
                onClick={() => { resetMatch(); navigate('/simulate') }}
              >
                ↺ Play Again
              </Button>
              <Button
                variant="ghost"
                onClick={() => { resetMatch(); resetSquads(); navigate('/squad-builder') }}
              >
                Change Squads
              </Button>
              <Button
                variant="ghost"
                onClick={() => { resetMatch(); resetSquads(); navigate('/') }}
              >
                Home
              </Button>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
