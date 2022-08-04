import { clsxm } from '@/lib'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'

interface ModalProps {
  onClose: () => void
  show: boolean
  title?: string
  children: React.ReactNode
  className?: string
}

const Modal: React.FunctionComponent<ModalProps> = ({
  onClose,
  show,
  title,
  children,
  className
}) => {
  const refDiv = useRef(null)

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as='div' className='relative z-[99]' onClose={onClose} initialFocus={refDiv}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className={clsxm('fixed inset-0', 'bg-black bg-opacity-30')} />
        </Transition.Child>

        <div className={clsxm('fixed inset-0', 'overflow-y-auto')} ref={refDiv}>
          <div
            className={clsxm(
              'flex items-center justify-center',
              'min-h-full',
              'p-4',
              'text-center'
            )}
          >
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                className={clsxm(
                  'max-h-96 w-full max-w-xl',
                  'transform overflow-y-auto transition-all',
                  'bg-white rounded-xl',
                  'p-6',
                  'text-left align-middle',
                  'shadow-xl',
                  className
                )}
              >
                <Dialog.Title as='h3' className={clsxm('text-primary')}>
                  {title}
                </Dialog.Title>
                <div className={`${title && 'mt-4'}`}>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
