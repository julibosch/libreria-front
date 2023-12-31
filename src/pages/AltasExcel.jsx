import { useContext, useState } from "react";
import * as XLSX from "xlsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from 'react-toastify';
import BounceLoader from "react-spinners/BounceLoader";
import articuloProvider from "../context/ArticuloProvider";
import tipoProvider from "../context/TipoArticuloProvider";
import clienteAxios from "../config/axios";
import Swal from 'sweetalert2';

const AltasExcel = () => {
  const [tipoArticulosExcel, setTipoArticulosExcel] = useState([]);
  const [articulosExcel, setArticulosExcel] = useState([]);
  const [activarSubmitArticulo, setActivarSubmitArticulo] = useState(true);
  const [activarSubmitTipo, setActivarSubmitTipo] = useState(true);
  const [activarSubmitActualizar, setActivarSubmitActualizar] = useState(true);
  const [loading, setLoading] = useState(false);

  const { articulos, setArticulos } = useContext(articuloProvider);
  const { tipoArticulos } = useContext(tipoProvider);

  const handleLeer = (e, informacion) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        //Si es la actualizacion,
        // Obtener el rango de celdas con datos (excluyendo la primera fila porque viene la fecha)
        if (informacion == "actualizarArticulo") {
          const range = XLSX.utils.decode_range(sheet["!ref"]);
          range.s.r = 1; // Comienza desde la segunda fila (0-indexed)
          sheet["!ref"] = XLSX.utils.encode_range(range);
        }
        const resultado = XLSX.utils.sheet_to_json(sheet, { raw: true });

        //Informacion es un parametro que se pasa en cada onchange
        if (informacion === "tipoArticulo") {
          setTipoArticulosExcel(resultado);
          setActivarSubmitTipo(false);

        } else if (informacion === "altaArticulo") {
          const articulosEstandarizados = resultado.map(articulo => {
            //Primero pregunto por los articulos que no tengan codigo_buscador, si los mismos no tienen
            //codigo_buscador corresponde a un articulo padre, ahora debemos preguntar si tienen o no
            //precio, SI TIENEN PRECIO entonces es un articulo padre que no posee hijos.
            //SI NO TIENE PRECIO entonces corresponde a un articulo padre que posee hijos, los cuales si tendran precio
            if (!Object.keys(articulo).includes('codigo_buscador')) {
              //Aca pregunto si tiene precio
              if (Object.keys(articulo).includes('precio')) { //Tiene precio --> Articulo padre sin hijos
                return {
                  ...articulo,
                  codigo_buscador: articulo.codigo_barra,
                  codigo_barra: '-------'
                }
              } else { //No tiene precio --> Articulo padre con hijos, por lo que se lo omite
                return undefined;
              }
            }

            return articulo;
          })

          //Vuelvo a depurar el arreglo, sacando todos los undefined
          const articulosDefinitivos = articulosEstandarizados.filter(articulo =>
            articulo !== undefined
          );

          setArticulosExcel(articulosDefinitivos)
          setActivarSubmitArticulo(false);
        } else {
          setArticulosExcel(resultado);
          setActivarSubmitActualizar(false);
        }

      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleEnviarTiposArticulos = async (e) => {
    e.preventDefault();

    const url = "/admin/tipos-de-articulo-excel"
    try {
      const respuesta = await clienteAxios.post(url, tipoArticulosExcel);
      notify("success", respuesta.data.msg);
    } catch (error) {
      console.log(error)
    }
  }

  const handleEnviarArticulos = async (e) => {
    e.preventDefault();

    const url = "/admin/articuloExcel";
    try {
      const respuesta = await clienteAxios.post(url, articulosExcel);
      notify("success", respuesta.data.msg);
    } catch (error) {
      console.log(error)
    }
  }

  const handleActualizarArticulos = async (e) => {
    setLoading(true);
    setActivarSubmitActualizar(true);
    e.preventDefault();

    const url = "/admin/articuloExcelEditar";
    try {
      const respuesta = await clienteAxios.put(url, articulosExcel);
      console.log(respuesta)
      if (respuesta.status === 200) {
        // Crear una copia de los artículos originales
        const articulosCopia = [...articulos];

        // Actualizar los precios de los artículos en la copia
        const articulosActualizados = articulosCopia.map((articulo) => {
          // Busca el artículo correspondiente en la respuesta del servidor
          const articuloActualizado = respuesta.data.updates.find((item) => item.codigo == articulo.codigo_buscador);

          if (articuloActualizado) {
            // Si se encuentra el artículo en la respuesta, actualiza su precio
            return {
              ...articulo,
              precio: articuloActualizado.precio,
            };
          }

          // Si no se encuentra, devuelve el artículo sin cambios
          return articulo;
        });
        // Actualiza el estado de 'articulos' con los artículos actualizados
        setArticulos(articulosActualizados);
      } else {
        notify("error", "Fallo en la consulta a la API");
        setLoading(false);
      }

      Swal.fire(
          'Actualización exitosa!',
          'Los artículos se han actualizado con éxito!',
          'success'
        ).then(setLoading(false))
    } catch (error) {
      console.log(error)
      setLoading(false)
      return notify("error", error.response.data.msg);
    }
  }

  const notify = (tipo, mensaje) => {
    if (tipo === "success") {
      return toast.success(mensaje);
    }
    if (tipo === "error") {
      return toast.error(mensaje);
    }
  }

  return (
    <section className="w-full md:w-5/6">
      <h2 className="bg-black w-full text-white py-3 text-2xl font-bold uppercase text-center mb-8">Altas mediante Excel</h2>

      {tipoArticulos.length <= 0 &&
        <div className="w-5/6 mx-auto mb-5 rounded-lg overflow-hidden shadow-md">
          <h3 className="bg-neutral-800 text-center font-bold text-white text-xl py-2 ">Excel Alta Tipos de Artículo</h3>
          <form onSubmit={handleEnviarTiposArticulos} className="flex flex-col justify-around items-center container mx-auto min-h-[150px] bg-neutral-500">
            <input type="file" accept=".xlsx, .xls" onChange={(e) => handleLeer(e, "tipoArticulo")} className="w-1/2 text-lg mx-auto my-3 text-white cursor-pointer" />
            <input type="submit" value="Enviar" disabled={activarSubmitTipo} className="uppercase font-bold disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed disabled:shadow-none bg-slate-900 text-white hover:bg-slate-700 py-3 w-6/12 mx-auto mb-2 cursor-pointer rounded-xl transition-all shadow-md" />
          </form>
        </div>
      }

      {articulos.length <= 0 &&
        <div className="w-5/6 mx-auto mb-5 rounded-lg overflow-hidden shadow-md">
          <h3 className="bg-neutral-800 text-center font-bold text-white text-xl py-2 ">Excel Alta Artículos</h3>
          <form onSubmit={handleEnviarArticulos} className="flex flex-col justify-around items-center container mx-auto min-h-[150px] bg-neutral-500">
            <input type="file" accept=".xlsx, .xls" onChange={(e) => handleLeer(e, "altaArticulo")} className="w-1/2 text-lg mx-auto my-3 text-white cursor-pointer" />
            <input type="submit" value="Enviar" disabled={activarSubmitArticulo} className="uppercase font-bold disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed disabled:shadow-none bg-slate-900 text-white hover:bg-slate-700 py-3 w-6/12 mx-auto mb-2 cursor-pointer rounded-xl transition-all shadow-md" />
          </form>
        </div>
      }

      <div className="w-5/6 mx-auto mb-10 rounded-lg overflow-hidden shadow-md">
        <h3 className="bg-neutral-800 text-center font-bold text-white text-xl py-2">Excel Actualizar Artículos</h3>
        <form onSubmit={handleActualizarArticulos} className="flex flex-col justify-around items-center container mx-auto min-h-[150px] bg-neutral-500">
          <input type="file" accept=".xlsx, .xls" onChange={(e) => handleLeer(e, "actualizarArticulo")} className="w-1/2 text-lg mx-auto my-3 text-white cursor-pointer" />

          <button
            type="submit"
            disabled={activarSubmitActualizar}
            className="flex items-center text-center uppercase disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed disabled:shadow-none bg-slate-900 text-white hover:bg-slate-700 py-2 w-6/12 mx-auto mb-2 cursor-pointer rounded-xl transition-all shadow-md"
          >
            <div className="justify-self-start">
              {
                loading &&
                <BounceLoader
                  loading={loading}
                  className="ml-4"
                  color="#222961"
                  size={30}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              }
            </div>
            <div className="w-full font-bold">
              {loading ? "Actualizando" : "Actualizar"}
            </div>
          </button>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </section>
  )
}

export default AltasExcel