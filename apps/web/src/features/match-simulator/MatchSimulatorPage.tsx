import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useSquadStore } from '@/store/squadStore'
import { useMatchStore } from '@/store/matchStore'
import { useTournamentStore } from '@/store/tournamentStore'
import { useSimulation } from './useSimulation'
import { ScoreboardHeader } from '../match-report/ScoreboardHeader'
import { Button } from '@/components/ui/Button'
import type { MatchEvent, HistoricalSquad } from '@eternalxi/types'
import { FORMATIONS } from '@/lib/formations'

const EVENT_ICONS: Record<MatchEvent['type'], string> = {
  GOAL: '⚽',
  YELLOW_CARD: '🟨',
  RED_CARD: '🟥',
  SAVE: '🧤',
  SUBSTITUTION: '🔄',
  PENALTY_SCORED: '⚽',
  PENALTY_MISSED: '✗',
}

function EventRow({ event }: { event: MatchEvent }) {
  const icon = EVENT_ICONS[event.type]
  const isHome = event.team === 'home'

  return (
    <motion.div
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      className={`flex items-start gap-3 py-2 px-3 border-b border-ink/10
        ${event.type === 'GOAL' || event.type === 'PENALTY_SCORED' ? 'bg-sepia/10' : ''}
        ${event.type === 'RED_CARD' || event.type === 'PENALTY_MISSED' ? 'bg-red-900/5' : ''}`}
    >
      <span className="font-body text-xs font-bold text-ink-faded w-8 shrink-0 pt-0.5">
        {event.minute}'
      </span>
      <div className={`flex-1 flex ${isHome ? 'flex-row' : 'flex-row-reverse'} items-start gap-2`}>
        <span className="text-base leading-none pt-0.5">{icon}</span>
        <div className={`${isHome ? 'text-left' : 'text-right'} flex-1`}>
          <span className="font-body text-sm font-bold text-ink">{event.playerName}</span>
          {event.assistName && event.type === 'GOAL' && (
            <span className="font-body text-xs text-ink-faded block">Assist: {event.assistName}</span>
          )}
          {event.assistName && event.type === 'SUBSTITUTION' && (
            <span className="font-body text-xs text-ink-faded block">← {event.assistName}</span>
          )}
        </div>
      </div>
      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${isHome ? 'bg-ink' : 'bg-sepia'}`} />
    </motion.div>
  )
}

function LineupList({ side }: { side: 'home' | 'away' }) {
  const squad = useSquadStore(s => s[side])
  const slots = FORMATIONS[squad.formation]

  return (
    <div className="flex flex-col gap-1">
      <h3 className="font-display text-lg font-bold text-ink border-b-2 border-ink pb-1 mb-2">
        {squad.teamName}
        <span className="font-body text-xs text-ink-faded ml-2">{squad.formation}</span>
      </h3>
      {squad.slots.map((slot, i) => {
        if (!slot) return null
        return (
          <div key={i} className="flex items-center gap-2 text-sm font-body">
            <span className="text-xs text-ink-faded w-8">{slots[i].position}</span>
            <span className="text-ink font-medium flex-1">{slot.player.name}</span>
            <span className="text-xs font-bold text-sepia-dark">{slot.player.stats.overall}</span>
          </div>
        )
      })}
      {squad.bench.some(Boolean) && (
        <>
          <div className="mt-2 mb-1 text-xs font-bold uppercase tracking-widest text-ink-faded border-t border-ink/10 pt-2">
            Bench
          </div>
          {squad.bench.filter(Boolean).map((p, i) => (
            <div key={i} className="flex items-center gap-2 text-sm font-body text-ink-faded">
              <span className="text-xs w-8">{p!.primaryPosition}</span>
              <span className="flex-1">{p!.name}</span>
              <span className="text-xs font-bold">{p!.stats.overall}</span>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

function HistoricalLineupList({ squad }: { squad: HistoricalSquad }) {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="font-display text-lg font-bold text-ink border-b-2 border-ink pb-1 mb-2">
        {squad.label}
        <span className="font-body text-xs text-ink-faded ml-2">{squad.formation}</span>
      </h3>
      {squad.players.map((slot, i) => (
        <div key={i} className="flex items-center gap-2 text-sm font-body">
          <span className="text-xs text-ink-faded w-8">{slot.assignedPosition}</span>
          <span className="text-ink font-medium flex-1">{slot.player.name}</span>
          <span className="text-xs font-bold text-sepia-dark">{slot.player.stats.overall}</span>
        </div>
      ))}
      {squad.bench.length > 0 && (
        <>
          <div className="mt-2 mb-1 text-xs font-bold uppercase tracking-widest text-ink-faded border-t border-ink/10 pt-2">
            Bench
          </div>
          {squad.bench.map((p, i) => (
            <div key={i} className="flex items-center gap-2 text-sm font-body text-ink-faded">
              <span className="text-xs w-8">{p.primaryPosition}</span>
              <span className="flex-1">{p.name}</span>
              <span className="text-xs font-bold">{p.stats.overall}</span>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export function MatchSimulatorPage() {
  const navigate = useNavigate()
  const { home, away } = useSquadStore()
  const { result, phase, displayedEventCount, advanceEvent, continueSimulation, skipToEnd } = useMatchStore()
  const { kickOff } = useSimulation()
  const { round, edition } = useTournamentStore()

  const tickerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const isTournamentActive = round === 'semifinal' || round === 'final'
  const tournamentOpponent = isTournamentActive && edition
    ? (round === 'semifinal' ? edition.runnerUp : edition.champion)
    : null

  const awayTeamName = tournamentOpponent ? tournamentOpponent.label : away.teamName

  useEffect(() => {
    if (phase !== 'idle') return
    const homeComplete = home.slots.every(Boolean)
    if (!homeComplete) navigate('/')
    if (!isTournamentActive && !away.slots.every(Boolean)) navigate('/')
  }, [home, away, navigate, isTournamentActive, phase])

  useEffect(() => {
    if (phase !== 'playing') {
      if (tickerRef.current) { clearInterval(tickerRef.current); tickerRef.current = null }
      return
    }
    tickerRef.current = setInterval(() => {
      advanceEvent()
    }, 800)
    return () => { if (tickerRef.current) clearInterval(tickerRef.current) }
  }, [phase, advanceEvent])

  const displayed = result?.events.slice(0, displayedEventCount) ?? []

  const runScore = displayed.reduce(
    (acc, e) => {
      if (e.type === 'GOAL') acc[e.team]++
      return acc
    },
    { home: 0, away: 0 }
  )

  const lastGoalEvent = [...displayed].reverse().find(e => e.type === 'GOAL')
  const flashGoal = !!(lastGoalEvent && displayed[displayed.length - 1] === lastGoalEvent)

  return (
    <div className="grain-overlay min-h-screen bg-parchment">
      <header className="bg-ink border-b-4 border-sepia px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate(isTournamentActive ? '/world-cup/tournament' : '/squad-builder')}
          className="text-parchment font-body text-sm hover:text-sepia"
        >
          ← {isTournamentActive ? 'Tournament' : 'Change Squads'}
        </button>
        <h1 className="font-display text-2xl font-black text-parchment">
          ETERNAL<span className="text-sepia">XI</span>
        </h1>
        <div className="w-28" />
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* PRE-MATCH */}
        {phase === 'idle' && (
          <div className="flex flex-col items-center gap-8">
            {isTournamentActive && (
              <div className="font-body text-xs uppercase tracking-widest text-sepia-dark font-bold border border-sepia px-3 py-1">
                {round === 'semifinal' ? 'Semi-Final' : 'Final'} — World Cup {edition?.year}
              </div>
            )}
            <h2 className="font-display text-3xl font-bold text-ink">Pre-Match</h2>
            <div className="grid grid-cols-2 gap-8 w-full max-w-2xl">
              <div className="border-2 border-ink bg-cream p-4 shadow-card">
                <LineupList side="home" />
              </div>
              <div className="border-2 border-ink bg-cream p-4 shadow-card">
                {tournamentOpponent
                  ? <HistoricalLineupList squad={tournamentOpponent} />
                  : <LineupList side="away" />
                }
              </div>
            </div>
            <div className="text-center">
              {!isTournamentActive && (
                <div className="font-body text-xs text-ink-faded mb-4 uppercase tracking-widest">
                  {home.tactic} vs {away.tactic}
                </div>
              )}
              <Button size="lg" onClick={kickOff}>
                ⚽ Kick Off
              </Button>
            </div>
          </div>
        )}

        {/* PLAYING / DONE */}
        {(phase === 'playing' || phase === 'halftime' || phase === 'penalties_pending' || phase === 'done') && result && (
          <div className="flex flex-col items-center gap-6">
            <ScoreboardHeader
              result={result}
              homeTeamName={home.teamName}
              awayTeamName={awayTeamName}
              liveHome={runScore.home}
              liveAway={runScore.away}
              isLive={phase === 'playing'}
              flashGoal={flashGoal}
            />

            {phase === 'playing' && (
              <Button variant="secondary" size="sm" onClick={skipToEnd}>
                Skip to Result
              </Button>
            )}
            {phase === 'halftime' && (
              <Button size="md" onClick={continueSimulation}>
                Continue to Second Half →
              </Button>
            )}
            {phase === 'penalties_pending' && (
              <Button size="md" onClick={continueSimulation}>
                Continue to Penalties →
              </Button>
            )}
            {phase === 'done' && (
              <Button size="md" onClick={() => navigate('/result')}>
                View Full Report →
              </Button>
            )}

            <div className="w-full max-w-md border-2 border-ink bg-cream shadow-card overflow-hidden">
              <div className="bg-ink px-3 py-1.5">
                <span className="font-body text-xs font-bold uppercase tracking-widest text-parchment/80">
                  Match Events
                </span>
              </div>
              <div className="max-h-[60vh] overflow-y-auto">
                <AnimatePresence>
                  {displayed.length === 0 && (
                    <p className="text-center text-ink-faded font-body text-xs py-6">
                      Kick off…
                    </p>
                  )}
                  {[...displayed].reverse().map((event, i) => (
                    <EventRow key={`${event.minute}-${event.type}-${i}`} event={event} />
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {phase === 'done' && (
              <p className="font-body text-xs text-ink-faded text-center">
                HT: {result.htHomeScore} – {result.htAwayScore}
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
