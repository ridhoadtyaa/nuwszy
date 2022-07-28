import { CustomError } from '@/utils'

import { SUPABASE_ANON_KEY, SUPABASE_URL } from './env'

import { createClient } from '@supabase/supabase-js'
import { Post, SigninUserPayload, SignupUserPayload } from 'nuwszy'

export const supabase = createClient(SUPABASE_URL as string, SUPABASE_ANON_KEY as string)

export const signIn = async (payload: SigninUserPayload) => {
  try {
    const { error } = await supabase.auth.signIn({
      email: payload.email,
      password: payload.password
    })

    if (error) throw new CustomError(error)

    return true
  } catch (error) {
    console.log((error as Error).message)
    return false
  }
}

export const signUp = async (payload: SignupUserPayload) => {
  try {
    const { error } = await supabase.auth.signUp(
      {
        email: payload.email,
        password: payload.password
      },
      { data: { name: payload.name } }
    )

    if (error) throw new CustomError(error)

    return true
  } catch (error) {
    console.log((error as Error).message)
    return false
  }
}

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) throw new CustomError(error)

    return true
  } catch (error) {
    console.log((error as Error).message)
    return false
  }
}

export const getAllPosts = async () => {
  try {
    const { data, error } = await supabase.from<Post[]>('posts').select()

    if (error) throw new CustomError(error)

    return data
  } catch (error) {
    console.log((error as Error).message)
  }
}

export const getDetailPost = async (slug: string) => {
  try {
    const { data, error } = await supabase.from<Post>('posts').select().eq('slug', slug).single()

    if (error) throw new CustomError(error)

    return data
  } catch (error) {
    console.log((error as Error).message)
  }
}
