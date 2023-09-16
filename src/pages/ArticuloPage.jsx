import { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AltaArticulo from "../components/AltaArticulo";
import articuloProvider from "../context/ArticuloProvider";
import Articulo from "../components/Articulo";
import ModalAumentoPrecios from "../components/ModalAumentoPrecios";

const ArticuloPage = () => {
  const {
    activarAltaModal,
    setActivarAltaModal,
    articulos,
    setArticulos,
    activarEditar,
    articulosFiltrados,
    setArticulosFiltrados,
  } = useContext(articuloProvider);

  const [filtro, setFiltro] = useState("");
  const [activarAumentoModal, setActivarAumentoModal] = useState(false);
  const [filtrarCodigo, setFiltrarCodigo] = useState(false);

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

  /* Aumento masivo de IVA y Ganancias */
  const handleAumentarPrecios = () => {
    setActivarAumentoModal(true);
  }

  return (
    <section className="w-5/6">
      <h2 className="bg-black w-full text-white py-3 mb-2 text-2xl uppercase font-bold text-center">
        Articulos
      </h2>
      <div className="px-10">
        <div className="container mx-auto bg-slate-800 pb-2 rounded-lg shadow-md">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="py-2 relative">
                <div className="flex justify-between rounded-lg py-2 px-3">
                  <div className="flex">
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
                      <input type="checkbox" onChange={() => setFiltrarCodigo(!filtrarCodigo)} name="codigo" id="codigo" />
                      <label className="text-xs text-slate-100" htmlFor="codigo">Filtrar solo por codigo</label>
                    </div>
                  </div>

                  <div className="flex gap-10">
                    <button
                      className="flex items-center pr-3 py-2 bg-green-400 hover:bg-green-200 transition-colors shadow-md uppercase font-semibold text-sm rounded-md disabled:bg-slate-500 disabled:cursor-not-allowed"
                      onClick={handleAumentarPrecios} // Activa modal de alta
                      disabled={articulos.length > 0 ? false : true}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="mx-2 icon icon-tabler icon-tabler-mood-dollar" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M20.87 10.48a9 9 0 1 0 -7.876 10.465" />
                        <path d="M9 10h.01" />
                        <path d="M15 10h.01" />
                        <path d="M9.5 15c.658 .64 1.56 1 2.5 1c.357 0 .709 -.052 1.043 -.151" />
                        <path d="M21 15h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
                        <path d="M19 21v1m0 -8v1" />
                      </svg>
                      Aumentar Importes
                    </button>

                    <button
                      className="flex items-center pr-3 py-2 bg-yellow-400 hover:bg-yellow-200 transition-colors shadow-md uppercase font-semibold text-sm rounded-md"
                      onClick={() => setActivarAltaModal(true)} // Activa modal de alta
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="mx-2 icon icon-tabler icon-tabler-square-rounded-plus" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 12h6" />
                        <path d="M12 9v6" />
                        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                      </svg>
                      Agregar Articulo
                    </button>
                  </div>
                </div>
              </div>

              <div className="px-3 w-full">
                <div className="overflow-x-scroll lg:overflow-x-auto border-0 rounded-lg h-[75vh] overflow-y-scroll">
                  <table className="divide-y divide-gray-800 bg-yellow-200">
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
                            <Articulo key={articulo.codigo_buscador} articuloProp={articulo} index={index} />
                          ))
                        )
                          :
                          (
                            articulos.length > 0 ?
                              <tr>
                                <td className="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">No existe el articulo con esa descripcion</td>
                              </tr>
                              :
                              <tr>
                                <td className="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">No hay ningún artículo, cargue uno</td>
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
          {activarAumentoModal &&
            <ModalAumentoPrecios
              setActivarAumentoModal={setActivarAumentoModal}
              articulos={articulos}
              setArticulos={setArticulos}
            />
          }
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
