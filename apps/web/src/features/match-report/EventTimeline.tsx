import type { MatchEvent } from '@eternalxi/types'

const EVENT_ICONS: Record<MatchEvent['type'], string> = {
  GOAL: '⚽',
  YELLOW_CARD: '🟨',
  RED_CARD: '🟥',
  SAVE: '🧤',
  SUBSTITUTION: '🔄',
  PENALTY_SCORED: '⚽',
  PENALTY_MISSED: '✗',
}

interface EventRowProps {
  event: MatchEvent
}

function EventRow({ event }: EventRowProps) {
  const icon = EVENT_ICONS[event.type]
  const isHome = event.team === 'home'

  return (
    <div
      className={`flex items-start gap-3 px-3 py-2 border-b border-ink/10 text-sm font-body
        ${event.type === 'GOAL' || event.type === 'PENALTY_SCORED' ? 'bg-sepia/10' : ''}
        ${event.type === 'RED_CARD' || event.type === 'PENALTY_MISSED' ? 'bg-red-900/5' : ''}`}
    >
      <span className="text-xs text-ink-faded w-8 shrink-0 pt-0.5">{event.minute}'</span>
      <span className="text-base leading-none pt-0.5">{icon}</span>
      <div className={`flex-1 ${isHome ? 'text-left' : 'text-right'}`}>
        <span className={`font-medium ${isHome ? 'text-ink' : 'text-sepia-dark'} ${event.type === 'PENALTY_MISSED' ? 'line-through opacity-50' : ''}`}>
          {event.playerName}
        </span>
        {event.assistName && event.type === 'GOAL' && (
          <span className="text-xs text-ink-faded block">Assist: {event.assistName}</span>
        )}
        {event.assistName && event.type === 'SUBSTITUTION' && (
          <span className="text-xs text-ink-faded block">← {event.assistName}</span>
        )}
      </div>
      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${isHome ? 'bg-ink' : 'bg-sepia'}`} />
    </div>
  )
}

function HalfDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-ink/5 border-b border-ink/10">
      <div className="flex-1 h-px bg-ink/20" />
      <span className="font-body text-xs font-bold uppercase tracking-widest text-ink-faded">{label}</span>
      <div className="flex-1 h-px bg-ink/20" />
    </div>
  )
}

const PENALTY_TYPES = new Set<MatchEvent['type']>(['PENALTY_SCORED', 'PENALTY_MISSED'])

interface EventTimelineProps {
  events: MatchEvent[]
  maxHeight?: string
}

export function EventTimeline({ events, maxHeight = '320px' }: EventTimelineProps) {
  const firstHalf = events.filter(e => e.minute <= 45 && !PENALTY_TYPES.has(e.type))
  const secondHalf = events.filter(e => e.minute > 45 && !PENALTY_TYPES.has(e.type))
  const penalties = events.filter(e => PENALTY_TYPES.has(e.type))

  return (
    <div className="overflow-y-auto" style={{ maxHeight }}>
      {events.length === 0 ? (
        <p className="text-center text-ink-faded font-body text-xs py-6">No events.</p>
      ) : (
        <>
          {firstHalf.length > 0 && (
            <>
              <HalfDivider label="First Half" />
              {firstHalf.map((event, i) => (
                <EventRow key={`1h-${i}`} event={event} />
              ))}
            </>
          )}
          {secondHalf.length > 0 && (
            <>
              <HalfDivider label="Second Half" />
              {secondHalf.map((event, i) => (
                <EventRow key={`2h-${i}`} event={event} />
              ))}
            </>
          )}
          {penalties.length > 0 && (
            <>
              <HalfDivider label="Penalty Shootout" />
              {penalties.map((event, i) => (
                <EventRow key={`pen-${i}`} event={event} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  )
}
