import AuthLayout from '@/components/Layouts/AuthLayout'
import PrimaryButton from '@/components/UI/buttons/PrimaryButton'
import NextImage from '@/components/UI/image/NextImage'
import ErrorMessage from '@/components/forms/ErrorMessage'
import Input from '@/components/forms/Input'

import useUser from '@/hooks/useUser'
import { clsxm } from '@/lib'
import { getDetailPost, getThumbnailPost, updatePost } from '@/services/Supebase'
import { postSchema } from '@/utils'

import { yupResolver } from '@hookform/resolvers/yup'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Post } from 'nuwszy'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const MarkdownEditor = dynamic(() => import('@/components/forms/MarkdownEditor'), { ssr: false })

const category = ['Design Tools', 'Daily Update', 'Tutorials', 'Coding']

type ServerSideParams = {
  params: {
    slug: string
  }
}

type EditPostPageProps = {
  post: Post
}

export const getServerSideProps = async ({ params }: ServerSideParams) => {
  const post = await getDetailPost(params.slug)

  return { props: { post } }
}

const EditPostPage: NextPage<EditPostPageProps> = ({ post }) => {
  const user = useUser()
  const router = useRouter()
  const [content, setContent] = useState(post.content)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Post>({
    resolver: yupResolver(postSchema),
    shouldFocusError: true,
    defaultValues: {
      title: post.title,
      description: post.description,
      category: post.category,
      thumbnail: post.thumbnail,
      content: post.content
    }
  })

  const onSubmit: SubmitHandler<Post> = async (data) => {
    const res = await updatePost(
      { ...data, content, slug: post.slug, id: post.id },
      user?.id as string
    )

    if (res) {
      router.push('/my-post')
    }
  }

  useEffect(() => {
    if (user?.id !== post.user_id) router.push('/my-post')
  }, [post.user_id, router, user?.id])

  return (
    <AuthLayout title='Edit Post'>
      <h2>Edit Post</h2>

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
            id='title'
            {...register('title')}
          />
          <ErrorMessage message={errors.title?.message} />
        </div>
        <div className='mb-4'>
          <label htmlFor='title' className='block font-medium text-lg mb-1'>
            Description
          </label>
          <textarea
            maxLength={140}
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
            {...register('thumbnail')}
          />

          <p className={clsxm('mt-8 mb-2')}>Previous post thumbnail image : </p>
          <NextImage
            width={250}
            height={70}
            alt={post.title as string}
            src={getThumbnailPost(post.thumbnail as string) as string}
            useSkeleton
            blurClassName='animate-pulse bg-slate-200'
            className='w-full'
            imgClassName='object-cover object-center'
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
            {category.map((c) => (
              <option key={c} value={c} selected={c === post.category}>
                {c}
              </option>
            ))}
          </select>
          <ErrorMessage message={errors.category?.message} />
        </div>
        <div className='mb-7'>
          <label htmlFor='content' className='block font-medium text-lg mb-1'>
            Content
          </label>
          <MarkdownEditor
            placeholder='Write your content'
            value={post.content}
            changeValue={setContent}
          />
          {!content.length && <ErrorMessage message='Content is required' />}
          {content.length <= 200 && (
            <ErrorMessage message='Content must be at least 200 characters' />
          )}
        </div>

        <PrimaryButton type='submit' disabled={isSubmitting}>
          Update Post
        </PrimaryButton>
      </form>
    </AuthLayout>
  )
}

export default EditPostPage
