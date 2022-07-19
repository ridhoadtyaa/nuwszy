import { clsxm } from '@/lib'

import Header from './UI/Header'

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={clsxm('layout', 'mt-16')}>{children}</main>
    </>
  )
}

export default Layout
