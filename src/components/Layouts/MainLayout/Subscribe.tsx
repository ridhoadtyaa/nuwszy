import Button from '@/components/UI/buttons/Button'
import Input from '@/components/forms/Input'

import { clsxm } from '@/lib'

const Subscribe: React.FunctionComponent = () => (
  <section
    className={clsxm(
      'bg-primary rounded-xl md:rounded-lg',
      'flex items-center flex-col',
      'py-20',
      'my-24',
      'relative overflow-hidden'
    )}
  >
    <div
      className={clsxm(
        'absolute -top-16 -left-16',
        'w-15 h-15',
        'rounded-full',
        'border-[20px] border-yellow-300',
        'p-16'
      )}
    />
    <h2 className={clsxm('text-white', 'relative z-10', 'mb-5')}>Subscribe to Nuwszy.</h2>
    <p className={clsxm('text-slate-200 text-lg', 'mb-11')}>I post fresh content every time.</p>
    <div className={clsxm('w-10/12 sm:w-6/12', 'flex items-center')}>
      <Input
        className={clsxm('px-4 py-3', 'w-full rounded-r-none', 'text-base')}
        placeholder='Email Address'
      />
      <Button
        className={clsxm(
          'px-6 py-[14px]',
          'bg-green-300 hover:bg-green-400',
          'rounded-r-lg',
          'font-semibold text-sm',
          'transition duration-300'
        )}
      >
        SUBSCRIBE
      </Button>
    </div>
  </section>
)

export default Subscribe
