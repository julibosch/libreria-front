import { useState } from 'react';
import clienteAxios from '../config/axios'
import BounceLoader from "react-spinners/BounceLoader";
import Swal from 'sweetalert2';

const Backup = () => {
  const [descargando, setDescargando] = useState(false);

  const handleBackupManuales = async () => {
    setDescargando(true);

    try {
      const respuesta = await clienteAxios.get("/admin/backup-manuales", { responseType: 'blob' });

      // Obtener la fecha actual
      const today = new Date();

      // Obtener el día, mes y año
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();

      // Formatear la fecha como "dd-mm-aaaa"
      const formattedDate = `${day}-${month}-${year}`;

      // Generar el nombre del archivo con la fecha formateada
      const fileName = `backup-manuales-${formattedDate}.xlsx`;

      // Crear un objeto Blob con los datos recibidos
      const blob = new Blob([respuesta.data], { type: respuesta.headers['content-type'] });

      // Crear un enlace de descarga
      const url = window.URL.createObjectURL(blob);

      // Crear un elemento <a> para simular el clic y descargar el archivo
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);

      // Simular el clic en el enlace
      document.body.appendChild(link);
      setTimeout(() => {
        link.click();

        // Liberar el objeto URL
        window.URL.revokeObjectURL(url);

        // Eliminar el elemento <a>
        document.body.removeChild(link);

        Swal.fire(
          'Tu Backup se descargó con éxito :)',
          `Busca el archivo "${fileName}" en tu carpeta de Descargas`,
          'success'
        ).then(
          setDescargando(false)
        )
      }, 2000);
    } catch (error) {
      if (error.message.toLowerCase().includes("network")) {
        Swal.fire(
          'Ha ocurrido un error de red :(',
          'Por favor, revisa tu conexion a internet',
          'error'
        ).then(
          setDescargando(false)
        )
      } else {
        Swal.fire(
          `${error.response.data.message}`,
          'Tu Backup no pudo descargarse, comunicate con nosotros!',
          'error'
        ).then(
          setDescargando(false)
        )
      }
    }
  }

  return (
    <section className="w-full md:w-5/6">
      <h2 className="bg-black w-full text-white py-3 text-2xl uppercase font-bold text-center">Backups</h2>

      <div className="flex flex-col w-full justify-center items-center py-12">
        {/* Backup de todos los articulos - PENDIENTE*/}

        {/* Backup de articulos ingresados manualmente */}
        <div className="flex flex-col w-2/3 bg-zinc-500 rounded-md">
          <h3 className="bg-zinc-800 text-center font-bold text-white text-lg py-2 rounded-t-md uppercase">Backup de <span className="underline underline-offset-4">articulos cargados manualmente</span></h3>
          <div className="p-5 mb-5">
            <p className="flex gap-2 text-sm p-1 px-2 font-semibold bg-amber-200/80 items-center rounded-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-info-circle" width="45" height="45" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>
              <span>Se realizara un backup de todos los articulos que se hayan cargado manualmente, es decir, <span className="font-black">todos aquellos que incluyan letras en su codigo_buscador</span></span>
            </p>
          </div>

          <button
            className="flex items-center justify-center bg-indigo-800 hover:bg-indigo-700 transition-all text-lg font-bold py-2 mx-5 mb-3 uppercase text-white rounded-lg disabled:bg-blue-600 disabled:cursor-not-allowed"
            disabled={descargando}
            onClick={handleBackupManuales}
          >
            {descargando ?
              <div disabled={descargando} className='flex gap-3 justify-center items-center disabled:cursor-not-allowed'>
                <BounceLoader
                  loading={descargando}
                  color="#002e62"
                  size={40}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                <p>Descargando archivo!</p>
              </div>
              :
              <p className='cursor-pointer'>Realizar backup</p>
            }
          </button>
        </div>
      </div>
    </section>
  )
}

export default Backup