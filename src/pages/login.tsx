import Button from '@/components/UI/buttons/Button'
import NextImage from '@/components/UI/image/NextImage'
import UnstyledLink from '@/components/UI/links/UnstyedLink'
import ErrorMessage from '@/components/forms/ErrorMessage'
import Input from '@/components/forms/Input'

import { clsxm } from '@/lib'
import { signIn, supabase } from '@/services/Supebase'
import { loginSchema } from '@/utils'

import { yupResolver } from '@hookform/resolvers/yup'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { SigninUserPayload } from 'nuwszy'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { MdEmail, MdLock } from 'react-icons/md'

const LoginPage: NextPage = () => {
  const user = supabase.auth.user()
  const router = useRouter()
  const [passwordShown, setPasswordShown] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SigninUserPayload>({
    resolver: yupResolver(loginSchema),
    shouldFocusError: true
  })

  const onSubmit: SubmitHandler<SigninUserPayload> = async (data) => {
    const res = await signIn(data)

    if (res) router.push('/dashboard')
  }

  useEffect(() => {
    if (user) router.push('/dashboard')
  }, [router, user])

  return (
    <div className={clsxm('bg-blue-100/50 min-h-screen', 'flex items-center')}>
      <div className={clsxm('max-w-lg mx-auto w-11/12 sm:w-full', 'py-8')}>
        <UnstyledLink href='/'>
          <NextImage
            src='/img/nuwszy-logo.png'
            width={50}
            height={50}
            alt='Nuwszy Logo'
            className={clsxm('mx-auto', 'mb-12')}
          />
        </UnstyledLink>
        <div className={clsxm('bg-white rounded-md', 'py-12 px-10')}>
          <h3 className={clsxm('text-primary font-medium text-center', 'mb-3')}>Welcome Back</h3>
          <p className={clsxm('text-center text-slate-400/80', 'mb-12')}>
            Enter your crendetials to access your account
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={clsxm('relative', 'mb-8')}>
              <Input
                placeholder='Enter your email'
                type='email'
                className={clsxm(
                  'focus:ring focus:ring-blue-300 border border-blue-100',
                  errors.email?.message && 'border-red-400 focus:border-red-400 focus:ring-red-400',
                  'placeholder:text-slate-400 md:placeholder:text-sm',
                  'rounded-sm w-full',
                  'py-2 pl-12',
                  'mb-2'
                )}
                {...register('email')}
              />
              <MdEmail
                className={clsxm('text-blue-400', 'absolute top-[9.5px] left-2')}
                size={23}
              />
              <ErrorMessage message={errors.email?.message} />
            </div>
            <div className={clsxm('relative', 'mb-10')}>
              <Input
                placeholder='Enter your password'
                type={passwordShown ? 'text' : 'password'}
                className={clsxm(
                  'focus:ring focus:ring-blue-300 border border-blue-100',
                  errors.password?.message &&
                    'border-red-400 focus:border-red-400 focus:ring-red-400',
                  'placeholder:text-slate-400 md:placeholder:text-sm',
                  'rounded-sm w-full',
                  'py-2 px-12',
                  'mb-2'
                )}
                {...register('password')}
              />
              <MdLock className={clsxm('text-blue-400', 'absolute top-[9.5px] left-2')} size={23} />
              {passwordShown ? (
                <AiFillEyeInvisible
                  onClick={() => setPasswordShown(false)}
                  className='text-slate-300 absolute top-[9.5px] right-3 cursor-pointer'
                  size={23}
                />
              ) : (
                <AiFillEye
                  onClick={() => setPasswordShown(true)}
                  className='text-slate-300 absolute top-[9.5px] right-3 cursor-pointer'
                  size={23}
                />
              )}
              <ErrorMessage message={errors.password?.message} />
            </div>
            <Button
              type='submit'
              disabled={isSubmitting}
              className={clsxm(
                'focus:ring focus:ring-blue-400 focus:outline-none',
                'bg-blue-500 rounded-lg hover:bg-blue-600',
                'text-white font-medium',
                'transition duration-300',
                'w-full block',
                'py-3'
              )}
            >
              Login
            </Button>
          </form>
        </div>
        <UnstyledLink
          href='/register'
          className={clsxm('text-slate-400  text-center', 'mt-8', 'block')}
        >
          Don&apos;t have an account ?{' '}
          <span className={clsxm('text-blue-500 font-medium')}>Register</span>
        </UnstyledLink>
      </div>
    </div>
  )
}

export default LoginPage
