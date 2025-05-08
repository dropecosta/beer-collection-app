'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

export const Grid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'grid gap-x-20 gap-[80px] grid-cols-[repeat(auto-fill,minmax(280px,1fr))]',
        className
      )}
      {...props}
    />
  )
)
Grid.displayName = 'Grid'