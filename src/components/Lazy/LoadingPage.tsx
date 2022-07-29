import { clsxm } from '@/lib'

import { AiOutlineLoading3Quarters as Loading } from 'react-icons/ai'

const LoadingPage: React.FunctionComponent = () => {
  return (
    <div className={clsxm('w-full h-screen', 'flex')}>
      <Loading className={clsxm('text-blue-600', 'animate-spin', 'm-auto')} size={60} />
    </div>
  )
}

export default LoadingPage
