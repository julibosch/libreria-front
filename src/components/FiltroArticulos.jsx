import { useState } from "react";

const FiltroArticulos = ({setArticulosFiltrados, articulos}) => {
  const [filtro, setFiltro] = useState("");
  const [filtrarCodigo, setFiltrarCodigo] = useState(false);
  console.log(articulos)
  //Toma el valor del input
  const handleFiltro = e => {
    if (e.target.value === "") {
      setArticulosFiltrados(articulos);
    }
    setFiltro(e.target.value);
  }

  const handleFiltrar = e => {
    e.preventDefault();
    if (filtrarCodigo) {
      const artFiltrados = [...articulos].filter((articulo) =>
        articulo?.codigo_buscador?.toLowerCase() === filtro.toLowerCase()
      );
      setArticulosFiltrados(artFiltrados);
    } else {
      const artFiltrados = [...articulos].filter((articulo) =>
        articulo?.codigo_buscador?.toLowerCase().includes(filtro.toLowerCase()) ||
        articulo.descripcion?.toLowerCase()?.includes(filtro.toLowerCase()) ||
        articulo.tipoArticulo?.toLowerCase()?.includes(filtro.toLowerCase())
        // articulo.codigo_barra?.toLowerCase()?.includes(filtro.toLowerCase())
      );
      setArticulosFiltrados(artFiltrados);
    }
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
      <div className="flex w-40 gap-1 items-center">
        <input
          type="checkbox"
          onChange={() => setFiltrarCodigo(!filtrarCodigo)}
          name="codigo"
          id="codigo"
        />
        <label className="text-xs text-slate-100" htmlFor="codigo">
          Filtrar solo por codigo
        </label>
      </div>
    </>
  );
};

export default FiltroArticulos;
