import { useState, useContext } from "react";
import AltaProvTipo from "./AltaProvTipo";
import EditarTipo from "./EditarTipo";
import TipoArticulo from "./TipoArticulo";
import tipoProvider from "../context/TipoArticuloProvider";

const TableProvTipo = ({ title, placeholder, setTipoArticulos }) => {
  const [descripcion, setDescripcion] = useState(""); //Se pasa al componente editar
  const [id, setId] = useState(""); //Se pasa al componente editar

  const { tipoArticulos, activado, setActivado, activadoEditar, tipoArticulosFiltrados, setTipoArticulosFiltrados } = useContext(tipoProvider);

  const handleAgregar = () => {
    setActivado(true);
  };

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
    <div className="container mx-auto bg-slate-800 pb-2 rounded-lg shadow-md">
      <div className="flex flex-col">
        <div className="overflow-x-auto">
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

          <div className="px-3 w-full">
            <div className="overflow-x-scroll lg:overflow-x-auto border-0 rounded-lg h-[75vh] overflow-y-scroll">
              <table className="divide-y divide-gray-800 w-full bg-yellow-200">
                <thead className="bg-slate-400">
                  <tr>
                    <th
                      scope="col"
                      className="w-1/12 py-3 text-xs font-black text-center text-gray-950 uppercase"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="w-7/12 py-3 text-xs font-black text-left text-gray-950 uppercase"
                    >
                      Descripcion
                    </th>
                    <th
                      scope="col"
                      className="w-4/12 py-3 text-xs font-black text-center text-gray-950 uppercase"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {
                    tipoArticulosFiltrados.length > 0 ? (
                      tipoArticulosFiltrados.map((tipo, index) => (
                        <TipoArticulo
                          key={tipo.id}
                          tipo={tipo}
                          index={index}
                        />
                      ))
                    )
                      : tipoArticulos.length > 0 ?
                        <tr>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">No existen tipos de artículos con esa descripcion</td>
                        </tr>
                        :
                        <tr>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">No hay ningún tipo de artículo, cargue uno</td>
                        </tr>

                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {activado && (
        <AltaProvTipo
          title={title}
          placeholder={placeholder}
          setActivado={setActivado}
          tipoArticulos={tipoArticulos}
          setTipoArticulos={setTipoArticulos}
        />
      )}

      {
        activadoEditar && (
          <EditarTipo
            descripcion={descripcion}
            id={id}
            tipoArticulos={tipoArticulos}
            setTipoArticulos={setTipoArticulos}
          />
        )
      }
    </div>
  );
};

export default TableProvTipo;
