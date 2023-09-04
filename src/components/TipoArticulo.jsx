import { useContext } from "react";
import tipoProvider from "../context/TipoArticuloProvider";

const TipoArticulo = ({ tipo, index }) => {
  const { id, descripcion } = tipo;
  const { setActivadoEditar, setTipoArticulo, tipoArticulos, setTipoArticulos, eliminarTipoArticulo } = useContext(tipoProvider);

  //Esta funcion activa el modal y le pasa el id y la descripcion al state en el context.
  const handleEditar = () => {
    setActivadoEditar(true);
    setTipoArticulo({ id: tipo.id, descripcion: tipo.descripcion }); //Esta en el context
  };

  return (
    <tr className={index % 2 === 0 ? 'bg-zinc-300' : 'bg-zinc-200'}>
      <td className="py-3 text-sm text-center font-semibold text-gray-900 whitespace-nowrap">
        {id}
      </td>
      <td className="text-sm uppercase font-semibold text-gray-900 whitespace-nowrap">
        {descripcion}
      </td>

      {/* EDITAR y ELIMINAR */}
      <td className="text-sm font-medium text-center whitespace-nowrap flex gap-10 py-2 pr-1 justify-center">
        <button
          className="py-2 px-2 shadow-md bg-indigo-500 hover:bg-indigo-600 transition-colors rounded-full"
          onClick={() => handleEditar()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-edit"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#000000"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
            <path d="M16 5l3 3" />
          </svg>
        </button>
      
        <button 
        className="py-2 px-2 shadow-md bg-red-500 hover:bg-red-600 transition-colors rounded-full"
        onClick={()=> eliminarTipoArticulo(tipo)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-trash"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#000000"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 7l16 0" />
            <path d="M10 11l0 6" />
            <path d="M14 11l0 6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default TipoArticulo;
