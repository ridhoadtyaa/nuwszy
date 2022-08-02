import { CustomError } from '@/utils'

import { SUPABASE_ANON_KEY, SUPABASE_URL } from './env'

import { createClient } from '@supabase/supabase-js'
import { Post, SigninUserPayload, SignupUserPayload } from 'nuwszy'
import toast from 'react-hot-toast'
import slugify from 'slugify'
import { v4 as uuidv4 } from 'uuid'

export const supabase = createClient(SUPABASE_URL as string, SUPABASE_ANON_KEY as string)

export const signIn = async (payload: SigninUserPayload) => {
  const toastId = toast.loading('Waiting...')
  try {
    const { error } = await supabase.auth.signIn({
      email: payload.email,
      password: payload.password
    })

    if (error) throw new CustomError(error)

    toast.success('Login successful')
    return true
  } catch (error) {
    error instanceof Error && toast.error(error.message)

    return false
  } finally {
    toast.remove(toastId)
  }
}

export const signUp = async (payload: SignupUserPayload) => {
  const toastId = toast.loading('Waiting...')
  try {
    const { error } = await supabase.auth.signUp(
      {
        email: payload.email,
        password: payload.password
      },
      { data: { name: payload.name } }
    )

    if (error) throw new CustomError(error)

    toast.success('Register successfully! Check your email to verify your account.', {
      duration: 2000
    })
    return true
  } catch (error) {
    error instanceof Error && toast.error(error.message)

    return false
  } finally {
    toast.remove(toastId)
  }
}

export const signOut = async () => {
  const toastId = toast.loading('Waiting...')
  try {
    const { error } = await supabase.auth.signOut()

    if (error) throw new CustomError(error)

    toast.success('Logout successful')

    return true
  } catch (error) {
    error instanceof Error && toast.error(error.message)

    return false
  } finally {
    toast.remove(toastId)
  }
}

export const createPost = async (payload: Post, content: string, userId: string) => {
  const toastId = toast.loading('Make a post...')
  try {
    if (!content) {
      toast.error('Field content is required')
      return
    }

    if (content.length < 200) return

    const file = payload.thumbnail[0]

    const uploadThumbnail = await supabase.storage
      .from('thumbnails')
      .upload(`${userId}-${uuidv4()}`, file, {
        cacheControl: '3600',
        upsert: true
      })

    const randomNumber = Math.floor(Math.random() * (999 - 100 + 1) + 100)

    const uploadPost = await supabase.from<Post>('posts').insert([
      {
        ...payload,
        thumbnail: uploadThumbnail.data?.Key,
        content,
        user_id: userId,
        slug:
          slugify(payload.title, { lower: true, locale: 'en' }) +
          '-' +
          userId.split('-')[0] +
          randomNumber
      }
    ])

    if (uploadPost.error) throw new CustomError(uploadPost.error)

    toast.success('Post successfully created')
    return uploadPost.data
  } catch (error) {
    error instanceof Error && toast.error(error.message)
    return null
  } finally {
    toast.remove(toastId)
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
