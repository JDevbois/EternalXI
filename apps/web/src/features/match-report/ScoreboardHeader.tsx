import { motion } from 'framer-motion'
import type { MatchResult } from '@eternalxi/types'

interface ScoreboardHeaderProps {
  result: MatchResult
  homeTeamName: string
  awayTeamName: string
  liveHome?: number
  liveAway?: number
  isLive?: boolean
  flashGoal?: boolean
}

export function ScoreboardHeader({
  result,
  homeTeamName,
  awayTeamName,
  liveHome,
  liveAway,
  isLive = false,
  flashGoal = false,
}: ScoreboardHeaderProps) {
  const displayHome = liveHome ?? result.homeScore
  const displayAway = liveAway ?? result.awayScore

  return (
    <motion.div
      animate={flashGoal ? { scale: [1, 1.06, 1] } : {}}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md border-4 border-ink bg-ink text-parchment p-4 shadow-card-lg text-center"
    >
      <div className="font-body text-xs uppercase tracking-widest text-parchment/60 mb-2">
        {isLive ? 'Live' : 'Full Time'}
      </div>
      <div className="grid grid-cols-3 items-center gap-4">
        <div className="font-display font-bold text-lg leading-tight">{homeTeamName}</div>
        <div className="font-display font-black text-5xl tracking-tight">
          {displayHome} – {displayAway}
        </div>
        <div className="font-display font-bold text-lg leading-tight">{awayTeamName}</div>
      </div>
      {!isLive && (
        <div className="font-body text-xs text-parchment/40 mt-2">
          HT {result.htHomeScore} – {result.htAwayScore}
        </div>
      )}
    </motion.div>
  )
}
