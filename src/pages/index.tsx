import Layout from '@/components/Layout'
import ArticleCard from '@/components/UI/ArticleCard'

// import { dateFormat } from '@/libs/dateFormat'
// import { getAllPosts } from '@/services/Supebase'
import type { NextPage } from 'next'
// import Link from 'next/link'
import { Post } from 'nuwszy'

type HomePageProps = {
  posts: Post[]
}

const Home: NextPage<HomePageProps> = () => {
  // const config = {
  //   dateStyle: 'long'
  // } as Intl.DateTimeFormatOptions

  return (
    <Layout>
      <section>
        <ArticleCard />
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
