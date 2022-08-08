import MainLayout, { LayoutProps } from '@/components/Layouts/MainLayout'
import ArticleCard from '@/components/UI/ArticleCard'
import CategoryHeader from '@/components/UI/CategoryHeader'

import { clsxm, getMetaData } from '@/lib'
import { getPostsByCategory, getThumbnailPost } from '@/services/Supebase'

import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Post } from 'nuwszy'
import { useEffect, useMemo, useState } from 'react'

type ServerSideParams = {
  params: {
    category: string
  }
}

const capitalizeWord = (word: string) => {
  return word
    .replace('-', ' ')
    .toLowerCase()
    .replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase())
}

const Category: NextPage = () => {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[] | undefined>()

  const category = router.query.category as string

  const categoryTitle = useMemo(() => capitalizeWord(category), [category])

  useEffect(() => {
    ;(async () => {
      const res = await getPostsByCategory(categoryTitle)

      setPosts(res)
    })()
  }, [categoryTitle])

  const meta = getMetaData({
    title: 'Nuwszy',
    template: categoryTitle,
    description: `Any insight about ${categoryTitle}`,
    keywords: ['Nuwszy', 'News', 'Post', categoryTitle],
    og_image: `https://ik.imagekit.io/qmw3y9jqe/nuwszy-logo__1__KsgfOx2V9.png?ik-sdk-version=javascript-1.4.3&updatedAt=1659966251346`,
    og_image_alt: 'Nuwszy',
    slug: `/category/${category}`,
    type: 'website'
  })

  return (
    <MainLayout customHeader={<CategoryHeader title={category} />} {...(meta as LayoutProps)}>
      <section>
        <h1 className={clsxm('capitalize text-primary', 'mb-6')}>{category?.replace('-', ' ')}</h1>
        <div>
          {posts?.map((post) => (
            <ArticleCard
              key={post.id}
              category={post.category}
              date={post.created_at}
              title={post.title}
              desc={post.description}
              thumbnail={getThumbnailPost(post.thumbnail) as string}
              slug={post.slug}
            />
          ))}
        </div>
      </section>
    </MainLayout>
  )
}

export const getServerSideProps = ({ params: { category } }: ServerSideParams) => {
  const categoryList = ['design-tools', 'daily-update', 'tutorials', 'coding']

  if (!categoryList.includes(category)) {
    return {
      notFound: true
    }
  }

  return { props: {} }
}

export default Category
