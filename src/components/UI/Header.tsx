import { clsxm } from '@/lib'

import Nav from './Nav'

const Header: React.FunctionComponent = () => {
  return (
    <header className={clsxm('m-4 px-12 py-8', 'bg-primary', 'rounded-xl', 'text-white')}>
      <Nav />

      <div className={clsxm('mt-28 mb-20', 'layout')}>
        <div className={clsxm('mb-6', 'text-lg font-semibold', '-translate-x-1')}>👋 HELLO</div>
        <h1 className={clsxm('xl:text-5xl')}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit, iure sed?
        </h1>
      </div>
    </header>
  )
}

export default Header
