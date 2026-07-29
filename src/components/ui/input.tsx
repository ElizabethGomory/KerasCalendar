import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-xl border border-white/50 bg-white/30 px-3 py-2 text-sm text-keras-text placeholder:text-keras-text/40 focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 backdrop-blur-sm',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
)
Input.displayName = 'Input'

export { Input }
