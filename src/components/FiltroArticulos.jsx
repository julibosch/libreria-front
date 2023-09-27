import { useState } from "react";
import clienteAxios from "../config/axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';

const FiltroArticulos = ({setArticulosFiltrados, articulos}) => {
  const [filtro, setFiltro] = useState("");
  const [filtrarCodigo, setFiltrarCodigo] = useState(false);
  const [filtrarCodigoBarra, setFiltrarCodigoBarra] = useState(false);

  //Toma el valor del input
  const handleFiltro = e => {
    if (e.target.value === "") {
      setArticulosFiltrados(articulos);
    }
    setFiltro(e.target.value);
  }

  const notify = (mensaje) => {
      return toast.error(mensaje);
  }

  const handleFiltrar = async e => {
    e.preventDefault();
    if (filtrarCodigo) {
      const artFiltrados = [...articulos].filter((articulo) =>
        articulo?.codigo_buscador?.toLowerCase() === filtro.toLowerCase()
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

  const handleChangeCodigoBarra = () => {
      setFiltrarCodigoBarra(!filtrarCodigoBarra);
      setFiltrarCodigo(false)
  }

  const handleChangeCodigo= () => {
    setFiltrarCodigo(!filtrarCodigo);
    setFiltrarCodigoBarra(false);
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
        className="bg-blue-500 p-2 mr-5 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors cursor-pointer"
        onClick={handleFiltrar}
      />

      {/* Checkbox de filtro */}
      <div className="flex flex-col w-60 gap-2">
      <div className="flex w-50 gap-1 items-center">
      <input
          className="cursor-pointer"
          type="checkbox"
          checked={filtrarCodigoBarra}
          onChange={handleChangeCodigoBarra}
          name="codigoBarra"
          id="codigoBarra"
        />
        <label className="text-xs text-slate-100 cursor-pointer" htmlFor="codigoBarra">
          Filtrar por código de barra
        </label>
      </div>
      <div className="flex w-50 gap-1 items-center">
        <input
          className="cursor-pointer"
          type="checkbox"
          checked={filtrarCodigo}
          onChange={handleChangeCodigo}
          name="codigo"
          id="codigo"
        />
        <label className="text-xs text-slate-100 cursor-pointer" htmlFor="codigo">
          Filtrar por codigo
        </label>
      </div>
      </div>
    </>
  );
};

export default FiltroArticulos;
