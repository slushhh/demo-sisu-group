import { Outlet } from 'react-router'
import { Footer, Header } from '@/layout'

/**
 * App layout
 */
const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export { AppLayout }
