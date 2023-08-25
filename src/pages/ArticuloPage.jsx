import { useContext } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AltaArticulo from "../components/AltaArticulo";
import articuloProvider from "../context/ArticuloProvider";
import Articulo from "../components/Articulo";

const ArticuloPage = () => {
  const { activarAltaModal, setActivarAltaModal, articulos, activarEditar, articulosFiltrados, setArticulosFiltrados } = useContext(articuloProvider);

  const handleFiltrar = (e) => {
    const filtrar = e.target.value;

    const artFiltrados = articulos.filter(
      articulo => articulo.codigo_buscador.toLowerCase().includes(filtrar.toLowerCase()) ||
      articulo.descripcion.toLowerCase().includes(filtrar.toLowerCase()) ||
      articulo.tipoArticulo.toLowerCase().includes(filtrar.toLowerCase()) || 
      articulo.codigo_barra.toLowerCase().includes(filtrar.toLowerCase())
    );

    setArticulosFiltrados(artFiltrados);
  }

  return (
    <section className="w-5/6">
      <h2 className="bg-black w-full text-white py-3 mb-4 text-2xl uppercase font-bold text-center">
        Articulos
      </h2>
      <div className="px-10">
        <div className="container mx-auto bg-slate-800 pb-2 rounded-lg shadow-md">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="py-2 pl-3 relative">
                <div className="relative max-w-xs">
                  <label htmlFor="hs-table-search" className="sr-only">
                    Buscar
                  </label>
                  <input
                    type="text"
                    name="hs-table-search"
                    id="hs-table-search"
                    className="block w-full p-3 pl-10 text-sm text-slate-50 font-semibold border-gray-200 rounded-md bg-slate-700 focus:shadow-inner focus:shadow-slate-600 focus:border-slate-600 focus:bg-slate-500 focus:text-md transition-colors border outline-none"
                    placeholder="Buscar Articulo"
                    onChange={handleFiltrar}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="h-4 w-4 text-gray-200"
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
                <div className="absolute w-1/4 justify-between flex right-4 top-3">
                  <button
                    className="px-3 py-2 bg-yellow-400 hover:bg-yellow-200 transition-colors shadow-md uppercase font-semibold text-sm rounded-md"
                    onClick={() => setActivarAltaModal(true)} // Activa modal de alta
                  >
                    Agregar
                  </button>
                </div>
              </div>

              <div className="px-3 w-full inline-block align-middle">
                <div className="overflow-x-scroll lg:overflow-x-auto border rounded-lg h-[75vh] overflow-y-scroll">
                  <table className="divide-y divide-gray-200 bg-slate-300 ">
                    <thead className="bg-gray-100">
                      <tr>
                        <th
                          scope="col"
                          className="w-1/12 pl-3 py-3 text-xs font-black text-left text-gray-800 uppercase "
                        >
                          codigo
                        </th>
                        <th
                          scope="col"
                          className="w-2/12 py-3 text-xs font-black text-left text-gray-800 uppercase  "
                        >
                          Descripción
                        </th>
                        <th
                          scope="col"
                          className="w-1/12 py-3 text-xs font-black text-left text-gray-800 uppercase "
                        >
                          Precio
                        </th>
                        <th
                          scope="col"
                          className="w-1/12 py-3 text-xs font-black text-left text-gray-800 uppercase "
                        >
                          Codigo de barra
                        </th>
                        <th
                          scope="col"
                          className="w-1/12 py-3 text-xs font-black text-center text-gray-800 uppercase "
                        >
                          Tipo de artículo
                        </th>
                        <th
                          scope="col"
                          className="w-1/12 py-3 text-xs font-black text-center text-gray-800 uppercase "
                        >
                          Stock
                        </th>
                        <th
                          scope="col"
                          className="w-1/12 py-3 text-xs font-black text-center text-gray-800 uppercase "
                        >
                          Color
                        </th>
                        <th
                          scope="col"
                          className="w-1/12 py-3 text-xs font-black text-center text-gray-800 uppercase "
                        >
                          Editar
                        </th>
                        <th
                          scope="col"
                          className="w-1/12 py-3 text-xs font-black text-center  text-gray-800 uppercase "
                        >
                          Eliminar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {
                        articulosFiltrados.length > 0 ? (
                          articulosFiltrados.map(articulo => (
                            <Articulo key={articulo.id} articuloProp={articulo} />
                          ))
                        )
                          :
                          (
                            articulos.length > 0 ? 
                            <tr>
                              <td className="font-bold p-2">No existe el articulo con esa especificacion</td>
                            </tr>
                            : 
                            <tr>
                              <td className="font-bold p-2">No hay ningún artículo, cargue uno</td>
                            </tr>
                          )
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {activarAltaModal && <AltaArticulo />}
          {activarEditar && <AltaArticulo />}
        </div>
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
  );
};

export default ArticuloPage;
