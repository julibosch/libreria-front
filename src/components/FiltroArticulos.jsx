import { useState } from "react";
import clienteAxios from "../config/axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';

const FiltroArticulos = ({setArticulosFiltrados, articulos}) => {
  const [filtro, setFiltro] = useState("");
  const [filtroTipo, setFiltroTipo] = useState(""); //Toma el valos del select
  console.log(filtroTipo)

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

    case "codigo_barra" :
      if(filtro === "") return notify("No ingresó código de barra");

      try {
        const respuesta = await clienteAxios.post("/admin/articulo/buscar-codigo-barra", { filtro });
        //Si no existe el codigo de barra, devuelve un msg.
        if (respuesta.data.msg) {
          return notify(respuesta.data.msg);
        }

        //El arreglo articulosFiltrados muestra el que viene del back.
        const artFiltrados = [ respuesta.data ];
        setArticulosFiltrados(artFiltrados);
      } catch (error) {
        console.log(error)
        return notify( error.response.data.msg);
      }
        break;

      case "tipo_articulo" :
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

    return
    if (filtrarCodigo) {
      const artFiltrados = [...articulos].filter((articulo) =>
        articulo?.codigo_buscador?.toLowerCase().includes(filtro.toLowerCase())
      );
      setArticulosFiltrados(artFiltrados);

    } else if(filtrarCodigoBarra) {
      if(filtro === "") return notify("No ingresó código de barra");

      try {
        const respuesta = await clienteAxios.post("/admin/articulo/buscar-codigo-barra", { filtro });
        //Si no existe el codigo de barra, devuelve un msg.
        if (respuesta.data.msg) {
          return notify(respuesta.data.msg);
        }

        //El arreglo articulosFiltrados muestra el que viene del back.
        const artFiltrados = [ respuesta.data ];
        setArticulosFiltrados(artFiltrados)
      } catch (error) {
        console.log(error)
        return notify( error.response.data.msg);
      }

    } else{
      const artFiltrados = [...articulos].filter((articulo) =>
        articulo?.codigo_buscador?.toLowerCase().includes(filtro.toLowerCase()) ||
        articulo.descripcion?.toLowerCase()?.includes(filtro.toLowerCase()) ||
        articulo.tipoArticulo?.toLowerCase()?.includes(filtro.toLowerCase())
      );
      setArticulosFiltrados(artFiltrados);
    }
  }

  const notify = (mensaje) => {
    return toast.error(mensaje);
  }

  return (
    <>
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
        <select id="filtros" onChange={ e =>setFiltroTipo(e.target.value) } className="border border-slate-600 rounded-md py-1 px-3">
          <option value="">Descripción</option>
          <option value="codigo_exacto">Código exacto</option>
          <option value="codigo_aproximado">Código aproximado</option>
          <option value="codigo_barra">Código de barra</option>
          <option value="tipo_articulo">Tipo de artículo</option>
        </select>
      </div>
    </>
  );
};

export default FiltroArticulos;
