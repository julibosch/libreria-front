import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const InicioLayout = () => {
  return (
    <main className='flex h-screen'>
      <Sidebar />
      <Outlet />
    </main>
  )
}

export default InicioLayout