import { useState, useRef, useEffect } from 'react'

interface MultiSelectDropdownProps {
  label: string
  options: string[]
  selected: string[]
  onChange: (next: string[]) => void
  formatOption?: (opt: string) => string
  align?: 'left' | 'right'
}

export function MultiSelectDropdown({
  label,
  options,
  selected,
  onChange,
  formatOption,
  align = 'left',
}: MultiSelectDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function toggle(opt: string) {
    if (selected.includes(opt)) {
      onChange(selected.filter(s => s !== opt))
    } else {
      onChange([...selected, opt])
    }
  }

  const display = selected.length === 0
    ? label
    : selected.length === 1
      ? (formatOption ? formatOption(selected[0]) : selected[0])
      : `${selected.length} selected`

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-2 border-2 border-ink px-3 py-2 font-body text-sm transition-colors whitespace-nowrap
          ${selected.length > 0 ? 'bg-ink text-parchment' : 'bg-parchment text-ink hover:bg-parchment-dark'}`}
      >
        <span>{display}</span>
        <span className="text-xs opacity-60">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className={`absolute z-50 top-full mt-1 min-w-[160px] max-h-64 overflow-y-auto border-2 border-ink bg-cream shadow-card-lg ${align === 'right' ? 'right-0' : 'left-0'}`}>
          {selected.length > 0 && (
            <button
              type="button"
              onClick={() => onChange([])}
              className="w-full text-left px-3 py-1.5 font-body text-xs text-ink-faded hover:bg-parchment-dark border-b border-ink/10 uppercase tracking-wider"
            >
              Clear all
            </button>
          )}
          {options.map(opt => {
            const checked = selected.includes(opt)
            return (
              <label
                key={opt}
                className="flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-parchment-dark"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(opt)}
                  className="accent-ink"
                />
                <span className="font-body text-sm text-ink">
                  {formatOption ? formatOption(opt) : opt}
                </span>
              </label>
            )
          })}
        </div>
      )}
    </div>
  )
}
