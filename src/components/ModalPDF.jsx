import { useState } from "react";
import GenerarPDF from "./GenerarPDF"
import { PDFViewer } from '@react-pdf/renderer';
//import clienteAxios from "../config/axios";

const ModalPDF = ({ articulosSeleccionados, setModalPDF }) => {
  const [inputTitulo, setInputTitulo] = useState(true);
  const [tituloPDF, setTituloPDF] = useState("");

  const handleValidate = async () => {
    setInputTitulo(false);

    // const url = "/admin/generarPDF";
    // if(articulosSeleccionados.length > 100) {
    //   try {
    //     const respuesta = await clienteAxios.post(url, {articulosSeleccionados, tituloPDF});

    //     console.log(respuesta);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  }

  return (
    <div className="absolute w-full h-screen top-0 left-0 bg-black/80 backdrop-blur-sm">
      {/* Input del titulo del pdf */}
      {inputTitulo ? (
        <div className="flex flex-col w-1/2 mt-40 mx-auto bg-slate-300">
          <button onClick={() => setModalPDF(false)} className="p-2 bg-amber-400 hover:bg-amber-600 transition-colors flex gap-2 font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M5 12l14 0"></path>
              <path d="M5 12l4 4"></path>
              <path d="M5 12l4 -4"></path>
            </svg>
            Cerrar PDF
          </button>
          <label className="w-full text-center py-5 font-bold text-xl" htmlFor="pdf">
            Ingrese el titulo para el PDF
          </label>
          <input
            className="w-2/3 mx-auto py-2 px-2 rounded-md"
            placeholder="Ejemplo: Juguetes Duravit..."
            type="text"
            id="pdf"
            value={tituloPDF}
            onChange={(e) => setTituloPDF(e.target.value)}
          />
          <button
            className="w-1/2 mx-auto py-2 px-3 bg-sky-700 hover:bg-sky-900 transition-colors text-white font-bold text-center my-5 uppercase"
            onClick={handleValidate}
          >
            Aceptar
          </button>
        </div>
      ) : (
        // Si esta en false y hay mas de 100 articulos, se descarga el pdf
        articulosSeleccionados.length > 100 ? (
          <div className="absolute flex w-full h-screen top-0 left-0 bg-black/80 backdrop-blur-sm">
            <div className="relative w-1/3 mx-auto my-auto pb-5 pt-12 bg-rose-300 text-center text-xl font-semibold">
              <button onClick={() => setModalPDF(false)} className="absolute top-1 right-1 p-2 rounded-full bg-rose-500 hover:bg-rose-700 transition-colors flex gap-2 font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M18 6l-12 12"></path>
                  <path d="M6 6l12 12"></path>
                </svg>
              </button>
              <p>Por favor, ingrese menos de 100 articulos</p>
            </div>
          </div>
        ) : (
          // Si esta en false y hay menos de 100 articulos, se renderiza PDF Viewer
          <div className="w-10/12 h-[90vh] mx-auto my-4 bg-white">
            <button onClick={() => setModalPDF(false)} className="p-2 w-full bg-amber-400 hover:bg-amber-600 transition-colors flex gap-2 font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 12l14 0"></path>
                <path d="M5 12l4 4"></path>
                <path d="M5 12l4 -4"></path>
              </svg>
              Cerrar PDF
            </button>
            <PDFViewer width="100%" height="100%">
              <GenerarPDF
                articulosSeleccionados={articulosSeleccionados}
                tituloPDF={tituloPDF}
              />
            </PDFViewer>
          </div>
        )
      )}
    </div>
  )
}

export default ModalPDF