import { clsxm } from '@/lib'

import Button from './Button'

type PrimaryButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const PrimaryButton: React.FunctionComponent<PrimaryButtonProps> = (props) => {
  return (
    <Button
      {...props}
      className={clsxm(
        'text-white font-medium text-sm',
        'bg-primary rounded-md hover:opacity-80',
        'transtion duration-300',
        'py-2 px-4',
        props.className
      )}
    >
      {props.children}
      <span className={clsxm('sr-only')}>{props.children} Button</span>
    </Button>
  )
}

export default PrimaryButton
