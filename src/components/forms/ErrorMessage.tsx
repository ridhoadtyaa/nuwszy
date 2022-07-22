import { clsxm } from '@/lib'

type ErrorMessageProps = {
  message: string | undefined
}

const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = ({ message }) => {
  return <span className={clsxm('text-red-400 text-sm')}>{message}</span>
}

export default ErrorMessage
