import type { ReactNode } from 'react'

type CardProps = {
  title?: string
  description?: string
  children: ReactNode
  className?: string
}

export function Card({ title, description, children, className = '' }: CardProps) {
  return (
    <section className={`rounded-[24px] border border-[var(--surface-border)] bg-[var(--surface)] p-6 shadow-[0_20px_70px_rgba(32,32,32,0.08)] backdrop-blur-xl ${className}`.trim()}>
      {title ? <div className="mb-4 space-y-1">
        <h3 className="text-lg font-semibold text-[var(--text-strong)]">{title}</h3>
        {description ? <p className="text-sm text-[var(--text-muted)]">{description}</p> : null}
      </div> : null}
      {children}
    </section>
  )
}
