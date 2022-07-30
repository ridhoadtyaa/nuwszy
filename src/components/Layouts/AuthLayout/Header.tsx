import Button from '@/components/UI/buttons/Button'
import NextImage from '@/components/UI/image/NextImage'
import UnstyledLink from '@/components/UI/links/UnstyedLink'

import useUser from '@/hooks/useUser'
import { clsxm } from '@/lib'
import { signOut } from '@/services/Supebase'

import { useRouter } from 'next/router'
import { GrPowerShutdown as LogOut } from 'react-icons/gr'

const Header: React.FunctionComponent = () => {
  const user = useUser()

  const router = useRouter()

  const signOutHandler = async () => {
    const res = await signOut()

    if (res) router.replace('/login')
  }

  return (
    <header>
      <nav
        className={clsxm(
          'py-5 px-10',
          'flex items-center justify-between',
          'border-b border-slate-200',
          'space-x-10'
        )}
      >
        <UnstyledLink href='/'>
          <NextImage
            src='/img/nuwszy-logo.png'
            width={40}
            height={40}
            alt='logo'
            title='Go to home page'
          />
        </UnstyledLink>

        <div>Hi, {user?.name}</div>
      </nav>

      <section
        className={clsxm(
          'px-10 py-4',
          'border-b border-slate-200',
          'flex items-center justify-between'
        )}
      >
        <div className={clsxm('space-x-10', 'font-medium')}>
          <UnstyledLink
            href='/dashboard'
            className={clsxm(
              'py-4',
              router.pathname === '/dashboard' && 'border-b-4 border-primary'
            )}
          >
            My Post
          </UnstyledLink>
          <UnstyledLink
            href='/dashboard/profile'
            className={clsxm(
              'py-4',
              router.pathname === '/dashboard/profile' && 'border-b-4 border-primary'
            )}
          >
            Profile
          </UnstyledLink>
        </div>
        <Button title='Log Out' onClick={signOutHandler}>
          <LogOut size={24} />
          <span className={clsxm('sr-only')}>Log Out Button</span>
        </Button>
      </section>
    </header>
  )
}

export default Header