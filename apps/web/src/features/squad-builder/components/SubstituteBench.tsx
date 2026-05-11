import { useState, useMemo } from 'react'
import type { Player, WorldCupYear } from '@eternalxi/types'
import { useSquadStore } from '@/store/squadStore'
import { getAllPlayers } from '@eternalxi/player-data'
import { Modal } from '@/components/ui/Modal'
import { MultiSelectDropdown } from '@/components/ui/MultiSelectDropdown'
import { PlayerCard } from './PlayerCard'
import { POSITION_COLORS, POSITION_GROUPS } from '@/lib/formations'

interface SubstituteBenchProps {
  side: 'home' | 'away'
}

function BenchSlot({
  player,
  onClick,
}: {
  player: Player | null
  onClick: () => void
}) {
  if (!player) {
    return (
      <button
        onClick={onClick}
        className="w-20 h-24 border-2 border-dashed border-ink/30 bg-parchment hover:border-ink hover:bg-cream transition-colors flex flex-col items-center justify-center gap-1"
      >
        <span className="text-2xl text-ink/20">+</span>
        <span className="font-body text-xs text-ink-faded">Bench</span>
      </button>
    )
  }

  const group = POSITION_GROUPS[player.primaryPosition]
  const bandColor = POSITION_COLORS[group]

  return (
    <button
      onClick={onClick}
      className="w-20 h-24 border-2 border-ink bg-cream hover:shadow-card-lg hover:scale-[1.02] transition-all flex flex-col overflow-hidden"
    >
      <div
        className="w-full px-1 py-0.5 flex items-center justify-between"
        style={{ backgroundColor: bandColor }}
      >
        <span className="text-parchment text-xs font-bold">{player.primaryPosition}</span>
        <span className="text-parchment text-xs font-bold">{player.stats.overall}</span>
      </div>
      <div
        className="flex-1 flex items-center justify-center"
        style={{ backgroundColor: `${bandColor}18` }}
      >
        <span className="font-display font-black text-ink/30 text-base">
          {player.name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase()}
        </span>
      </div>
      <div className="px-1 py-0.5">
        <div className="font-body text-ink text-xs leading-tight truncate">{player.name.split(' ').slice(-1)[0]}</div>
      </div>
    </button>
  )
}

const WC_YEARS: WorldCupYear[] = [
  '1958', '1962', '1966', '1970', '1974', '1978',
  '1982', '1986', '1990', '1994', '1998', '2002',
  '2006', '2010', '2014', '2018', '2022',
]

export function SubstituteBench({ side }: SubstituteBenchProps) {
  const { home, away, setBenchPlayer, getUsedPlayerIds } = useSquadStore()
  const squad = side === 'home' ? home : away
  const [openSlot, setOpenSlot] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [wcFilter, setWcFilter] = useState<WorldCupYear[]>([])
  const [nationFilter, setNationFilter] = useState<string[]>([])

  const usedIds = getUsedPlayerIds()
  const all = getAllPlayers()

  const nations = useMemo(
    () => [...new Set(all.map(p => p.nationality))].sort(),
    [all]
  )

  const available = useMemo(() => all.filter(p => {
    if (usedIds.has(p.id)) return false
    if (nationFilter.length > 0 && !nationFilter.includes(p.nationality)) return false
    if (wcFilter.length > 0 && !wcFilter.some(y => p.worldCups.includes(y))) return false
    if (!search) return true
    const q = search.toLowerCase()
    return p.name.toLowerCase().includes(q) || p.nationality.toLowerCase().includes(q)
  }), [all, usedIds, wcFilter, nationFilter, search])

  function handleSelect(player: Player) {
    if (openSlot === null) return
    setBenchPlayer(side, openSlot, player)
    setOpenSlot(null)
    setSearch('')
    setWcFilter([])
    setNationFilter([])
  }

  function handleClear(idx: number) {
    setBenchPlayer(side, idx, null)
  }

  return (
    <>
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-widest text-ink-faded">
            Bench (5)
          </label>
          {squad.bench.some(Boolean) && (
            <button
              onClick={() => squad.bench.forEach((_, i) => handleClear(i))}
              className="text-xs text-ink-faded hover:text-ink font-body"
            >
              Clear all
            </button>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          {squad.bench.map((player, idx) => (
            <div key={idx} className="relative group">
              <BenchSlot
                player={player}
                onClick={() => {
                  if (player) handleClear(idx)
                  else setOpenSlot(idx)
                }}
              />
              {player && (
                <button
                  onClick={() => handleClear(idx)}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-ink text-parchment text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              )}
              {player && (
                <button
                  onClick={() => setOpenSlot(idx)}
                  className="absolute -bottom-1.5 -right-1.5 w-4 h-4 bg-sepia text-ink text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Replace"
                >
                  ↔
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <Modal
        open={openSlot !== null}
        onClose={() => { setOpenSlot(null); setSearch(''); setWcFilter([]); setNationFilter([]) }}
        title="Add Bench Player"
        wide
      >
        <div className="flex gap-2 mb-4 flex-wrap items-start">
          <input
            type="text"
            placeholder="Search name…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 min-w-[140px] border-2 border-ink bg-cream px-3 py-2 font-body text-sm text-ink placeholder:text-ink-faded focus:outline-none focus:border-sepia"
          />
          <MultiSelectDropdown
            label="Nations"
            options={nations}
            selected={nationFilter}
            onChange={setNationFilter}
          />
          <MultiSelectDropdown
            label="World Cups"
            options={WC_YEARS}
            selected={wcFilter}
            onChange={vals => setWcFilter(vals as WorldCupYear[])}
            formatOption={y => `'${y.slice(2)}`}
            align="right"
          />
        </div>
        {available.length === 0 ? (
          <p className="text-ink-faded font-body text-sm text-center py-8">No players available.</p>
        ) : (
          <div className="h-[480px] overflow-y-auto flex flex-wrap gap-3 content-start">
            {available.map(player => (
              <PlayerCard
                key={player.id}
                player={player}
                onClick={() => handleSelect(player)}
              />
            ))}
          </div>
        )}
      </Modal>
    </>
  )
}
