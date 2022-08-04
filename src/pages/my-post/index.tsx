import AuthLayout from '@/components/Layouts/AuthLayout'
import Modal from '@/components/UI/Modal'
import PostCategory from '@/components/UI/PostCategory'
import PrimaryButton from '@/components/UI/buttons/PrimaryButton'
import NextImage from '@/components/UI/image/NextImage'
import UnstyledLink from '@/components/UI/links/UnstyedLink'

import { clsxm } from '@/lib'
import { deletePost, getThumbnailPost, getUserPost, supabase } from '@/services/Supebase'
import { dateFormat } from '@/utils'

import { NextPage } from 'next'
import Link from 'next/link'
import { Post } from 'nuwszy'
import { useCallback, useEffect, useState } from 'react'
import { AiFillEye } from 'react-icons/ai'

const MyPostPage: NextPage = () => {
  const user = supabase.auth.user()
  const [posts, setPosts] = useState<Post[] | undefined>([])
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<number>()

  const dateConfig = {
    dateStyle: 'long'
  } as Intl.DateTimeFormatOptions

  useEffect(() => {
    ;(async () => {
      const res = await getUserPost(user?.id as string)

      setPosts(res)
    })()
  }, [user?.id])

  const deletePostHandler = useCallback(
    async (postId: number) => {
      const res = await deletePost(postId)

      if (res) {
        const newPosts = posts?.filter((post) => post.id !== postId).sort((a, b) => b.id - a.id)

        setPosts(newPosts)
        setDeleteModal(false)
      }
    },
    [posts]
  )

  return (
    <AuthLayout>
      <section className={clsxm('flex justify-between items-center')}>
        <h2>My Post</h2>
        <Link href='/my-post/add-post'>
          <PrimaryButton>Add Post</PrimaryButton>
        </Link>
      </section>

      <section className={clsxm('my-10', 'grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8')}>
        {posts?.map((post) => (
          <div key={post.id} className={clsxm('overflow-hidden', 'rounded-md w-ful shadow-md')}>
            <div className={clsxm('relative')}>
              <NextImage
                width={200}
                height={70}
                alt={post.title}
                src={getThumbnailPost(post.thumbnail) as string}
                useSkeleton
                blurClassName='animate-pulse bg-slate-200'
                className='w-full'
              />
              <PostCategory category={post.category} />
            </div>
            <div className={clsxm('px-3', 'my-3')}>
              <h4 className='font-primary'>{post.title}</h4>
              <p className={clsxm('text-slate-400 text-sm', 'mt-1')}>
                {dateFormat(post.created_at, 'en-US', dateConfig)}
              </p>
              <p className='mt-2 text-slate-500'>{post.description}</p>
              <div className={clsxm('mt-4', 'flex justify-between items-center', 'space-x-4')}>
                <div
                  className={clsxm('flex items-center space-x-2', 'text-slate-400')}
                  title='Number of viewers'
                >
                  <AiFillEye size={19} />
                  <span>{!post.views ? 0 : post.views}</span>
                  <span className='sr-only'>
                    The number of viewers is {!post.views ? 0 : post.views}
                  </span>
                </div>
                <div className={clsxm('space-x-3', 'flex')}>
                  <UnstyledLink
                    href={`/my-post/${post.slug}`}
                    className={clsxm(
                      'py-2 px-4',
                      'rounded-md bg-emerald-500 hover:opacity-80',
                      'text-sm text-white',
                      'transition duration-300'
                    )}
                  >
                    Edit
                  </UnstyledLink>
                  <PrimaryButton
                    className={clsxm('bg-pink-600')}
                    onClick={() => {
                      setDeleteModal(true)
                      setSelectedId(post.id)
                    }}
                  >
                    Delete
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <Modal
        show={deleteModal}
        onClose={() => setDeleteModal(false)}
        className={clsxm('max-w-md')}
        title='Delete Post'
      >
        <div className={clsxm('bg-red-500/80 rounded-md', 'text-white', 'py-2 px-4')}>
          Are you sure to delete this post ?
        </div>
        <div className={clsxm('mt-5', 'space-x-3', 'flex justify-end')}>
          <PrimaryButton onClick={() => setDeleteModal(false)}>Cancel</PrimaryButton>
          <PrimaryButton
            className={clsxm('bg-red-600')}
            onClick={() => deletePostHandler(selectedId as number)}
          >
            Delete
          </PrimaryButton>
        </div>
      </Modal>
    </AuthLayout>
  )
}

export default MyPostPage
