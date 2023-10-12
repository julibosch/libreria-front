import { useContext, useState } from "react";
import articuloProvider from "../context/ArticuloProvider";
import { FixedSizeList as List } from 'react-window';
import FiltroArticulos from "./FiltroArticulos";
import ModalPDF from "./ModalPDF";

const VistaPDF = () => {
  const { articulosFiltrados, setArticulosFiltrados, articulos } = useContext(articuloProvider);
  const [checkboxesState, setCheckboxesState] = useState({});
  const [articulosSeleccionados, setArticulosSeleccionados] = useState([]);
  const [modalPDF, setModalPDF] = useState(false);

  const handleCheckboxChange = (e, articulo) => {
    const isChecked = e.target.checked;
    setCheckboxesState((prevCheckboxesState) => ({
      ...prevCheckboxesState,
      [articulo.id]: isChecked,
    }));

    if (isChecked) {
      // Agregar el artículo a la lista de seleccionados
      setArticulosSeleccionados([...articulosSeleccionados, articulo]);
    } else {
      // Eliminar el artículo de la lista de seleccionados
      setArticulosSeleccionados(articulosSeleccionados.filter((articuloFilter) => articuloFilter.id !== articulo.id));
    }
  };

  const Articulo = ({ index, style }) => {
    const articulo = articulosFiltrados[index];
    const isChecked = checkboxesState[articulo.id] || false;

    return (
      <li className="px-3 fira w-full border-b border-zinc-700 items-center flex gap-4 py-1" style={style}>
        <div className="w-1/12 flex justify-center">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
            onChange={(e) => handleCheckboxChange(e, articulo)}
            checked={isChecked}
          />
        </div>
        <p className="w-1/12 text-center font-bold">{articulo.codigo_buscador}</p>
        <p className="w-7/12 font-semibold">{articulo.descripcion}</p>
        <p className="w-3/12 text-center font-bold">${Number(articulo.precio).toFixed(2)}</p>
      </li>
    );
  };

  return (
    <section className="w-5/6">
      <h2 className="bg-black w-full text-white py-3 text-2xl uppercase font-bold text-center">EXPORTAR PDF</h2>
      <div className="bg-slate-300 mx-auto w-11/12 mt-6 rounded-md overflow-hidden">
        <div className="flex justify-center bg-slate-800 border-b-2 py-2">
          <FiltroArticulos
            setArticulosFiltrados={setArticulosFiltrados}
            articulos={articulos}
          />
          <button
            className="flex items-center ml-36 px-3 py-2 bg-yellow-400 hover:bg-yellow-200 transition-colors shadow-md uppercase font-semibold text-sm rounded-md"
            onClick={() => setModalPDF(true)} // Activa modal de alta
          >
            Generar PDF
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-text" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
              <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
              <path d="M9 9l1 0"></path>
              <path d="M9 13l6 0"></path>
              <path d="M9 17l6 0"></path>
            </svg>
          </button>
        </div>
        <div className="flex px-3 py-2 gap-4 border-b-2 border-zinc-900 bg-slate-800 text-white">
          <p className="w-1/12 text-center font-black uppercase">Agregar</p>
          <p className="w-1/12 text-center font-black uppercase">Codigo</p>
          <p className="w-7/12 font-black uppercase">Descripcion</p>
          <p className="w-3/12 text-center font-black uppercase">Precio</p>
        </div>

        {
          articulosFiltrados.length > 0 ?
            (
              <List
                className='w-full'
                height={500}
                itemCount={articulosFiltrados.length}
                itemSize={45}
              >
                {Articulo}
              </List>
            )
            :
            (
              <li className="w-full text-center mt-24">
                <p className="w-2/3 px-4 py-5 font-semibold uppercase bg-slate-50 mx-auto">Aun no cargo ningún artículo</p>
              </li>
            )
        }
      </div>

      {
        modalPDF && 
        <ModalPDF 
          articulosSeleccionados={articulosSeleccionados}
          setModalPDF={setModalPDF}
        />
      }
    </section>
  )
}

export default VistaPDF;