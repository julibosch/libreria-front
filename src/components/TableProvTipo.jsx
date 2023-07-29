import { useState, useEffect } from "react";
import AltaProvTipo from "./AltaProvTipo";

const TableProvTipo = ({ title, placeholder, tipoArticulos, setTipoArticulos }) => {
  const [activado, setActivado] = useState(false);

  const handleAgregar = () => {
    setActivado(true);
  };

  useEffect(() => {
    console.log("nashei")
  }, [tipoArticulos])
  

  return (
    <div className="container mx-auto bg-slate-500 rounded-lg shadow-md">
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="py-3 pl-3 relative">
            <div className="relative max-w-xs">
              <label htmlFor="hs-table-search" className="sr-only">
                Search
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

          <div className="px-3 py-3 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 bg-slate-300">
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
                  {tipoArticulos.length > 0 &&
                    tipoArticulos.map((tipo) => (
                      <tr key={tipo.id}>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                          {tipo.id}
                        </td>
                        <td className="px-6 py-4 text-sm uppercase font-semibold text-gray-900 whitespace-nowrap">
                          {tipo.descripcion}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                          <button className="py-2 px-2 shadow-md bg-indigo-500 hover:bg-indigo-600 transition-colors rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-edit"
                              width="25"
                              height="25"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="#000000"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                              <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                              <path d="M16 5l3 3" />
                            </svg>
                          </button>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                          <button className="py-2 px-2 shadow-md bg-red-500 hover:bg-red-600 transition-colors rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-trash"
                              width="25"
                              height="25"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="#000000"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M4 7l16 0" />
                              <path d="M10 11l0 6" />
                              <path d="M14 11l0 6" />
                              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
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
    </div>
  );
};

export default TableProvTipo;
