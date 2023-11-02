import { useState } from "react";
import clienteAxios from "../config/axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';

const FiltroArticulos = ({ setArticulosFiltrados, articulos, tipoFiltro }) => {
  const [filtro, setFiltro] = useState("");
  const [filtroTipo, setFiltroTipo] = useState(""); //Toma el valos del select

  //Toma el valor del input
  const handleFiltro = e => {
    if (e.target.value === "") {
      setArticulosFiltrados(articulos);
    }
    setFiltro(e.target.value);
  }

  const handleFiltrar = async e => {
    e.preventDefault();

    switch (filtroTipo) {
      case "codigo_exacto":
        const artFiltrados = [...articulos].filter((articulo) =>
          articulo?.codigo_buscador?.toLowerCase() == filtro
        );
        setArticulosFiltrados(artFiltrados);
        break;

      case "codigo_aproximado":
        const artFiltradosCodigoAprox = [...articulos].filter((articulo) =>
          articulo?.codigo_buscador?.toLowerCase().includes(filtro.toLowerCase())
        );
        setArticulosFiltrados(artFiltradosCodigoAprox);
        break

      case "codigo_barra":
        if (filtro === "") return notify("No ingresó código de barra");

        try {
          const respuesta = await clienteAxios.post("/admin/articulo/buscar-codigo-barra", { filtro });
          //Si no existe el codigo de barra, devuelve un msg.
          if (respuesta.data.msg) {
            return notify(respuesta.data.msg);
          }

          //El arreglo articulosFiltrados muestra el que viene del back.
          const artFiltrados = [respuesta.data];
          setArticulosFiltrados(artFiltrados);
        } catch (error) {
          console.log(error)
          return notify(error.response.data.msg);
        }
        break;

      case "tipo_articulo":
        const artFiltradosTipoArt = [...articulos].filter((articulo) =>
          articulo.tipoArticulo?.toLowerCase()?.includes(filtro.toLowerCase())
        );
        setArticulosFiltrados(artFiltradosTipoArt);

        break
      default:
        const artFiltradosDescripcion = [...articulos].filter((articulo) =>
          articulo.descripcion?.toLowerCase()?.includes(filtro.toLowerCase())
        );
        setArticulosFiltrados(artFiltradosDescripcion);
        break;
    }
  }

  const notify = (mensaje) => {
    return toast.error(mensaje);
  }

  return (
    <div className="flex">
      <div className="flex w-10 px-5 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white">
        <svg
          viewBox="0 0 20 20"
          aria-hidden="true"
          className="pointer-events-none absolute w-5 fill-gray-500 transition"
        >
          <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
        </svg>
      </div>
      <input
        type="text"
        name="filtro"
        className="w-full max-w-[200px] bg-white pl-2 text-sm font-semibold outline-0"
        placeholder="Filtrar articulo..."
        id="filtro"
        onChange={handleFiltro}
      />
      <input
        type="submit"
        value="Buscar"
        className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors cursor-pointer"
        onClick={handleFiltrar}
      />

      {/* Checkbox de filtro */}
      <div className="flex items-center justify-center gap-2 pl-7 ml-7 border-l-2 border-l-slate-300">
        <label htmlFor="filtros" className="text-white font-bold ">Filtros</label>
        <select id="filtros" onChange={e => setFiltroTipo(e.target.value)} className="border border-slate-600 rounded-md py-1 px-3">
          {tipoFiltro === "general" ? (
            <>
              <option value="">Descripción</option>
              <option value="codigo_exacto">Código exacto</option>
              <option value="codigo_aproximado">Código aproximado</option>
              <option value="codigo_barra">Código de barra</option>
              <option value="tipo_articulo">Tipo de artículo</option>
            </>
          ) : (
            <>
              <option value="">Descripción</option>
              <option value="codigo_exacto">Código exacto</option>
              <option value="codigo_aproximado">Código aproximado</option>
            </>
          )}
        </select>
      </div>
    </div>
  );
};

export default FiltroArticulos;
