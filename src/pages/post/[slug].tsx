import MainLayout, { LayoutProps } from '@/components/Layouts/MainLayout'
import ArticleCard from '@/components/UI/ArticleCard'
import PostHeader from '@/components/UI/PostHeader'
import NextImage from '@/components/UI/image/NextImage'

import { clsxm, getMetaData } from '@/lib'
import { getAllPosts, getDetailPost, getThumbnailPost, updateViewsPost } from '@/services/Supebase'

import type { NextPage } from 'next'
import { Post } from 'nuwszy'
import Prism from 'prismjs'
import { useEffect, useState } from 'react'
import { AiFillEye } from 'react-icons/ai'
import ReactMarkdown from 'react-markdown'

type ServerSideParams = {
  params: {
    slug: string
  }
}

const PostDetailPage: NextPage<{ slug: string }> = ({ slug }) => {
  const [post, setPost] = useState<Post | undefined>()
  const [otherPosts, setOtherPosts] = useState<Post[] | undefined>()

  useEffect(() => {
    ;(async () => {
      const post = await getDetailPost(slug)
      setPost(post)

      const otherPostsRes = await getAllPosts()
      setOtherPosts(otherPostsRes?.filter((p) => p.id !== post?.id).slice(0, 3))

      await updateViewsPost(post?.slug as string, post?.views as number)
    })()
  }, [slug])

  useEffect(() => {
    if (!typeof window !== undefined) {
      Prism.highlightAll()
    }
  })

  const meta = getMetaData({
    title: 'Nuwszy',
    template: post?.title,
    description: post?.description as string,
    keywords: ['Nuwszy', 'News', 'Post', post?.title as string],
    og_image: `https://ik.imagekit.io/qmw3y9jqe/nuwszy-logo__1__KsgfOx2V9.png?ik-sdk-version=javascript-1.4.3&updatedAt=1659966251346`,
    og_image_alt: 'Nuwszy',
    slug: `/post/${post?.slug}`,
    type: 'website'
  })

  return (
    <MainLayout
      customHeader={
        <PostHeader title={post?.title} category={post?.category} date={post?.created_at} />
      }
      {...(meta as LayoutProps)}
    >
      <section>
        <div
          className={clsxm('flex items-center justify-end', 'space-x-2', 'mb-5', 'text-primary')}
          title='Total views'
        >
          <AiFillEye size={24} />
          <span>{!post?.views ? 1 : post.views}</span>
        </div>
        <NextImage
          src={getThumbnailPost(post?.thumbnail as string) as string}
          alt={post?.title as string}
          width={400}
          height={150}
          className={clsxm('w-full')}
          imgClassName={clsxm('rounded-xl', 'object-cover object-center')}
        />

        <div
          className={clsxm('mt-10', 'prose prose-h5:text-xl prose-h5:font-medium', 'max-w-none')}
        >
          <ReactMarkdown>{post?.content as string}</ReactMarkdown>
        </div>
      </section>

      <section className={clsxm('py-20', 'mt-32', 'border-t border-sky-100')}>
        <h2 className={clsxm('text-primary', 'pb-12')}>Other interesting posts</h2>
        <div>
          {otherPosts?.map((p) => (
            <ArticleCard
              key={p.id}
              category={p.category}
              date={p.created_at}
              title={p.title}
              desc={p.description}
              thumbnail={getThumbnailPost(p.thumbnail) as string}
              slug={p.slug}
            />
          ))}
        </div>
      </section>
    </MainLayout>
  )
}

export const getServerSideProps = ({ params }: ServerSideParams) => {
  return { props: { slug: params.slug } }
}

export default PostDetailPage
