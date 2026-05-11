import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTournamentStore } from '@/store/tournamentStore'
import { useSquadStore } from '@/store/squadStore'
import { useMatchStore } from '@/store/matchStore'
import { Button } from '@/components/ui/Button'
import { TournamentBracket } from './components/TournamentBracket'
import { OpponentSquadCard } from './components/OpponentSquadCard'

export function TournamentPage() {
  const navigate = useNavigate()
  const { edition, round, results, reset: resetTournament } = useTournamentStore()
  const { home } = useSquadStore()
  const { reset: resetMatch } = useMatchStore()

  useEffect(() => {
    if (!edition || round === 'idle') navigate('/world-cup')
  }, [edition, round, navigate])

  if (!edition || round === 'idle') return null

  const currentOpponent =
    round === 'semifinal' ? edition.runnerUp :
    round === 'final'     ? edition.champion :
    null

  const roundLabel =
    round === 'semifinal' ? 'Semi-Final' :
    round === 'final'     ? 'Final' :
    null

  const isOver = round === 'champion' || round === 'eliminated'

  function handlePlay() {
    resetMatch()
    navigate('/simulate')
  }

  return (
    <div className="grain-overlay min-h-screen bg-parchment">
      <header className="bg-ink border-b-4 border-sepia px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate('/world-cup')}
          className="text-parchment font-body text-sm hover:text-sepia"
        >
          ← Editions
        </button>
        <h1 className="font-display text-2xl font-black text-parchment">
          ETERNAL<span className="text-sepia">XI</span>
        </h1>
        <div className="w-20" />
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-8 items-center">
        <div className="text-center">
          <div className="font-body text-xs font-bold uppercase tracking-widest text-ink-faded mb-1">
            World Cup {edition.year} · {edition.host}
          </div>
          <h2 className="font-display text-3xl font-black text-ink">Tournament</h2>
        </div>

        {/* Champion / eliminated banners */}
        {round === 'champion' && (
          <div className="w-full text-center border-4 border-sepia bg-sepia/10 p-6 shadow-card">
            <div className="font-display text-4xl font-black text-sepia-dark">WORLD CHAMPIONS!</div>
            <div className="font-body text-sm text-ink-faded mt-2">
              {home.teamName} conquers the {edition.year} World Cup
            </div>
          </div>
        )}
        {round === 'eliminated' && (
          <div className="w-full text-center border-4 border-ink/30 bg-ink/5 p-6 shadow-card">
            <div className="font-display text-3xl font-black text-ink">ELIMINATED</div>
            <div className="font-body text-sm text-ink-faded mt-2">
              The journey ends here.
            </div>
          </div>
        )}

        {/* Bracket */}
        <TournamentBracket
          edition={edition}
          homeTeamName={home.teamName}
          round={round}
          results={results}
        />

        {/* Next match section */}
        {currentOpponent && roundLabel && (
          <div className="w-full flex flex-col gap-4">
            <div className="border-t-2 border-ink/20 pt-4 text-center">
              <div className="font-body text-xs font-bold uppercase tracking-widest text-sepia-dark mb-1">
                {roundLabel}
              </div>
              <div className="font-display text-xl font-black text-ink">
                {home.teamName} vs {currentOpponent.label}
              </div>
            </div>
            <OpponentSquadCard squad={currentOpponent} label="Your Opponent" />
            <div className="flex justify-center">
              <Button size="lg" onClick={handlePlay}>
                ⚽ Play {roundLabel}
              </Button>
            </div>
          </div>
        )}

        {/* Post-tournament actions */}
        {isOver && (
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="secondary" onClick={() => { resetTournament(); navigate('/world-cup') }}>
              {round === 'champion' ? 'Play Another Edition' : 'Try Again'}
            </Button>
            <Button variant="ghost" onClick={() => navigate('/')}>Home</Button>
          </div>
        )}
      </main>
    </div>
  )
}
