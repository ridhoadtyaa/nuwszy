// import { getDetailPost } from '@/services/Supebase'
import type { NextPage } from 'next'
import { Post } from 'nuwszy'

type PostDetailPageProps = {
  post: Post
}

const PostDetailPage: NextPage<PostDetailPageProps> = () => {
  return <h1>Title post</h1>
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { slug } = ctx.params

//   const post = await getDetailPost(slug)

//   return {
//     props: { post }
//   }
// }

export default PostDetailPage
