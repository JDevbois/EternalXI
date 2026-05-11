import { useNavigate } from 'react-router-dom'
import { WC_EDITIONS } from '@eternalxi/player-data'
import type { WcEdition } from '@eternalxi/player-data'
import { useTournamentStore } from '@/store/tournamentStore'
import { useSquadStore } from '@/store/squadStore'
import { useMatchStore } from '@/store/matchStore'
import { EditionCard } from './components/EditionCard'
import { Button } from '@/components/ui/Button'

export function WorldCupHomePage() {
  const navigate = useNavigate()
  const { home } = useSquadStore()
  const { startTournament, reset: resetTournament } = useTournamentStore()
  const { reset: resetMatch } = useMatchStore()

  const homeIsReady = home.slots.every(Boolean)

  function handleSelectEdition(edition: WcEdition) {
    if (!homeIsReady) return
    resetMatch()
    resetTournament()
    startTournament(edition.year)
    navigate('/world-cup/tournament')
  }

  return (
    <div className="grain-overlay min-h-screen bg-parchment">
      <header className="bg-ink border-b-4 border-sepia px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="text-parchment font-body text-sm hover:text-sepia"
        >
          ← Home
        </button>
        <h1 className="font-display text-2xl font-black text-parchment">
          ETERNAL<span className="text-sepia">XI</span>
        </h1>
        <div className="w-20" />
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-8">
        <div className="text-center">
          <h2 className="font-display text-4xl font-black text-ink">World Cup Mode</h2>
          <p className="font-body text-sm text-ink-faded mt-2">
            Take your Dream XI into a World Cup knockout tournament against history's greatest squads.
          </p>
        </div>

        {/* Squad status */}
        <div className="border-2 border-ink bg-cream shadow-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-body text-xs font-bold uppercase tracking-widest text-ink-faded mb-1">
                Your Squad
              </div>
              <div className="font-display text-xl font-black text-ink">{home.teamName}</div>
              {homeIsReady
                ? <div className="font-body text-xs text-sepia-dark mt-1">Ready · {home.formation}</div>
                : <div className="font-body text-xs text-red-600 mt-1">Incomplete — fill all 11 positions first</div>
              }
            </div>
            <Button variant="secondary" size="sm" onClick={() => navigate('/squad-builder?from=world-cup')}>
              {homeIsReady ? 'Edit Squad' : 'Build Squad'}
            </Button>
          </div>
        </div>

        {/* Edition grid */}
        <div>
          <h3 className="font-display text-lg font-bold text-ink mb-4 uppercase tracking-widest border-b-2 border-ink pb-2">
            Choose Your World Cup
          </h3>
          {!homeIsReady && (
            <p className="font-body text-xs text-ink-faded mb-4 italic">
              Build a complete squad to unlock World Cup mode.
            </p>
          )}
          <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ${!homeIsReady ? 'opacity-40 pointer-events-none' : ''}`}>
            {WC_EDITIONS.map(edition => (
              <EditionCard
                key={edition.year}
                edition={edition}
                onSelect={handleSelectEdition}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
