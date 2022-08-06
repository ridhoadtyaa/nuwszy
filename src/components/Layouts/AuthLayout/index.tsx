import LoadingPage from '@/components/Lazy/LoadingPage'

import { clsxm } from '@/lib'
import { supabase } from '@/services/Supebase'

import Header from './Header'

import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type AuthLayoutProps = {
  children: React.ReactNode
  title?: string
}

const AuthLayout: React.FunctionComponent<AuthLayoutProps> = ({ children, title }) => {
  const isUser = supabase.auth.user()

  const router = useRouter()

  useEffect(() => {
    if (!isUser) {
      router.push('/login')
    }
  }, [router, isUser])

  if (!isUser) {
    return <LoadingPage />
  }

  return (
    <>
      <Head>
        <title>{title ?? 'Dashboard user'} &mdash; Nuwszy</title>
      </Head>
      <Header />

      <main className={clsxm('px-10', 'mt-8')}>{children}</main>
    </>
  )
}

export default AuthLayout
