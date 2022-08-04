import AuthLayout from '@/components/Layouts/AuthLayout'

import useUser from '@/hooks/useUser'
import { clsxm } from '@/lib'

import { NextPage } from 'next'

const Profile: NextPage = () => {
  const user = useUser()
  return (
    <AuthLayout>
      <h2>My Profile</h2>
      <section className={clsxm('mt-6')}>
        <h4>
          Name : <span className={clsxm('font-normal')}>{user?.name}</span>
        </h4>
        <h4>
          Email : <span className={clsxm('font-normal')}>{user?.email}</span>
        </h4>
      </section>
    </AuthLayout>
  )
}

export default Profile
