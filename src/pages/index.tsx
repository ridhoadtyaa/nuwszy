import MainLayout from '@/components/Layouts/MainLayout'
import ArticleCard from '@/components/UI/ArticleCard'
import UnstyledLink from '@/components/UI/links/UnstyedLink'

import { clsxm } from '@/lib'
import { getAllPosts, getThumbnailPost } from '@/services/Supebase'

import type { NextPage } from 'next'
import { Post } from 'nuwszy'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const [posts, setPosts] = useState<Post[] | undefined>()

  useEffect(() => {
    ;(async () => {
      const res = await getAllPosts()

      setPosts(res)
    })()
  }, [])

  return (
    <MainLayout>
      <section className={clsxm('space-y-20')}>
        <div>
          <UnstyledLink href='/category/design-tools'>
            <h1 className={clsxm('text-primary', 'mb-6')}>Design Tools</h1>
          </UnstyledLink>
          <div>
            {posts
              ?.filter((post) => post.category === 'Design Tools')
              .slice(0, 3)
              .map((post) => (
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
        </div>
        <div>
          <UnstyledLink href='/category/daily-update'>
            <h1 className={clsxm('text-primary', 'mb-6')}>Daily Update</h1>
          </UnstyledLink>
          <div>
            {posts
              ?.filter((post) => post.category === 'Daily Update')
              .slice(0, 3)
              .map((post) => (
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
        </div>
        <div>
          <UnstyledLink href='/category/tutorials'>
            <h1 className={clsxm('text-primary', 'mb-6')}>Tutorials</h1>
          </UnstyledLink>
          <div>
            {posts
              ?.filter((post) => post.category === 'Tutorials')
              .slice(0, 3)
              .map((post) => (
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
        </div>
        <div>
          <UnstyledLink href='/category/coding'>
            <h1 className={clsxm('text-primary', 'mb-6')}>Coding</h1>
          </UnstyledLink>
          <div>
            {posts
              ?.filter((post) => post.category === 'Coding')
              .slice(0, 3)
              .map((post) => (
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
        </div>
      </section>
    </MainLayout>
  )
}

export default Home
