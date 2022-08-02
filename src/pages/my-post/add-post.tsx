import AuthLayout from '@/components/Layouts/AuthLayout'
import PrimaryButton from '@/components/UI/buttons/PrimaryButton'
import ErrorMessage from '@/components/forms/ErrorMessage'
import Input from '@/components/forms/Input'

import useUser from '@/hooks/useUser'
import { clsxm } from '@/lib'
import { createPost } from '@/services/Supebase'
import { postSchema } from '@/utils'

import { yupResolver } from '@hookform/resolvers/yup'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Post } from 'nuwszy'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const MarkdownEditor = dynamic(() => import('@/components/forms/MarkdownEditor'), { ssr: false })

const AddPostPage: NextPage = () => {
  const user = useUser()
  const router = useRouter()
  const [content, setContent] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<Post>({
    resolver: yupResolver(postSchema),
    shouldFocusError: true
  })

  const onSubmit: SubmitHandler<Post> = async (data) => {
    const res = await createPost(data, content, user?.id as string)

    if (res) {
      reset()
      setContent('')

      router.push('/my-post')
    }
  }

  return (
    <AuthLayout>
      <h2>Add Post</h2>

      <form className='mt-10 mb-16' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4'>
          <label htmlFor='title' className='block font-medium text-lg mb-1'>
            Title
          </label>
          <Input
            className={clsxm(
              'w-full',
              'border border-slate-300',
              'rounded-md',
              'py-2',
              'focus:ring focus:ring-blue-400',
              errors.title?.message && 'border-red-400 focus:border-red-400 focus:ring-red-400'
            )}
            {...register('title')}
          />
          <ErrorMessage message={errors.title?.message} />
        </div>
        <div className='mb-4'>
          <label htmlFor='title' className='block font-medium text-lg mb-1'>
            Description
          </label>
          <textarea
            maxLength={150}
            className={clsxm(
              'w-full',
              'border border-slate-300 outline-none',
              'rounded-md',
              'p-2',
              'focus:ring focus:ring-blue-400',
              errors.description?.message &&
                'border-red-400 focus:border-red-400 focus:ring-red-400'
            )}
            {...register('description')}
          />
          <ErrorMessage message={errors.description?.message} />
        </div>
        <div className='mb-4'>
          <label htmlFor='catgory' className='block font-medium text-lg mb-1'>
            Thumbnail
          </label>
          <Input
            accept='image/png, image/jpeg, image/jpg'
            type='file'
            className={clsxm(
              'text-sm text-gray-500',
              'file:py-2 file:mr-4 file:px-6 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-100 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-blue-200 hover:file:text-blue-800'
            )}
            required
            {...register('thumbnail')}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='category' className='block font-medium text-lg mb-1'>
            Category
          </label>
          <select
            id='category'
            className={clsxm(
              'w-full',
              'rounded-md',
              'border-slate-300 focus:ring focus:ring-blue-400',
              errors.category?.message && 'border-red-400 focus:border-red-400 focus:ring-red-400'
            )}
            {...register('category')}
          >
            <option value=''>---Select Category---</option>
            <option value='Design Tools'>Design Tools</option>
            <option value='Daily Update'>Daily Update</option>
            <option value='Tutorials'>Tutorials</option>
            <option value='Coding'>Coding</option>
          </select>
          <ErrorMessage message={errors.category?.message} />
        </div>
        <div className='mb-7'>
          <label htmlFor='content' className='block font-medium text-lg mb-1'>
            Content
          </label>
          <MarkdownEditor
            placeholder='Write your content'
            value={content}
            changeValue={setContent}
          />
          {!content.length && (
            <ErrorMessage message='Content is required, the content above is just the default content of the markdown editor' />
          )}
          {content.length <= 200 && (
            <ErrorMessage message='Content must be at least 200 characters' />
          )}
        </div>

        <PrimaryButton type='submit' disabled={isSubmitting}>
          Add Post
        </PrimaryButton>
      </form>
    </AuthLayout>
  )
}

export default AddPostPage
