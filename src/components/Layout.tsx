import { Outlet } from 'react-router-dom'
import { Header } from './Header'

const Layout = () => {
  return (
    <>
    <header>
        <Header></Header>
    </header>
    <main>
        <Outlet></Outlet>
    </main>
    </>
  )
}

export default Layout