import Layout from '@/components/Layout'
import ArticleCard from '@/components/UI/ArticleCard'

import { clsxm } from '@/lib'

import type { NextPage } from 'next'
import { Post } from 'nuwszy'

type HomePageProps = {
  posts: Post[]
}

const Home: NextPage<HomePageProps> = () => {
  return (
    <Layout>
      <section>
        <div>
          <h1 className={clsxm('text-primary', 'mb-6')}>Design Tools</h1>
          <ArticleCard
            category='DESIGN TOOLS'
            date='2022-06-20 14:49:15+00'
            title='10 Hilarious Cartoons That Depict Real-Life Problems of Programmers'
            desc=' Redefined the user acquisition and redesigned the onboarding experience, all within 3
              working weeks.'
            thumbnail='https://assets.architecturaldigest.in/photos/60084dd6cce5700439e12bf7/16:9/w_2560%2Cc_limit/modern-living-room-decor-1366x768.jpg'
            slug='test-test'
          />
        </div>
      </section>
    </Layout>
  )
}

// export const getServerSideProps = async () => {
//   const posts = await getAllPosts()

//   return {
//     props: { posts }
//   }
// }

export default Home
