import { useState, useMemo } from 'react'
import type { Position, PositionedPlayer, WorldCupYear, Player } from '@eternalxi/types'
import { getAllPlayers } from '@eternalxi/player-data'
import { Modal } from '@/components/ui/Modal'
import { MultiSelectDropdown } from '@/components/ui/MultiSelectDropdown'
import { PlayerCard } from './PlayerCard'
import { PlayerDetailPanel } from './PlayerDetailPanel'

const WC_YEARS: WorldCupYear[] = [
  '1958', '1962', '1966', '1970', '1974', '1978',
  '1982', '1986', '1990', '1994', '1998', '2002',
  '2006', '2010', '2014', '2018', '2022',
]

interface PlayerPickerModalProps {
  open: boolean
  slotPosition: Position
  usedPlayerIds: Set<string>
  onSelect: (pp: PositionedPlayer) => void
  onClose: () => void
}

export function PlayerPickerModal({
  open,
  slotPosition,
  usedPlayerIds,
  onSelect,
  onClose,
}: PlayerPickerModalProps) {
  const [search, setSearch] = useState('')
  const [wcFilter, setWcFilter] = useState<WorldCupYear[]>([])
  const [nationFilter, setNationFilter] = useState<string[]>([])
  const [hovered, setHovered] = useState<Player | null>(null)

  const all = getAllPlayers()

  const eligible = useMemo(
    () => all.filter(p => p.positions.includes(slotPosition)),
    [all, slotPosition]
  )

  const nations = useMemo(
    () => [...new Set(eligible.map(p => p.nationality))].sort(),
    [eligible]
  )

  const filtered = useMemo(() => {
    return eligible.filter(p => {
      if (nationFilter.length > 0 && !nationFilter.includes(p.nationality)) return false
      if (wcFilter.length > 0 && !wcFilter.some(y => p.worldCups.includes(y))) return false
      if (search) {
        const q = search.toLowerCase()
        if (!p.name.toLowerCase().includes(q) && !p.nationality.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [eligible, wcFilter, nationFilter, search])

  function handleSelect(player: Player) {
    onSelect({ player, assignedPosition: slotPosition })
    onClose()
    setSearch('')
    setWcFilter([])
    setNationFilter([])
    setHovered(null)
  }

  function handleClose() {
    onClose()
    setSearch('')
    setWcFilter([])
    setNationFilter([])
    setHovered(null)
  }

  return (
    <Modal open={open} onClose={handleClose} title={`Select ${slotPosition}`} wide>
      {/* Filters */}
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

      <div className="flex gap-4">
        {/* Player grid */}
        <div className="flex-1 min-w-0 h-[480px] overflow-y-auto pr-1">
          {filtered.length === 0 ? (
            <p className="text-ink-faded font-body text-sm text-center py-8">No players found.</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {filtered.map(player => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  disabled={usedPlayerIds.has(player.id)}
                  onClick={() => !usedPlayerIds.has(player.id) && handleSelect(player)}
                  onMouseEnter={() => setHovered(player)}
                  onMouseLeave={() => setHovered(null)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div className="w-56 shrink-0 hidden md:block h-[480px] overflow-y-auto">
          {hovered ? (
            <div className="sticky top-0">
              <PlayerDetailPanel player={hovered} />
            </div>
          ) : (
            <div className="border-2 border-dashed border-ink/20 h-full flex items-center justify-center">
              <p className="text-ink-faded font-body text-xs text-center px-4">
                Hover a player to see stats
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}
