import { useState, useEffect, useContext } from "react";
import AltaProvTipo from "./AltaProvTipo";
import EditarTipo from "./EditarTipo";
import TipoArticulo from "./TipoArticulo";
import tipoProvider from "../context/TipoArticuloProvider";

const TableProvTipo = ({ title, placeholder, setTipoArticulos }) => {
  const [descripcion, setDescripcion] = useState(""); //Se pasa al componente editar
  const [id, setId] = useState(""); //Se pasa al componente editar

  const { tipoArticulos, activado, setActivado, activadoEditar } = useContext(tipoProvider);

  const handleAgregar = () => {
    setActivado(true);
  };

  return (
    <div className="container mx-auto bg-slate-500 rounded-lg shadow-md">
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="py-3 pl-3 relative">
            <div className="relative max-w-xs">
              <label htmlFor="hs-table-search" className="sr-only">
                Buscar
              </label>
              <input
                type="text"
                name="hs-table-search"
                id="hs-table-search"
                className="block w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 outline-none"
                placeholder="Buscar Tipo de Articulo"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </div>
            </div>
            <div className="absolute w-1/4 justify-between flex right-4 top-5">
              <button
                className="px-3 py-2 bg-yellow-400 hover:bg-yellow-200 transition-colors shadow-md uppercase font-semibold text-sm rounded-md"
                onClick={handleAgregar}
              >
                Agregar
              </button>
            </div>
          </div>

          <div className="px-3 py-3 w-full inline-block align-middle ">
            <div className="h-[30rem] overflow-y-scroll border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 bg-slate-300 ">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="w-1/12 px-6 py-3 text-md font-bold text-left text-gray-800 uppercase "
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="w-7/12 px-6 py-3 text-md font-bold text-left text-gray-800 uppercase "
                    >
                      Descripcion
                    </th>
                    <th
                      scope="col"
                      className="w-2/12 py-3 text-md font-bold text-center text-gray-800 uppercase "
                    >
                      Editar
                    </th>
                    <th
                      scope="col"
                      className="w-2/12 py-3 text-md font-bold text-center  text-gray-800 uppercase "
                    >
                      Eliminar
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {
                    tipoArticulos.length > 0 ? (
                      tipoArticulos.map(tipo => (
                      <TipoArticulo
                        key={tipo.id}
                        tipo={tipo}
                      />
                      ))
                    )
                    :
                    (
                      <tr>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">No existen tipos de artículos, cargue uno</td>
                      </tr>
                    )

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
