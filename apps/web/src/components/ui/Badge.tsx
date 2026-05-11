interface BadgeProps {
  children: React.ReactNode
  color?: string
  className?: string
}

export function Badge({ children, color, className = '' }: BadgeProps) {
  const style = color ? { backgroundColor: color, color: '#FAF0DC', borderColor: color } : {}
  return (
    <span
      style={style}
      className={`inline-block px-2 py-0.5 text-xs font-body font-bold border border-ink uppercase tracking-wider bg-ink text-parchment ${className}`}
    >
      {children}
    </span>
  )
}
