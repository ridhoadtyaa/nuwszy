import { clsxm } from '@/lib'

import { createElement, forwardRef } from 'react'

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', className: c, ...props }, ref) => {
    const className = clsxm(
      'rounded-lg',
      'px-2',
      'focus:outline-0',
      'placeholder:text-sm md:placeholder:text-base',
      c
    )
    return createElement('input', { ...props, ref, autoComplete: 'off', className, type })
  }
)

Input.displayName = 'Input'

export default Input
