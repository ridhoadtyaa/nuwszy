import { clsxm } from '@/lib'

import Button from '../UI/buttons/Button'
import UnstyledLink from '../UI/links/UnstyedLink'

import { useState } from 'react'
import { AiOutlineClose as CloseMenu, AiOutlineMenu as HambMenu } from 'react-icons/ai'
import OutsideClickHandler from 'react-outside-click-handler'

const navItems = [
  {
    title: 'Design Tools',
    href: '/category/design-tools'
  },
  {
    title: 'Daily Update',
    href: '/category/daily-update'
  },
  {
    title: 'Tutorials',
    href: '/category/tutorials'
  },
  {
    title: 'Coding',
    href: '/category/coding'
  }
]

const Nav: React.FunctionComponent = () => {
  const [isNavMobile, setIsNavMovile] = useState<boolean>(false)

  return (
    <nav className={clsxm('flex justify-between items-center', 'relative')}>
      <UnstyledLink href='/'>
        <h3>NUWSZY</h3>
      </UnstyledLink>
      <OutsideClickHandler onOutsideClick={() => setIsNavMovile(false)}>
        <Button onClick={() => setIsNavMovile((prev) => !prev)} className={clsxm('lg:hidden')}>
          {isNavMobile ? <CloseMenu size={25} /> : <HambMenu size={25} />}
          <span className={clsxm('sr-only')}>Navbar Mobile Toogle</span>
        </Button>
      </OutsideClickHandler>
      <div
        className={clsxm(
          'absolute top-10 right-0 z-99 w-48 lg:static lg:w-full lg:opacity-100',
          'lg:flex lg:items-center lg:justify-between',
          'bg-white lg:bg-transparent',
          'rounded-md overflow-hidden lg:rounded-none lg:overflow-auto',
          'text-black lg:text-white',
          'divide-y divide-slate-300 lg:divide-y-0 transition-all ease-in',
          isNavMobile ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div
          className={clsxm('flex flex-col lg:flex-row lg:items-center lg:mx-auto', 'lg:space-x-7')}
        >
          {navItems.map((item) => (
            <UnstyledLink
              href={item.href}
              className={clsxm(
                'text-sm lg:text-lg font-medium text-center',
                'lg:hover:text-slate-400',
                'transition duration-300',
                'py-2',
                'hover:bg-slate-200 w-full lg:w-fit lg:hover:bg-transparent'
              )}
              key={item.title}
            >
              {item.title}
            </UnstyledLink>
          ))}
        </div>
        <UnstyledLink
          href='/login'
          className={clsxm(
            'bg-slate-200 hover:bg-slate-300 lg:bg-white/10 lg:hover:bg-white/20',
            'py-2 px-6',
            'text-sm font-medium lg:text-base',
            'lg:rounded-lg',
            'transition duration-300',
            'flex justify-center lg:block'
          )}
        >
          Login
          <span className={clsxm('sr-only')}>Login button</span>
        </UnstyledLink>
      </div>
    </nav>
  )
}

export default Nav
