import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Pointer from './ui/Pointer'

export default function Layout() {
  return (
    <>
      <Header />
      <div className="pointer-host">
        <Pointer />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  )
}
