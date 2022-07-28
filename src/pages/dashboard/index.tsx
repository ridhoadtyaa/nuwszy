import AuthLayout from '@/components/Layouts/AuthLayout'

import { NextPage } from 'next'

const DashboardPage: NextPage = () => {
  return (
    <AuthLayout>
      <h3>My Post</h3>
      <div></div>
    </AuthLayout>
  )
}

// export const getServerSideProps = async ({ req, res }) => {
//   const { user } = await getUser({ req, res })

//   console.log('[getServerSideProps] User:', user)

//   return { props: {} }
// }

export default DashboardPage
