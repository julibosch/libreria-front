import { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AltaArticulo from "../components/AltaArticulo";
import articuloProvider from "../context/ArticuloProvider";
import ModalAumentoPrecios from "../components/ModalAumentoPrecios";
import FiltroArticulos from "../components/FiltroArticulos";
import TableArticulos from "../components/TableArticulos";

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

  const [activarAumentoModal, setActivarAumentoModal] = useState(false);

  /* Aumento masivo de IVA y Ganancias */
  const handleAumentarPrecios = () => {
    setActivarAumentoModal(true);
  }

  return (
    <section className="w-5/6">
      <h2 className="bg-black w-full text-white py-3 mb-2 text-2xl uppercase font-bold text-center">
        Articulos
      </h2>
      <div className="px-2 md:px-10">
        <div className="container mx-auto bg-slate-800 pb-2 md:rounded-lg shadow-md">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="py-2 relative">
                <div className="flex justify-center md:justify-between md:rounded-lg py-2 px-3">
                  <div className="flex">
                    {/* Filtro, checkbox y boton buscar */}
                    <FiltroArticulos
                      setArticulosFiltrados={setArticulosFiltrados}
                      articulos={articulos}
                      tipoFiltro="general"
                    />
                  </div>

                  <div className="gap-10 hidden md:flex">
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

              <div className="md:px-3 w-full">
                <div className="overflow-x-scroll lg:overflow-x-auto border-0 md:rounded-lg h-[75vh]">
                  <TableArticulos
                    articulosFiltrados={articulosFiltrados}
                    articulos={articulos}
                  />
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