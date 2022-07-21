import { clsxm } from '@/lib'

type CategoryHeaderProps = {
  title: string
}

const CategoryHeader: React.FunctionComponent<CategoryHeaderProps> = ({ title }) => {
  const prettieTitle = title.replace('-', ' ')

  return (
    <>
      <div
        className={clsxm(
          'text-white uppercase font-semibold',
          'py-1 px-3',
          'border border-white',
          'rounded-md w-fit',
          'mb-9'
        )}
      >
        {prettieTitle}
      </div>
      <h1 className={clsxm('text-white text-3xl md:text-4xl xl:text-5xl')}>
        Any insight about {prettieTitle}.
      </h1>
    </>
  )
}

export default CategoryHeader
