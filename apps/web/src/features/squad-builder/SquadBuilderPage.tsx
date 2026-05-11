import { useNavigate, useSearchParams } from 'react-router-dom'
import type { Formation, Tactic } from '@eternalxi/types'
import { useSquadStore } from '@/store/squadStore'
import { Button } from '@/components/ui/Button'
import { FormationPitch } from './components/FormationPitch'
import { SubstituteBench } from './components/SubstituteBench'

const FORMATIONS: Formation[] = ['4-3-3', '4-4-2', '4-2-3-1', '3-5-2', '5-3-2']
const TACTICS: Tactic[] = ['attacking', 'balanced', 'defensive']

function SquadPanel({ side }: { side: 'home' | 'away' }) {
  const { home, away, setTeamName, setFormation, setTactic, randomizeSquad } = useSquadStore()
  const squad = side === 'home' ? home : away
  const filled = squad.slots.filter(Boolean).length

  return (
    <div className="flex flex-col gap-4">
      {/* Team name */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-ink-faded mb-1">
          Team Name
        </label>
        <input
          type="text"
          value={squad.teamName}
          onChange={e => setTeamName(side, e.target.value)}
          className="w-full border-2 border-ink bg-cream px-3 py-2 font-display text-base text-ink focus:outline-none focus:border-sepia"
          placeholder={side === 'home' ? 'Home' : 'Away'}
        />
      </div>

      {/* Formation */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-ink-faded mb-1">
          Formation
        </label>
        <div className="flex gap-1 flex-wrap">
          {FORMATIONS.map(f => (
            <button
              key={f}
              onClick={() => setFormation(side, f)}
              className={`px-3 py-1.5 border-2 border-ink font-body text-xs font-bold tracking-wide transition-colors
                ${squad.formation === f ? 'bg-ink text-parchment' : 'bg-parchment text-ink hover:bg-parchment-dark'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Tactic */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-ink-faded mb-1">
          Tactic
        </label>
        <div className="flex gap-1">
          {TACTICS.map(t => (
            <button
              key={t}
              onClick={() => setTactic(side, t)}
              className={`flex-1 px-2 py-1.5 border-2 border-ink font-body text-xs font-bold tracking-wide capitalize transition-colors
                ${squad.tactic === t ? 'bg-ink text-parchment' : 'bg-parchment text-ink hover:bg-parchment-dark'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Randomize */}
      <button
        onClick={() => randomizeSquad(side)}
        className="w-full border-2 border-ink/40 bg-parchment hover:bg-parchment-dark font-body text-xs font-bold uppercase tracking-widest text-ink-faded py-2 transition-colors"
      >
        ↺ Randomize Squad
      </button>

      {/* Pitch */}
      <FormationPitch side={side} />

      {/* Progress */}
      <div className="text-center font-body text-xs text-ink-faded">
        {filled}/11 players selected
      </div>

      {/* Bench */}
      <SubstituteBench side={side} />
    </div>
  )
}

export function SquadBuilderPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { isComplete } = useSquadStore()

  const fromWorldCup = searchParams.get('from') === 'world-cup'
  const homeComplete = isComplete('home')
  const bothComplete = homeComplete && isComplete('away')

  function handleConfirm() {
    if (fromWorldCup) {
      navigate('/world-cup')
    } else {
      navigate('/simulate')
    }
  }

  return (
    <div className="grain-overlay min-h-screen bg-parchment">
      {/* Header */}
      <header className="bg-ink border-b-4 border-sepia px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate(fromWorldCup ? '/world-cup' : '/')}
          className="text-parchment font-body text-sm hover:text-sepia transition-colors"
        >
          ← {fromWorldCup ? 'World Cup' : 'Back'}
        </button>
        <h1 className="font-display text-2xl font-black text-parchment tracking-wide">
          ETERNAL<span className="text-sepia">XI</span>
        </h1>
        <div className="w-16" />
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="font-display text-3xl font-bold text-ink text-center mb-8">
          {fromWorldCup ? 'Build Your Squad' : 'Build Your Squads'}
        </h2>

        {fromWorldCup ? (
          /* World Cup mode: single squad, centered */
          <div className="max-w-lg mx-auto">
            <SquadPanel side="home" />
          </div>
        ) : (
          /* Standard mode: two squads side by side */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-ink" />
                <h3 className="font-display text-xl font-bold text-ink">Home</h3>
              </div>
              <SquadPanel side="home" />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-sepia" />
                <h3 className="font-display text-xl font-bold text-ink">Away</h3>
              </div>
              <SquadPanel side="away" />
            </div>
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Button
            size="lg"
            onClick={handleConfirm}
            disabled={fromWorldCup ? !homeComplete : !bothComplete}
          >
            {fromWorldCup ? 'Confirm Squad →' : 'Preview Match →'}
          </Button>
        </div>
        {fromWorldCup && !homeComplete && (
          <p className="text-center text-xs text-ink-faded mt-2 font-body">
            Fill all 11 positions to confirm your squad.
          </p>
        )}
        {!fromWorldCup && !bothComplete && (
          <p className="text-center text-xs text-ink-faded mt-2 font-body">
            Fill all 11 positions for both teams to continue.
          </p>
        )}
      </main>
    </div>
  )
}
