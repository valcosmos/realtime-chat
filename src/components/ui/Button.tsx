import type { ButtonHTMLAttributes, ReactNode } from 'react'
import React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const buttonVariants = cva('active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-color focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-slate-900 text-white hover:bg-slate-800',
        ghost: 'bg-transparent hover:text-slate-900 hover:bg-slate-200',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 py-2 px-4',
        lg: 'h-11 px-8',
      },
      defaultVariants: {
        variant: 'default',
        size: 'default',
      },

    },

  },
)

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children: ReactNode
  isLoading?: boolean
}

export default function Button({ className, children, variant, isLoading, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} disabled={isLoading} {...props}>
      {isLoading ? <Loader2 className='w-4 h-4 mr-2 animate-spin' /> : null}
      {children}
    </button>
  )
}
