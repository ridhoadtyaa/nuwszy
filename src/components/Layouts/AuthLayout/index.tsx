import { clsxm } from '@/lib'
import { supabase } from '@/services/Supebase'

import Header from './Header'

import { useRouter } from 'next/router'
import { useEffect } from 'react'

type AuthLayoutProps = {
  children: React.ReactNode
}

const AuthLayout: React.FunctionComponent<AuthLayoutProps> = ({ children }) => {
  const isUser = supabase.auth.user()

  const router = useRouter()

  useEffect(() => {
    if (!isUser) {
      router.push('/login')
    }
  }, [router, isUser])

  return (
    <>
      <Header />

      <main className={clsxm('px-10', 'mt-8')}>{children}</main>
    </>
  )
}

export default AuthLayout
