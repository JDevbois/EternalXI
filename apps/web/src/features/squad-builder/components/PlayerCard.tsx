import type { Player } from '@eternalxi/types'
import { POSITION_COLORS, POSITION_GROUPS } from '@/lib/formations'

interface PlayerCardProps {
  player: Player
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  selected?: boolean
  disabled?: boolean
  compact?: boolean
}

function initials(name: string): string {
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()
}

export function PlayerCard({
  player,
  onClick,
  onMouseEnter,
  onMouseLeave,
  selected = false,
  disabled = false,
  compact = false,
}: PlayerCardProps) {
  const group = POSITION_GROUPS[player.primaryPosition]
  const bandColor = POSITION_COLORS[group]

  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={disabled}
      className={`relative flex flex-col border-2 transition-all duration-100 text-left font-body
        ${compact ? 'w-28' : 'w-36'}
        ${selected ? 'border-sepia shadow-card-lg scale-[1.02]' : 'border-ink shadow-card'}
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:shadow-card-lg hover:scale-[1.01] cursor-pointer'}
        bg-cream`}
    >
      {/* Colored position band */}
      <div
        className="w-full flex items-center justify-between px-2 py-1"
        style={{ backgroundColor: bandColor }}
      >
        <span className="text-parchment text-xs font-bold tracking-widest">
          {player.primaryPosition}
        </span>
        <span className="text-parchment text-xs font-bold">
          {player.worldCups.length === 1
            ? `'${player.worldCups[0].slice(2)}`
            : `'${player.worldCups[0].slice(2)}–'${player.worldCups[player.worldCups.length - 1].slice(2)}`}
        </span>
      </div>

      {/* Silhouette area */}
      <div
        className="w-full flex items-center justify-center bg-parchment-dark"
        style={{ height: compact ? 56 : 72, backgroundColor: `${bandColor}18` }}
      >
        <span className="font-display font-black text-ink/30" style={{ fontSize: compact ? 22 : 28 }}>
          {initials(player.name)}
        </span>
      </div>

      {/* Player info */}
      <div className="px-2 pt-1.5 pb-2 flex-1">
        <div className={`font-display font-bold leading-tight text-ink ${compact ? 'text-xs' : 'text-sm'}`}>
          {player.name}
        </div>
        <div className="text-xs text-ink-faded font-body mt-0.5">{player.nationality}</div>
      </div>

      {/* Overall badge */}
      <div
        className="absolute top-6 right-1.5 w-7 h-7 flex items-center justify-center border-2 border-ink bg-sepia"
      >
        <span className="font-display font-black text-ink" style={{ fontSize: 11 }}>
          {player.stats.overall}
        </span>
      </div>
    </button>
  )
}
