import { useState } from 'react';

const HeaderTablaTipoArticulos = ({ handleAgregar, setTipoArticulosFiltrados, tipoArticulos }) => {
  const [filtro, setFiltro] = useState("");
  
  //Toma el valor del input
  const handleFiltro = e => {
    if (e.target.value === "") {
      setTipoArticulosFiltrados(tipoArticulos);
    }
    setFiltro(e.target.value);
  }

  const handleFiltrar = e => {
    e.preventDefault();
    const tipoArtFiltrados = [...tipoArticulos].filter(
      (tipo) =>
        tipo?.codigo_buscador
          ?.toLowerCase()
          .includes(filtro.toLowerCase()) ||
        tipo.descripcion?.toLowerCase()?.includes(filtro.toLowerCase())
    );

    setTipoArticulosFiltrados(tipoArtFiltrados);
  }

  return (
    <div className="py-2 relative">
      <div className="flex rounded-lg py-2 px-3">
        <div className="flex flex-grow">
          <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white">
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
            className="w-full max-w-[200px] bg-white pl-2 text-sm font-semibold outline-0"
            placeholder="Filtrar tipo articulo..."
            id="search"
            onChange={handleFiltro}
          />
          <input
            type="submit"
            value="Buscar"
            className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors cursor-pointer"
            onClick={handleFiltrar}
          />
        </div>

        <div className="flex gap-10">
          <button
            className="flex items-center pr-2 py-2 bg-yellow-400 hover:bg-yellow-200 transition-colors shadow-md uppercase font-semibold text-sm rounded-md"
            onClick={handleAgregar} // Activa modal de alta
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-2 icon icon-tabler icon-tabler-square-rounded-plus" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 12h6" />
              <path d="M12 9v6" />
              <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
            </svg>
            Agregar Tipo Articulo
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeaderTablaTipoArticulos