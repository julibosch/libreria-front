import { useState } from "react";
import GenerarPDF from "./GenerarPDF"
import { PDFViewer } from '@react-pdf/renderer';

const ModalPDF = ({ articulosSeleccionados, setModalPDF }) => {
  const [inputTitulo, setInputTitulo] = useState(true);
  const [tituloPDF, setTituloPDF] = useState("");

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
            placeholder="Ejemplo: Juguetes para niños..."
            type="text"
            id="pdf"
            value={tituloPDF}
            onChange={(e) => setTituloPDF(e.target.value)}
          />
          <button
            className="w-1/2 mx-auto py-2 px-3 bg-sky-700 hover:bg-sky-900 transition-colors text-white font-bold text-center my-5 uppercase"
            onClick={() => setInputTitulo(false)}
          >
            Aceptar
          </button>
        </div>
      )
        :
        (
          // PDF Viewer
          <div className="w-10/12 h-[90vh] mx-auto my-6 bg-white">
            <button onClick={() => setModalPDF(false)} className="p-2 bg-amber-400 hover:bg-amber-600 transition-colors flex gap-2 font-bold">
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
        )}
    </div>
  )
}

export default ModalPDF