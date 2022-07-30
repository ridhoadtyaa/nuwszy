import AuthLayout from '@/components/Layouts/AuthLayout'
import PrimaryButton from '@/components/UI/buttons/PrimaryButton'
import Input from '@/components/forms/Input'
import Select from '@/components/forms/Select'

import { clsxm } from '@/lib'

import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const MarkdownEditor = dynamic(() => import('@/components/forms/MarkdownEditor'), { ssr: false })

const AddPostPage: NextPage = () => {
  const [markdown, setMarkdown] = useState('')

  return (
    <AuthLayout>
      <h2>Add Post</h2>

      <form className='mt-10 mb-16'>
        <div className='mb-4'>
          <label htmlFor='title' className='block font-medium text-lg mb-1'>
            Title
          </label>
          <Input
            className={clsxm(
              'w-full',
              'border border-slate-300',
              'rounded-md',
              'py-2',
              'focus:ring focus:ring-blue-400'
            )}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='title' className='block font-medium text-lg mb-1'>
            Description
          </label>
          <textarea
            maxLength={150}
            className={clsxm(
              'w-full',
              'border border-slate-300 outline-none',
              'rounded-md',
              'p-2',
              'focus:ring focus:ring-blue-400'
            )}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='catgory' className='block font-medium text-lg mb-1'>
            Thumbnail
          </label>
          <Input
            type='file'
            className={clsxm(
              'text-sm text-gray-500',
              'file:py-2 file:mr-4 file:px-6 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-100 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-blue-200 hover:file:text-blue-800'
            )}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='catgory' className='block font-medium text-lg mb-1'>
            Category
          </label>
          <Select
            name='Category'
            option={[
              { value: 'Design Tools', content: 'Design Tools' },
              { value: 'Daily Update', content: 'Daily Update' },
              { value: 'Tutorials', content: 'Tutorials' },
              { value: 'Coding', content: 'Coding' }
            ]}
          />
        </div>
        <div className='mb-7'>
          <label htmlFor='content' className='block font-medium text-lg mb-1'>
            Content
          </label>
          <MarkdownEditor
            placeholder='Write your content'
            value={markdown}
            changeValue={setMarkdown}
          />
        </div>

        <PrimaryButton type='submit'>Add Post</PrimaryButton>
      </form>
    </AuthLayout>
  )
}

export default AddPostPage
