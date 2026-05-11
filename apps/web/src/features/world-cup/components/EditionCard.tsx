import type { WcEdition } from '@eternalxi/player-data'

interface EditionCardProps {
  edition: WcEdition
  onSelect: (edition: WcEdition) => void
}

export function EditionCard({ edition, onSelect }: EditionCardProps) {
  return (
    <button
      onClick={() => onSelect(edition)}
      className="border-2 border-ink bg-cream hover:bg-sepia/10 shadow-card p-4 text-left transition-colors group w-full"
    >
      <div className="font-display text-3xl font-black text-ink group-hover:text-sepia-dark">
        {edition.year}
      </div>
      <div className="font-body text-xs text-ink-faded mt-1 uppercase tracking-widest">
        {edition.host}
      </div>
      <div className="mt-3 border-t border-ink/10 pt-3 flex flex-col gap-1">
        <div className="font-body text-xs text-ink">
          <span className="text-sepia-dark font-bold">Champion:</span> {edition.champion.country}
        </div>
        <div className="font-body text-xs text-ink">
          <span className="text-ink-faded font-bold">Runner-up:</span> {edition.runnerUp.country}
        </div>
      </div>
    </button>
  )
}
