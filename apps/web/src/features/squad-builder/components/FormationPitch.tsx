import { useState } from 'react'
import type { PositionedPlayer } from '@eternalxi/types'
import { FORMATIONS, POSITION_COLORS, POSITION_GROUPS } from '@/lib/formations'
import { PlayerPickerModal } from './PlayerPickerModal'
import { useSquadStore } from '@/store/squadStore'

const W = 280
const H = 380

interface FormationPitchProps {
  side: 'home' | 'away'
}

export function FormationPitch({ side }: FormationPitchProps) {
  const { home, away, setSlotPlayer, getUsedPlayerIds } = useSquadStore()
  const squad = side === 'home' ? home : away
  const [openSlot, setOpenSlot] = useState<number | null>(null)

  const slots = FORMATIONS[squad.formation]

  function toSVG(pct: number, axis: number) {
    return (pct / 100) * axis
  }

  function handleDotClick(index: number) {
    setOpenSlot(index)
  }

  function handleSelect(index: number, pp: PositionedPlayer) {
    setSlotPlayer(side, index, pp)
  }

  const usedIds = getUsedPlayerIds()

  return (
    <>
      <div className="relative w-full" style={{ maxWidth: W }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full rounded border-2 border-pitch-dark"
          style={{ background: '#4A6741' }}
        >
          {/* Pitch stripes */}
          {Array.from({ length: 5 }).map((_, i) => (
            <rect
              key={i}
              x={0} y={i * 76} width={W} height={38}
              fill="rgba(0,0,0,0.05)"
            />
          ))}

          {/* Halfway line */}
          <line x1={0} y1={0} x2={W} y2={0} stroke="rgba(255,255,255,0.5)" strokeWidth={1.5} />

          {/* Penalty area */}
          <rect x={W * 0.2} y={H * 0.78} width={W * 0.6} height={H * 0.18}
            fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={1.5} />

          {/* Goal area */}
          <rect x={W * 0.34} y={H * 0.9} width={W * 0.32} height={H * 0.08}
            fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={1.5} />

          {/* Goal posts */}
          <rect x={W * 0.4} y={H - 6} width={W * 0.2} height={6}
            fill="rgba(255,255,255,0.7)" />

          {/* Player dots */}
          {slots.map((slot, i) => {
            const cx = toSVG(slot.x, W)
            const cy = toSVG(slot.y, H)
            const filled = squad.slots[i]
            const group = POSITION_GROUPS[slot.position]
            const color = POSITION_COLORS[group]
            const r = 16

            return (
              <g
                key={i}
                onClick={() => handleDotClick(i)}
                style={{ cursor: 'pointer' }}
              >
                {/* Shadow */}
                <circle cx={cx + 1.5} cy={cy + 1.5} r={r} fill="rgba(0,0,0,0.3)" />

                {/* Main circle */}
                <circle
                  cx={cx} cy={cy} r={r}
                  fill={filled ? color : 'rgba(245, 230, 200, 0.3)'}
                  stroke={filled ? '#FAF0DC' : 'rgba(245,230,200,0.8)'}
                  strokeWidth={filled ? 2 : 1.5}
                  strokeDasharray={filled ? 'none' : '4 3'}
                />

                {filled ? (
                  <>
                    {/* Overall badge */}
                    <circle cx={cx + r - 3} cy={cy - r + 3} r={8} fill="#C4A35A" stroke="#1C1208" strokeWidth={1} />
                    <text x={cx + r - 3} y={cy - r + 7} textAnchor="middle"
                      fill="#1C1208" fontSize={7} fontWeight="bold" fontFamily="serif">
                      {filled.player.stats.overall}
                    </text>
                    {/* Player name */}
                    <text x={cx} y={cy + r + 11} textAnchor="middle"
                      fill="#FAF0DC" fontSize={8} fontWeight="bold" fontFamily="serif"
                      style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.8))' }}>
                      {filled.player.name.split(' ').pop()}
                    </text>
                    {/* Position in dot */}
                    <text x={cx} y={cy + 4} textAnchor="middle"
                      fill="rgba(250,240,220,0.7)" fontSize={8} fontFamily="sans-serif">
                      {slot.position}
                    </text>
                  </>
                ) : (
                  <>
                    <text x={cx} y={cy + 4} textAnchor="middle"
                      fill="rgba(245,230,200,0.9)" fontSize={9} fontWeight="bold" fontFamily="sans-serif">
                      {slot.position}
                    </text>
                    <text x={cx} y={cy + r + 11} textAnchor="middle"
                      fill="rgba(245,230,200,0.6)" fontSize={8} fontFamily="sans-serif">
                      +
                    </text>
                  </>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      {openSlot !== null && (
        <PlayerPickerModal
          open
          slotPosition={slots[openSlot].position}
          usedPlayerIds={usedIds}
          onSelect={pp => handleSelect(openSlot, pp)}
          onClose={() => setOpenSlot(null)}
        />
      )}
    </>
  )
}
