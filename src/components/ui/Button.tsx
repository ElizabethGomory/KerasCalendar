import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseClass = 'inline-flex items-center justify-center rounded-full border font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2'
  const variants: Record<ButtonVariant, string> = {
    primary: 'border-transparent bg-[var(--accent)] text-white shadow-sm hover:bg-[var(--accent-strong)]',
    secondary: 'border-[color:var(--border)] bg-white/70 text-[var(--text)] hover:bg-white',
    ghost: 'border-transparent bg-transparent text-[var(--text)] hover:bg-white/50',
  }
  const sizes: Record<ButtonSize, string> = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
  }

  return (
    <button
      className={`${baseClass} ${variants[variant]} ${sizes[size]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}
