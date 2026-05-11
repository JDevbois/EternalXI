import type { MatchResult } from '@eternalxi/types'

function StatBar({ label, home, away }: { label: string; home: number; away: number }) {
  const total = home + away || 1
  const homePct = Math.round((home / total) * 100)
  const awayPct = 100 - homePct

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs font-body font-bold text-ink">
        <span>{home}</span>
        <span className="text-ink-faded uppercase tracking-widest text-xs">{label}</span>
        <span>{away}</span>
      </div>
      <div className="flex h-2 border border-ink overflow-hidden">
        <div className="bg-ink transition-all" style={{ width: `${homePct}%` }} />
        <div className="bg-sepia transition-all" style={{ width: `${awayPct}%` }} />
      </div>
    </div>
  )
}

interface MatchStatsPanelProps {
  result: MatchResult
}

export function MatchStatsPanel({ result }: MatchStatsPanelProps) {
  const { stats, possession } = result

  return (
    <div className="border-2 border-ink bg-cream p-4 shadow-card">
      <h3 className="font-display text-lg font-bold text-ink mb-4 pb-2 border-b-2 border-ink">
        Match Stats
      </h3>
      <div className="flex flex-col gap-4">
        <StatBar label="Possession %" home={possession.home} away={possession.away} />
        <StatBar label="Shots" home={stats.shots.home} away={stats.shots.away} />
        <StatBar label="On Target" home={stats.shotsOnTarget.home} away={stats.shotsOnTarget.away} />
        <StatBar label="Passes" home={stats.passes.home} away={stats.passes.away} />
        <StatBar label="Pass Acc. %" home={stats.passAccuracy.home} away={stats.passAccuracy.away} />
        <StatBar label="Corners" home={stats.corners.home} away={stats.corners.away} />
        <StatBar label="Fouls" home={stats.fouls.home} away={stats.fouls.away} />
        <StatBar label="Yellow Cards" home={stats.yellowCards.home} away={stats.yellowCards.away} />
        <StatBar label="Red Cards" home={stats.redCards.home} away={stats.redCards.away} />
      </div>
    </div>
  )
}
