import { clsxm } from '@/lib'
import { dateFormat } from '@/utils'

import UnstyledLink from './links/UnstyedLink'

import { BsChevronLeft } from 'react-icons/bs'
import slugify from 'slugify'

type PostHeaderProps = {
  category: string | undefined
  title: string | undefined
  date: string | undefined
}

const PostHeader: React.FunctionComponent<PostHeaderProps> = ({ category, title, date }) => {
  const config = {
    dateStyle: 'long'
  } as Intl.DateTimeFormatOptions

  return (
    <div className={clsxm('flex items-start flex-col sm:flex-row', 'sm:space-x-6')}>
      <UnstyledLink
        href={`/category/${slugify(`${category}`, { lower: true })}`}
        className={clsxm('p-2 rounded-full bg-white/20 font-bold', 'mb-6 sm:mb-0')}
      >
        <BsChevronLeft className={clsxm('stroke-1', 'relative right-[1px]')} />
      </UnstyledLink>
      <div>
        {category && date && (
          <div
            className={clsxm(
              'border border-white bg-white',
              'rounded-md overflow-hidden',
              'flex',
              'w-fit'
            )}
          >
            <div className={clsxm('font-semibold text-white', 'bg-primary', 'py-1 px-3')}>
              {category}
            </div>
            <div className={clsxm('font-semibold text-primary', 'bg-white', 'py-1 px-3')}>
              {dateFormat(date as string, 'en-US', config)}
            </div>
          </div>
        )}
        <h1 className={clsxm('text-3xl md:text-4xl xl:text-5xl', 'mt-6')}>{title}</h1>
      </div>
    </div>
  )
}

export default PostHeader
