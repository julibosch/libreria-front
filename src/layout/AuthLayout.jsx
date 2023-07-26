import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const AuthLayout = () => {

  const fecha = new Date().getFullYear();

  return (
    <div className='w-full'>
      <svg className='absolute lg:top-[-150px] md:top-[-250px] top-[-220px] -z-20' width="100%" height="700" viewBox="0 0 1440 715" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M428.43 358.099C390.697 329.919 213.5 289 213.5 289C162 274 71.5 289 0.5 182.389V0L1441 1.14441e-05V714C1416.33 720.833 1367.7 592 1278.5 592C1215 592 1150.57 533.581 1110.41 512.319C1068.1 489.92 1023.91 465.946 977.554 453.159C949.085 448.298 871.799 439.507 843.054 439.507H697.05C653.729 439.507 604.387 433.311 563.435 418.523C539.149 409.753 515.34 406.384 491.508 395.01C469.391 384.454 448.116 372.801 428.43 358.099Z" fill="#040712" />
      </svg>

      <h2 className='text-5xl font-black uppercase text-white my-8 text-center py-7'>Administrador de Librería</h2>
      <Outlet />

      <Footer 
        fecha={fecha}
      />
    </div>
  )
}

export default AuthLayout