import { clsxm } from '@/lib'

import Nav from './Nav'

const Header: React.FunctionComponent = () => {
  return (
    <header className={clsxm('md:m-4 px-12 py-8', 'bg-primary', 'md:rounded-xl', 'text-white')}>
      <Nav />

      <div className={clsxm('mt-28 mb-20', 'layout', 'w-full md:w-11/12')}>
        <div className={clsxm('mb-6', 'text-lg font-semibold')}>👋 HELLO</div>
        <h1 className={clsxm('text-3xl md:text-4xl xl:text-5xl')}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit, iure sed?
        </h1>
      </div>
    </header>
  )
}

export default Header
