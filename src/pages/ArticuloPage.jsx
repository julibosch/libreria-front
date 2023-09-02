import { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AltaArticulo from "../components/AltaArticulo";
import articuloProvider from "../context/ArticuloProvider";
import Articulo from "../components/Articulo";

const ArticuloPage = () => {
  const {
    activarAltaModal,
    setActivarAltaModal,
    articulos,
    activarEditar,
    articulosFiltrados,
    setArticulosFiltrados,
  } = useContext(articuloProvider);

  const [filtro, setFiltro] = useState("");

  //Toma el valor del input
  const handleFiltro = e => {
    if (e.target.value === "") {
      setArticulosFiltrados(articulos);
    }
    setFiltro(e.target.value);
  }
  
  const handleFiltrar = e => {
    e.preventDefault();
    const artFiltrados = articulos.filter(
          (articulo) =>
            articulo?.codigo_buscador
              ?.toLowerCase()
              .includes(filtro.toLowerCase()) ||
            articulo.descripcion?.toLowerCase()?.includes(filtro.toLowerCase()) ||
            articulo.tipoArticulo?.toLowerCase()?.includes(filtro.toLowerCase()) ||
            articulo.codigo_barra?.toLowerCase()?.includes(filtro.toLowerCase())
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
                <div class="rounded-lg py-2">
                  <div class="flex">
                    <div class="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
                      <svg
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        class="pointer-events-none absolute w-5 fill-gray-500 transition"
                      >
                        <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      class="w-full max-w-[160px] bg-white pl-2 text-base font-semibold outline-0"
                      placeholder="Filtrar articulo..."
                      id=""
                      onChange={handleFiltro}
                      
                    />
                    <input
                      type="submit"
                      value="Buscar"
                      class="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors cursor-pointer"
                      onClick={handleFiltrar}
                    />
                  </div>
                </div>
                <div className="absolute w-1/4 justify-around flex right-4 top-3">
                  <button
                    className="px-3 py-2 bg-yellow-400 hover:bg-yellow-200 transition-colors shadow-md uppercase font-semibold text-sm rounded-md"
                    onClick={() => setActivarAltaModal(true)} // Activa modal de alta
                  >
                    Agregar
                  </button>

                  <button
                    className="px-3 py-2 bg-green-400 hover:bg-green-200 transition-colors shadow-md uppercase font-semibold text-sm rounded-md"
                    onClick={() => setActivarAltaModal(true)} // Activa modal de alta
                  >
                    Aumentar
                  </button>
                </div>
              </div>

              <div className="px-3 w-full">
                <div className="overflow-x-scroll lg:overflow-x-auto border-0 rounded-lg h-[75vh] overflow-y-scroll">
                  <table className="divide-y divide-gray-800">
                    <thead className="bg-slate-400">
                      <tr>
                        <th
                          scope="col"
                          className="w-1/12 py-3 text-xs font-black text-center text-gray-950 uppercase"
                        >
                          codigo
                        </th>
                        <th
                          scope="col"
                          className="w-4/12 py-3 text-xs font-black text-left text-gray-950 uppercase"
                        >
                          Descripción
                        </th>
                        <th
                          scope="col"
                          className="w-1/12 py-3 text-xs font-black text-left text-gray-950 uppercase"
                        >
                          Precio
                        </th>
                        <th
                          scope="col"
                          className="w-1/12 py-3 text-xs font-black text-center text-gray-950 uppercase"
                        >
                          Codigo de barra
                        </th>
                        <th
                          scope="col"
                          className="w-2/12 py-3 text-xs font-black text-center text-gray-950 uppercase"
                        >
                          Tipo de artículo
                        </th>
                        <th
                          scope="col"
                          className="w-1/12 py-3 text-xs font-black text-center text-gray-950 uppercase"
                        >
                          Stock
                        </th>
                        <th
                          scope="col"
                          className="w-1/12 py-3 text-xs font-black text-center text-gray-950 uppercase"
                        >
                          Color
                        </th>
                        <th
                          scope="col"
                          className="w-1/12 py-3 pr-1 text-xs font-black text-center  text-gray-950 uppercase"
                        >
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {
                        articulosFiltrados.length > 0 ? (
                          articulosFiltrados.map((articulo, index) => (
                            <Articulo key={articulo.id} articuloProp={articulo} index={index}/>
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
