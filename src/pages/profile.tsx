import AuthLayout from '@/components/Layouts/AuthLayout'
import Modal from '@/components/UI/Modal'
import Button from '@/components/UI/buttons/Button'
import PrimaryButton from '@/components/UI/buttons/PrimaryButton'
import Input from '@/components/forms/Input'

import useUser from '@/hooks/useUser'
import { clsxm } from '@/lib'
import { updateNameUser, updatePasswordUser } from '@/services/Supebase'

import { NextPage } from 'next'
import { useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'

const Profile: NextPage = () => {
  const user = useUser()
  const [nameModal, setNameModal] = useState(false)
  const [nameUser, setNameUser] = useState(user?.name)

  const [passwordModal, setPasswordModal] = useState(false)
  const [passwordUser, setPasswordUser] = useState('')

  const updateNameHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await updateNameUser(nameUser as string)

    if (res) setNameModal(false)
  }

  const updatePasswordHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await updatePasswordUser(passwordUser)

    if (res) {
      setPasswordModal(false)
      setPasswordUser('')
    }
  }

  return (
    <AuthLayout title='My Profile'>
      <section className={clsxm('flex justify-between items-center')}>
        <h2>My Profile</h2>
        <PrimaryButton onClick={() => setPasswordModal(true)}>Change Password</PrimaryButton>
      </section>
      <section className={clsxm('mt-10', 'space-y-2')}>
        <div className={clsxm('flex items-center', 'space-x-4')}>
          <h4>
            Name : <span className={clsxm('font-normal')}>{user?.name}</span>
          </h4>
          <Button title='Edit name' onClick={() => setNameModal(true)}>
            <FaPencilAlt />
          </Button>
        </div>
        <h4>
          Email : <span className={clsxm('font-normal')}>{user?.email}</span>
        </h4>
      </section>

      <Modal
        title='Edit Name'
        onClose={() => {
          setNameModal(false)
          setNameUser(user?.name)
        }}
        show={nameModal}
        className={clsxm('max-w-md')}
      >
        <form onSubmit={updateNameHandler}>
          <Input
            placeholder='Input your new name'
            className={clsxm('w-full')}
            value={nameUser}
            onChange={(e) => setNameUser(e.target.value)}
            required
          />
          <div className={clsxm('mt-5', 'space-x-3', 'flex justify-end')}>
            <PrimaryButton
              onClick={() => {
                setNameModal(false)
                setNameUser(user?.name)
              }}
              type='button'
            >
              Cancel
            </PrimaryButton>
            <PrimaryButton className={clsxm('bg-green-600')} type='submit'>
              Update
            </PrimaryButton>
          </div>
        </form>
      </Modal>

      <Modal
        title='Change password'
        onClose={() => {
          setPasswordModal(false)
          setPasswordUser('')
        }}
        show={passwordModal}
        className={clsxm('max-w-md')}
      >
        <form onSubmit={updatePasswordHandler}>
          <Input
            placeholder='Input your new password'
            className={clsxm('w-full')}
            value={passwordUser}
            onChange={(e) => setPasswordUser(e.target.value)}
            required
            type='password'
          />
          <div className={clsxm('mt-5', 'space-x-3', 'flex justify-end')}>
            <PrimaryButton
              onClick={() => {
                setPasswordModal(false)
                setPasswordUser('')
              }}
              type='button'
            >
              Cancel
            </PrimaryButton>
            <PrimaryButton className={clsxm('bg-green-600')} type='submit'>
              Update
            </PrimaryButton>
          </div>
        </form>
      </Modal>
    </AuthLayout>
  )
}

export default Profile
