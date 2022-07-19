import { clsxm } from '@/lib'

import { createElement } from 'react'

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const Button: React.FunctionComponent<ButtonProps> = ({ className: c, ...props }) => {
  const className = clsxm(
    'inline-flex items-center justify-center',
    'rounded-lg border border-blue-3 dark:border-blue-7',
    'outline-none transition-all',
    'focus-visible:ring',
    c
  )
  return createElement('button', { ...props, className })
}

export default Button
