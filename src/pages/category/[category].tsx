import Layout from '@/components/Layout/Layout'
import ArticleCard from '@/components/UI/ArticleCard'
import CategoryHeader from '@/components/UI/CategoryHeader'

import { clsxm } from '@/lib'

import { NextPage } from 'next'
import { useRouter } from 'next/router'

type ServerSideParams = {
  params: {
    category: string
  }
}

const Category: NextPage = () => {
  const router = useRouter()

  const categoryTitle = router.query.category as string

  return (
    <Layout customHeader={<CategoryHeader title={categoryTitle} />}>
      <section>
        <h1 className={clsxm('capitalize text-primary', 'mb-6')}>
          {categoryTitle?.replace('-', ' ')}
        </h1>
        <ArticleCard
          category='DESIGN TOOLS'
          date='2022-06-20 14:49:15+00'
          title='10 Hilarious Cartoons That Depict Real-Life Problems of Programmers'
          desc=' Redefined the user acquisition and redesigned the onboarding experience, all within 3
              working weeks.'
          thumbnail='https://assets.architecturaldigest.in/photos/60084dd6cce5700439e12bf7/16:9/w_2560%2Cc_limit/modern-living-room-decor-1366x768.jpg'
          slug='test-test'
        />
      </section>
    </Layout>
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
