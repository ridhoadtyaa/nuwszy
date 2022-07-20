import { clsxm } from '@/lib'
import { dateFormat } from '@/utils'

import NextImage from './image/NextImage'
import UnstyledLink from './links/UnstyedLink'

type ArticleCardProps = {
  category: string
  date: string
  title: string
  desc: string
  thumbnail: string
  slug: string
}

const ArticleCard: React.FunctionComponent<ArticleCardProps> = ({
  category,
  date,
  title,
  desc,
  thumbnail,
  slug
}) => {
  const config = {
    dateStyle: 'long'
  } as Intl.DateTimeFormatOptions

  return (
    <div className={clsxm('py-12', 'border-y border-sky-100')}>
      <article className={clsxm('flex flex-col-reverse items-center sm:flex-row', 'sm:space-x-16')}>
        <div className={clsxm('text-primary', 'w-full sm:w-8/12')}>
          <div className={clsxm('inline-flex items-center', 'space-x-5', 'mt-7 mb-7 sm:mt-0')}>
            <div
              className={clsxm(
                'bg-sky-100/70',
                'rounded-l-md',
                'py-2 px-4',
                'font-semibold text-sm'
              )}
            >
              {category}
            </div>
            <div className={clsxm('text-sm font-medium')}>{dateFormat(date, 'en-US', config)}</div>
          </div>
          <div>
            <UnstyledLink href={slug}>
              <h2>{title}</h2>
            </UnstyledLink>
            <p className={clsxm('mt-5')}>{desc}</p>
          </div>
        </div>
        <NextImage
          src={thumbnail}
          width={100}
          height={70}
          objectFit='cover'
          alt='test'
          useSkeleton
          blurClassName='bg-slate-100'
          className={clsxm('w-full sm:w-4/12')}
          imgClassName={clsxm('rounded-lg')}
        />
      </article>
    </div>
  )
}

export default ArticleCard
