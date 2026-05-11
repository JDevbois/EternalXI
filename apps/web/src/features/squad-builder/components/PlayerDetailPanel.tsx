import type { Player } from '@eternalxi/types'
import { PlayerStatRadar } from './PlayerStatRadar'
import { POSITION_COLORS, POSITION_GROUPS } from '@/lib/formations'

interface PlayerDetailPanelProps {
  player: Player
}

const STAT_LABELS: Array<{ key: keyof Player['stats']; label: string }> = [
  { key: 'pace', label: 'PAC' },
  { key: 'shooting', label: 'SHO' },
  { key: 'passing', label: 'PAS' },
  { key: 'dribbling', label: 'DRI' },
  { key: 'defending', label: 'DEF' },
  { key: 'physical', label: 'PHY' },
]

function statColor(val: number): string {
  if (val >= 85) return '#2D5A27'
  if (val >= 70) return '#8B6914'
  return '#8B1A1A'
}

export function PlayerDetailPanel({ player }: PlayerDetailPanelProps) {
  const group = POSITION_GROUPS[player.primaryPosition]
  const bandColor = POSITION_COLORS[group]

  return (
    <div className="border-2 border-ink bg-cream shadow-card w-56">
      {/* Header band */}
      <div
        className="px-3 py-2 flex items-center justify-between"
        style={{ backgroundColor: bandColor }}
      >
        <div>
          <div className="text-parchment font-display font-bold text-sm leading-tight">
            {player.name}
          </div>
          <div className="text-parchment/70 font-body text-xs">{player.nationality}</div>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-display font-black text-parchment text-lg leading-none">
            {player.stats.overall}
          </span>
          <span className="text-parchment/70 font-body text-xs">{player.primaryPosition}</span>
        </div>
      </div>

      {/* Radar */}
      <PlayerStatRadar player={player} />

      {/* Stat bars */}
      <div className="px-3 pb-3 grid grid-cols-2 gap-x-3 gap-y-1">
        {STAT_LABELS.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className="font-body text-xs text-ink-faded w-7">{label}</span>
            <span
              className="font-display font-bold text-xs"
              style={{ color: statColor(player.stats[key]) }}
            >
              {player.stats[key]}
            </span>
          </div>
        ))}
      </div>

      {/* World Cup years */}
      <div className="px-3 pb-3">
        <div className="text-xs font-body font-bold uppercase tracking-widest text-ink-faded mb-1">World Cups</div>
        <div className="flex flex-wrap gap-1">
          {player.worldCups.map(year => (
            <span
              key={year}
              className="inline-block px-1.5 py-0.5 text-xs font-body font-bold border border-ink-faded text-ink-faded"
            >
              {year}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
