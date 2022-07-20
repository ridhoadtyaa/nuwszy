import { clsxm } from '@/lib'

import { createElement } from 'react'

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const Button: React.FunctionComponent<ButtonProps> = ({ className, ...props }) => {
  return createElement('button', {
    ...props,
    className: clsxm('inline-flex items-center justify-center', className)
  })
}

export default Button
