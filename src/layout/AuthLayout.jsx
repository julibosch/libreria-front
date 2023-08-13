import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const AuthLayout = () => {

  const fecha = new Date().getFullYear();

  return (
    <div className='w-full'>
      <img
        src="\layered-waves-azul.svg"
        alt=""
        className='absolute inset-0 w-full h-full object-cover -z-10'
      />

      <div className="z-10">
        <h2 className='lg:text-5xl text-3xl font-black uppercase text-white my-8 text-center py-7'>Administrador de Librería</h2>
        <Outlet />

        <Footer fecha={fecha} />
      </div>
    </div>
  )
}

export default AuthLayout