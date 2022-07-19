import { clsxm } from '@/lib'

import UnstyledLink from './links/UnstyedLink'

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
    title: 'Library',
    href: '/category/library'
  }
]

const Nav: React.FunctionComponent = () => {
  return (
    <nav className={clsxm('flex justify-between items-center')}>
      <UnstyledLink href='/'>
        <h3>NUWSZY</h3>
      </UnstyledLink>
      <div className={clsxm('flex items-center', 'space-x-7')}>
        {navItems.map((item) => (
          <UnstyledLink
            href={item.href}
            className={clsxm(
              'text-lg font-medium',
              'hover:text-slate-400',
              'transition duration-300'
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
          'bg-white/10 hover:bg-white/20',
          'py-2 px-6',
          'text-sm font-medium',
          'rounded-lg',
          'transition duration-300'
        )}
      >
        Login
        <span className={clsxm('sr-only')}>Login button</span>
      </UnstyledLink>
    </nav>
  )
}

export default Nav
