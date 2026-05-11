import type { HistoricalSquad } from '@eternalxi/types'

interface OpponentSquadCardProps {
  squad: HistoricalSquad
  label: string
}

export function OpponentSquadCard({ squad, label }: OpponentSquadCardProps) {
  return (
    <div className="border-2 border-ink bg-cream shadow-card overflow-hidden">
      <div className="bg-ink px-4 py-2 flex items-center justify-between">
        <span className="font-body text-xs font-bold uppercase tracking-widest text-parchment/80">{label}</span>
        <span className="font-body text-xs text-sepia">{squad.formation} · {squad.tactic}</span>
      </div>
      <div className="p-4">
        <div className="font-display text-xl font-black text-ink mb-3">{squad.label}</div>
        {squad.isChampion && (
          <div className="font-body text-xs text-sepia-dark font-bold uppercase tracking-widest mb-3">
            ★ World Champions
          </div>
        )}
        <div className="flex flex-col gap-1">
          {squad.players.map((slot, i) => (
            <div key={i} className="flex items-center gap-2 text-sm font-body">
              <span className="text-xs text-ink-faded w-8">{slot.assignedPosition}</span>
              <span className="text-ink flex-1">{slot.player.name}</span>
              <span className="text-xs font-bold text-sepia-dark">{slot.player.stats.overall}</span>
            </div>
          ))}
        </div>
        {squad.bench.length > 0 && (
          <>
            <div className="mt-3 mb-2 text-xs font-bold uppercase tracking-widest text-ink-faded border-t border-ink/10 pt-2">
              Bench
            </div>
            <div className="flex flex-col gap-1">
              {squad.bench.map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-body text-ink-faded">
                  <span className="text-xs w-8">{p.primaryPosition}</span>
                  <span className="flex-1">{p.name}</span>
                  <span className="text-xs font-bold">{p.stats.overall}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
