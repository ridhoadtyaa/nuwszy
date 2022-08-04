import { clsxm } from '@/lib'

type PostCategoryProps = {
  category: string
}

const PostCategory: React.FunctionComponent<PostCategoryProps> = ({ category }) => {
  return (
    <div
      className={clsxm(
        'shadow rounded-md',
        'text-xs sm:text-sm text-white',
        'py-1 px-3',
        'w-fit',
        'absolute top-4 right-4',
        [
          category === 'Design Tools' && 'bg-red-500',
          category === 'Daily Update' && 'bg-orange-500',
          category === 'Tutorials' && 'bg-green-500',
          category === 'Coding' && 'bg-blue-500'
        ]
      )}
    >
      {category}
    </div>
  )
}

export default PostCategory
