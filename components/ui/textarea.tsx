'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      `
      w-full min-h-[120px]  mb-[30px] rounded-md border border-input
      bg-background px-3 py-2 text-sm placeholder:text-muted-foreground
      focus:outline-none focus:ring-2 focus:ring-ring focus:border-input
      resize-none
      `,
      className
    )}
    {...props}
  />
))
Textarea.displayName = 'Textarea'