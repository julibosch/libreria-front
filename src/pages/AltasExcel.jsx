import { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from 'react-toastify';

const AltasExcel = () => {
  const [tipoArticulos, setTipoArticulos] = useState([]);
  const [articulos, setArticulos] = useState([]);
  const [activarSubmitArticulo, setActivarSubmitArticulo] = useState(true);
  const [activarSubmitTipo, setActivarSubmitTipo] = useState(true);

  const handleLeer = (e, informacion) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const resultado = XLSX.utils.sheet_to_json(sheet, { raw: true });

        if (informacion === "tipoArticulo") {
          setTipoArticulos(resultado);
          setActivarSubmitTipo(false);
          console.log("tipo", resultado)
        } else {
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

          setArticulos(articulosDefinitivos)
          setActivarSubmitArticulo(false);
          console.log("articulos: ", articulosDefinitivos)
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleEnviarTiposArticulos = async (e) => {
    e.preventDefault();
    console.log(tipoArticulos);
    const url = "http://localhost:4000/admin/tipos-de-articulo-excel"
    try {
      const respuesta = await axios.post(url, tipoArticulos);
      notify(respuesta.data.msg);
    } catch (error) {
      console.log(error)
    }
  }

  const handleEnviarArticulos = async (e) => {
    e.preventDefault();
    console.log(articulos);
    const url = "http://localhost:4000/admin/articuloExcel";
    try {
      const respuesta = await axios.post(url, articulos);
      console.log(respuesta);
      notify(respuesta.data.msg);
    } catch (error) {
      console.log(error)
    }
  }

  const notify = (mensaje) => {
    toast.success(mensaje)
  }

  return (
    <section className="w-5/6">
      <h1 className="bg-black w-full text-white py-3 text-2xl font-bold uppercase text-center mb-8">Altas mediante Excel</h1>

      <div className="w-5/6 mx-auto mb-10 rounded-lg overflow-hidden shadow-md">
        <h3 className="bg-neutral-800 text-center font-bold text-white text-xl py-2">Excel Tipos de artículo</h3>
        <form onSubmit={handleEnviarTiposArticulos} className="flex flex-col justify-around items-center container mx-auto min-h-[150px] bg-neutral-500">
          <input type="file" accept=".xlsx, .xls" onChange={(e) => handleLeer(e, "tipoArticulo")} className="w-1/2 text-lg mx-auto my-3 text-white cursor-pointer" />
          <input type="submit" value="Enviar" disabled={activarSubmitTipo} className="uppercase font-bold disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed disabled:shadow-none bg-slate-900 text-white hover:bg-slate-700 py-3 w-6/12 mx-auto mb-2 cursor-pointer rounded-xl transition-all shadow-md" />
        </form>
      </div>

      <div className="w-5/6 mx-auto rounded-lg overflow-hidden shadow-md">
        <h3 className="bg-neutral-800 text-center font-bold text-white text-xl py-2">Excel Artículos</h3>
        <form onSubmit={handleEnviarArticulos} className="flex flex-col justify-around items-center container mx-auto min-h-[150px] bg-neutral-500">
          <input type="file" accept=".xlsx, .xls" onChange={(e) => handleLeer(e, "articulo")} className="w-1/2 text-lg mx-auto my-3 text-white cursor-pointer" />
          <input type="submit" value="Enviar" disabled={activarSubmitArticulo} className="uppercase font-bold disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed disabled:shadow-none bg-slate-900 text-white hover:bg-slate-700 py-3 w-6/12 mx-auto mb-2 cursor-pointer rounded-xl transition-all shadow-md" />
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