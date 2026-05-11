import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { useSquadStore } from '@/store/squadStore'
import { useTournamentStore } from '@/store/tournamentStore'

export function HomePage() {
  const navigate = useNavigate()
  const { reset } = useSquadStore()
  const { reset: resetTournament } = useTournamentStore()

  function handleStart() {
    reset()
    resetTournament()
    navigate('/squad-builder')
  }

  function handleWorldCup() {
    navigate('/world-cup')
  }

  return (
    <div className="grain-overlay min-h-screen bg-parchment flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative pitch lines */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #1C1208 0, #1C1208 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #1C1208 0, #1C1208 1px, transparent 1px, transparent 60px)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center px-6 max-w-lg">
        {/* Logo badge */}
        <div className="border-4 border-ink bg-ink px-8 py-6 shadow-card-lg">
          <div className="font-display text-6xl font-black tracking-tight text-parchment leading-none">
            ETERNAL
          </div>
          <div className="font-display text-6xl font-black tracking-tight text-sepia leading-none">
            XI
          </div>
        </div>

        {/* Tagline */}
        <p className="font-body text-ink-faded text-base tracking-wide italic">
          "Assemble the greatest squad never seen."
        </p>

        {/* Divider */}
        <div className="flex items-center gap-4 w-full">
          <div className="flex-1 h-px bg-ink/30" />
          <span className="text-ink/30 font-body text-xs tracking-widest uppercase">
            The Legends Await
          </span>
          <div className="flex-1 h-px bg-ink/30" />
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3 items-center w-full">
          <Button size="lg" onClick={handleStart}>
            Play Match
          </Button>
          <Button size="md" variant="secondary" onClick={handleWorldCup}>
            ⚽ World Cup Mode
          </Button>
        </div>

        {/* Footer note */}
        <p className="font-body text-xs text-ink/40">
          Pick your legends · Choose your formation · Simulate the impossible match
        </p>
      </div>

      {/* Decorative corner stamps */}
      <div className="absolute top-4 left-4 w-16 h-16 border-4 border-ink/10 opacity-30" />
      <div className="absolute top-4 right-4 w-16 h-16 border-4 border-ink/10 opacity-30" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-4 border-ink/10 opacity-30" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-4 border-ink/10 opacity-30" />
    </div>
  )
}
