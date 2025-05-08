'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface FormProps extends React.HTMLAttributes<HTMLDivElement> {}
export const Form = React.forwardRef<HTMLDivElement, FormProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-8', className)} {...props} />
  )
)
Form.displayName = 'Form'

export interface FormFieldProps {
  name: string
  children: React.ReactNode
}
export function FormField({ children }: FormFieldProps) {
  return <>{children}</>
}

export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {}
export const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('grid gap-1', className)} {...props} />
  )
)
FormItem.displayName = 'FormItem'

export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}
export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={cn('text-sm font-medium', className)} {...props} />
  )
)
FormLabel.displayName = 'FormLabel'

export interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {}
export const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
  )
)
FormControl.displayName = 'FormControl'

export interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
export const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-gray-500', className)} {...props} />
  )
)
FormDescription.displayName = 'FormDescription'

export interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {}
export const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-destructive', className)} {...props} />
  )
)
FormMessage.displayName = 'FormMessage'