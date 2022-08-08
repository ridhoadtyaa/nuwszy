import Seo, { CustomSeoProps } from '@/components/Seo'

import { clsxm } from '@/lib'

import Footer from './Footer'
import Header from './Header'
import Subscribe from './Subscribe'

export interface LayoutProps extends CustomSeoProps {
  customHeader?: JSX.Element
  children: React.ReactNode
}

const Layout: React.FunctionComponent<LayoutProps> = ({ children, customHeader, ...props }) => {
  return (
    <>
      <Seo {...props} />
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
