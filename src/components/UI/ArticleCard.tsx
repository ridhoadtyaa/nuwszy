import { clsxm } from '@/lib'

import NextImage from './image/NextImage'
import UnstyledLink from './links/UnstyedLink'

const ArticleCard: React.FunctionComponent = () => {
  return (
    <div>
      <h1 className={clsxm('text-primary', 'mb-6')}>Design Tools</h1>

      <div className={clsxm('py-12', 'border-y border-sky-100')}>
        <article
          className={clsxm('flex flex-col-reverse items-center sm:flex-row', 'sm:space-x-16')}
        >
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
                DESIGN TOOLS
              </div>
              <div className={clsxm('text-sm font-medium')}>AUGUST 13, 2021</div>
            </div>
            <div>
              <UnstyledLink href='/'>
                <h2>10 Hilarious Cartoons That Depict Real-Life Problems of Programmers</h2>
              </UnstyledLink>
              <p className={clsxm('mt-5')}>
                Redefined the user acquisition and redesigned the onboarding experience, all within
                3 working weeks.
              </p>
            </div>
          </div>
          <NextImage
            src='https://assets.architecturaldigest.in/photos/60084dd6cce5700439e12bf7/16:9/w_2560%2Cc_limit/modern-living-room-decor-1366x768.jpg'
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
    </div>
  )
}

export default ArticleCard
