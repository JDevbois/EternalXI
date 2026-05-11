import { type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const base =
  'inline-flex items-center justify-center font-body font-bold tracking-wide border-2 transition-all duration-100 active:translate-y-px disabled:opacity-40 disabled:cursor-not-allowed'

const variants = {
  primary:
    'bg-ink text-parchment border-ink hover:bg-ink-light shadow-card active:shadow-none',
  secondary:
    'bg-parchment text-ink border-ink hover:bg-parchment-dark shadow-card active:shadow-none',
  ghost: 'bg-transparent text-ink border-transparent hover:border-ink',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-8 py-3.5 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
