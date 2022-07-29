import { clsxm } from '@/lib'

import Nav from './Nav'

type HeaderProps = {
  customHeader?: JSX.Element
}

const Header: React.FunctionComponent<HeaderProps> = ({ customHeader }) => {
  return (
    <header
      className={clsxm('md:m-4 px-8 md:px-12 py-8', 'bg-primary', 'md:rounded-xl', 'text-white')}
    >
      <Nav />

      <div className={clsxm('mt-28 mb-20', 'layout', 'w-full md:w-11/12')}>
        {customHeader ? (
          <>{customHeader}</>
        ) : (
          <>
            <div className={clsxm('mb-6', 'text-xl font-semibold')}>👋 HELLO</div>
            <h1 className={clsxm('text-3xl md:text-4xl xl:text-5xl')}>
              Get lots of interesting insights from various people here.
            </h1>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
