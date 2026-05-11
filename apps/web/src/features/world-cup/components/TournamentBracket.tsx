import type { TournamentRound } from '@/store/tournamentStore'
import type { WcEdition } from '@eternalxi/player-data'
import type { MatchResult } from '@eternalxi/types'

interface BracketMatchProps {
  roundLabel: string
  homeTeam: string
  awayTeam: string
  result?: MatchResult
  isCurrent: boolean
  isCompleted: boolean
}

function BracketMatch({ roundLabel, homeTeam, awayTeam, result, isCurrent, isCompleted }: BracketMatchProps) {
  const userWon = result
    ? (result.penaltyShootout ? result.penaltyShootout.winner === 'home' : result.homeScore > result.awayScore)
    : null

  const scoreLabel = result
    ? (result.penaltyShootout
        ? `${result.homeScore}–${result.awayScore} (${result.penaltyShootout.homeScore}–${result.penaltyShootout.awayScore} pens)`
        : `${result.homeScore}–${result.awayScore}`)
    : null

  return (
    <div className={`border-2 p-4 ${isCurrent ? 'border-sepia bg-sepia/5' : isCompleted ? 'border-ink/30 bg-cream/50' : 'border-ink/20 bg-cream/20'}`}>
      <div className="font-body text-xs font-bold uppercase tracking-widest text-ink-faded mb-3">{roundLabel}</div>
      <div className="flex flex-col gap-2">
        <div className={`flex items-center justify-between gap-2 ${isCompleted && userWon ? 'opacity-100' : isCompleted ? 'opacity-40' : ''}`}>
          <span className="font-body text-sm font-bold text-ink">{homeTeam}</span>
          {result && <span className="font-display text-lg font-black text-ink">{result.homeScore}</span>}
        </div>
        <div className={`flex items-center justify-between gap-2 ${isCompleted && !userWon ? 'opacity-100' : isCompleted ? 'opacity-40' : ''}`}>
          <span className="font-body text-sm text-ink">{awayTeam}</span>
          {result && <span className="font-display text-lg font-black text-ink">{result.awayScore}</span>}
        </div>
      </div>
      {scoreLabel && (
        <div className="mt-3 pt-2 border-t border-ink/10 font-body text-xs text-ink-faded">
          {userWon ? '✓ Advanced' : '✗ Eliminated'} · {scoreLabel}
        </div>
      )}
      {!result && isCurrent && (
        <div className="mt-2 font-body text-xs text-sepia-dark font-bold uppercase tracking-widest">
          Up next
        </div>
      )}
    </div>
  )
}

interface TournamentBracketProps {
  edition: WcEdition
  homeTeamName: string
  round: TournamentRound
  results: MatchResult[]
}

export function TournamentBracket({ edition, homeTeamName, round, results }: TournamentBracketProps) {
  const sfResult = results[0]
  const finalResult = results[1]

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <BracketMatch
        roundLabel="Semi-Final"
        homeTeam={homeTeamName}
        awayTeam={edition.runnerUp.label}
        result={sfResult}
        isCurrent={round === 'semifinal'}
        isCompleted={!!sfResult}
      />
      <div className="flex items-center justify-center">
        <div className="h-6 w-px bg-ink/20" />
      </div>
      <BracketMatch
        roundLabel="Final"
        homeTeam={homeTeamName}
        awayTeam={edition.champion.label}
        result={finalResult}
        isCurrent={round === 'final'}
        isCompleted={!!finalResult}
      />
    </div>
  )
}
