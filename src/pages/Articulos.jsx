const Articulos = () => {
  const handleAgregar = () => {
    console.log("agregar");
  };
  return (
    <section className="w-4/5">
      <h2 className="bg-black w-full text-white py-5 mb-8 text-2xl uppercase font-bold text-center">
        Articulos
      </h2>
      <div className="px-10">
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

              <div className="px-3 py-3 w-full inline-block align-middle">
                <div className="overflow-hidden border rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 bg-slate-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-md font-bold text-left text-gray-800 uppercase sm:truncate"
                        >
                          codigo
                        </th>
                        <th
                          scope="col"
                          className=" px-6 py-3 text-md font-bold text-left text-gray-800 uppercase sm:truncate "
                        >
                          Descripcion
                        </th>
                        <th
                          scope="col"
                          className=" px-6 py-3 text-md font-bold text-left text-gray-800 uppercase sm:truncate"
                        >
                          Precio
                        </th>
                        <th
                          scope="col"
                          className=" px-6 py-3 text-md font-bold text-left text-gray-800 uppercase sm:truncate"
                        >
                          Stock
                        </th>
                        <th
                          scope="col"
                          className=" px-6 py-3 text-md font-bold text-left text-gray-800 uppercase sm:truncate"
                        >
                          Codigo de barra
                        </th>
                        <th
                          scope="col"
                          className="w-2/12 py-3 text-md font-bold text-center text-gray-800 uppercase sm:truncate"
                        >
                          Editar
                        </th>
                        <th
                          scope="col"
                          className="w-2/12 py-3 text-md font-bold text-center  text-gray-800 uppercase sm:truncate"
                        >
                          Eliminar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">{}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* {activado && (
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
      } */}
        </div>
      </div>
    </section>
  );
};

export default Articulos;
