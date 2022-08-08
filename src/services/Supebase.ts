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
    const fileName = `${uuidv4()}-${uuidv4()}`

    await supabase.storage.from('thumbnails').upload(fileName, file, {
      cacheControl: '3600',
      upsert: true
    })

    const randomNumber = Math.floor(Math.random() * (999 - 100 + 1) + 100)

    const uploadPost = await supabase.from<Post>('posts').insert([
      {
        ...payload,
        thumbnail: fileName,
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

export const updatePost = async (payload: Post, userId: string) => {
  const toastId = toast.loading('Update the post...')
  try {
    if (!payload.content) {
      toast.error('Field content is required')
      return
    }

    if (payload.content.length < 200) {
      toast.error('Field content must be at least 200 characters')
      return
    }

    let fileName = payload.thumbnail

    if (typeof payload.thumbnail !== 'string') {
      const file = payload.thumbnail[0]
      fileName = `${uuidv4()}-${uuidv4()}`

      await supabase.storage.from('thumbnails').upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      })
    }

    const randomNumber = Math.floor(Math.random() * (999 - 100 + 1) + 100)

    const updatePost = await supabase
      .from<Post>('posts')
      .update({
        ...payload,
        thumbnail: fileName,
        slug:
          slugify(payload.title, { lower: true, locale: 'en' }) +
          '-' +
          userId.split('-')[0] +
          randomNumber
      })
      .eq('id', payload.id)

    if (updatePost.error) throw new CustomError(updatePost.error)

    toast.success('Post successfully updated')
    return updatePost.data
  } catch (error) {
    error instanceof Error && toast.error(error.message)
    return null
  } finally {
    toast.remove(toastId)
  }
}

export const getAllPosts = async () => {
  try {
    const { data, error } = await supabase
      .from<Post>('posts')
      .select()
      .order('created_at', { ascending: false })

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

export const getPostsByCategory = async (category: string) => {
  try {
    const { data, error } = await supabase
      .from<Post>('posts')
      .select()
      .eq('category', category)
      .order('created_at', { ascending: false })

    if (error) throw new CustomError(error)

    return data
  } catch (error) {
    console.log((error as Error).message)
  }
}

export const getUserPost = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from<Post>('posts')
      .select()
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw new CustomError(error)
    return data
  } catch (error) {
    console.log((error as Error).message)
  }
}

export const getThumbnailPost = (name: string) => {
  const { publicURL } = supabase.storage.from('thumbnails').getPublicUrl(name)

  return publicURL
}

export const updateViewsPost = async (slug: string, currentViews: number) => {
  try {
    const { data, error } = await supabase
      .from<Post>('posts')
      .update({ views: currentViews === null ? 1 : currentViews + 1 })
      .eq('slug', slug)

    if (error) throw new CustomError(error)
    return data
  } catch (error) {
    console.log((error as Error).message)
  }
}

export const deletePost = async (postId: number) => {
  const toastId = toast.loading('Waiting...')
  try {
    const { error } = await supabase.from<Post>('posts').delete().eq('id', postId)

    if (error) throw new CustomError(error)

    toast.success('Post successfully deleted')
    return true
  } catch (error) {
    error instanceof Error && toast.error(error.message)

    return false
  } finally {
    toast.remove(toastId)
  }
}

export const updateNameUser = async (newName: string) => {
  const toastId = toast.loading('Updating...')
  try {
    const { user, error } = await supabase.auth.update({
      data: { name: newName }
    })

    if (error) throw new CustomError(error)

    toast.success('Name successfully updated')
    return user
  } catch (error) {
    error instanceof Error && toast.error(error.message)

    return false
  } finally {
    toast.remove(toastId)
  }
}

export const updatePasswordUser = async (newPassword: string) => {
  const toastId = toast.loading('Updating...')
  try {
    const { user, error } = await supabase.auth.update({ password: newPassword })

    if (error) throw new CustomError(error)

    toast.success('Password successfully updated')
    return user
  } catch (error) {
    error instanceof Error && toast.error(error.message)

    return false
  } finally {
    toast.remove(toastId)
  }
}
