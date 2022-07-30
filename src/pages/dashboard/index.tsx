import AuthLayout from '@/components/Layouts/AuthLayout'
import PrimaryButton from '@/components/UI/buttons/PrimaryButton'

import { clsxm } from '@/lib'

import { NextPage } from 'next'
import Link from 'next/link'

const DashboardPage: NextPage = () => {
  return (
    <AuthLayout>
      <div className={clsxm('flex justify-between items-center')}>
        <h2>My Post</h2>
        <Link href='/dashboard/post/add-post'>
          <PrimaryButton>Add Post</PrimaryButton>
        </Link>
      </div>
    </AuthLayout>
  )
}

export default DashboardPage
