import { clsxm } from '@/lib'

import Footer from './Footer'
import Header from './Header'
import Subscribe from './Subscribe'

type LayoutProps = {
  customHeader?: JSX.Element
  children: React.ReactNode
}

const Layout: React.FunctionComponent<LayoutProps> = ({ children, customHeader }) => {
  return (
    <>
      <Header customHeader={customHeader} />
      <main className={clsxm('layout', 'mt-16')}>
        {children}
        <Subscribe />
      </main>
      <Footer />
    </>
  )
}

export default Layout
