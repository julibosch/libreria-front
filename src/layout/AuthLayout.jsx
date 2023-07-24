import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div>
      <h2 className='text-5xl font-black uppercase text-white mb-40 text-center bg-slate-950 py-7'>Sistema de Gestión - Piquitos</h2>
      <Outlet />
    </div>
  )
}

export default AuthLayout