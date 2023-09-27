import { useContext } from "react";
import articuloProvider from "../context/ArticuloProvider";
import { FixedSizeList as List } from 'react-window';

const TableArticulos = ({ articulosFiltrados, articulos }) => {

  // COMPONENTE ARTICULO
  const Articulo = ({ index, style }) => {

    const {
      setActivarEditar,
      setCodigo,
      setDescripcion,
      setCodigoBarra,
      setStock,
      setColor,
      setTipoArticulo,
      setPrecio,
      setIdArticulo,
      eliminarArticulo
    } = useContext(articuloProvider);
  
    //Esta funcion activa el modal de EDITAR y llena los estados para que se complete el formulario
    const handleEditar = () => {
      setActivarEditar(true);
      setCodigo(articulosFiltrados[index].codigo_buscador);
      setDescripcion(articulosFiltrados[index].descripcion);
      setCodigoBarra(articulosFiltrados[index].codigo_barra);
      setStock(articulosFiltrados[index].stock);
      setColor(articulosFiltrados[index].color);
      setTipoArticulo(articulosFiltrados[index].tipoArticulo);
      setPrecio(articulosFiltrados[index].precio);
      setIdArticulo(articulosFiltrados[index].id);
    };

    return (
      <li className={`${index % 2 === 0 ? 'bg-zinc-300' : 'bg-zinc-200'} flex items-center`} style={style}>
        <p className="w-1/12 text-sm font-semibold text-center text-gray-900">
          {articulosFiltrados[index].codigo_buscador}
        </p>
        <p className="w-4/12 text-xs pr-3 font-semibold text-gray-900">
          {articulosFiltrados[index].descripcion}
        </p>
        <p className="w-1/12 text-sm pr-3 font-sans font-bold text-gray-950">
          ${articulosFiltrados[index].precio}
        </p>
        <p className="w-1/12 text-sm pr-3 font-semibold text-center text-gray-900">
          {articulosFiltrados[index].codigo_barra}
        </p>
        <p className="w-2/12 text-xs pl-7 font-semibold text-center text-gray-900">
          {articulosFiltrados[index].tipoArticulo}
        </p>
        <p className="w-1/12 text-sm text-center font-semibold text-gray-900">
          {articulosFiltrados[index].stock}
        </p>
        <p className="w-1/12 text-xs text-center font-semibold text-gray-900">
          {articulosFiltrados[index].color}
        </p>

        {/* EDITAR */}
        <p className="w-1/12 text-sm font-medium text-center whitespace-nowrap flex py-2 pr-1 justify-around">
          <button
            className="py-2 px-2 shadow-md bg-indigo-400 hover:bg-indigo-600 transition-colors rounded-full"
            onClick={() => handleEditar()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-edit"
              width="15"
              height="15"
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


          {/* ELIMINAR */}

          <button
            onClick={() => eliminarArticulo(articulosFiltrados[index])}
            className="py-2 px-2 shadow-md bg-red-500 hover:bg-red-600 transition-colors rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-trash"
              width="15"
              height="15"
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
        </p>
      </li>
    )
  };

  return (
    <ul className="flex flex-col bg-slate-400">
      <li className="flex items-center pr-3">
        <p className="w-1/12 py-3 text-xs font-black text-center text-gray-950 uppercase">
          codigo
        </p>
        <p className="w-4/12 py-3 text-xs font-black text-left text-gray-950 uppercase">
          Descripción
        </p>
        <p className="w-1/12 py-3 text-xs font-black text-left text-gray-950 uppercase">
          Precio
        </p>
        <p className="w-1/12 py-3 text-xs font-black text-center text-gray-950 uppercase">
          Codigo de barra
        </p>
        <p className="w-2/12 py-3 pl-3 text-xs font-black text-center text-gray-950 uppercase">
          Tipo de artículo
        </p>
        <p className="w-1/12 py-3 text-xs font-black text-center text-gray-950 uppercase">
          Stock
        </p>
        <p className="w-1/12 py-3 text-xs font-black text-center text-gray-950 uppercase">
          Color
        </p>
        <p className="w-1/12 py-3 pr-1 text-xs font-black text-center  text-gray-950 uppercase">
          Acciones
        </p>
      </li>
      {
        articulosFiltrados.length > 0 ? (
          <List
            className='bg-slate-200 w-full'
            height={455}
            itemCount={articulosFiltrados.length}
            itemSize={45}
          >
            {Articulo}
          </List>
        )
          :
          (
            articulos.length > 0 ?
              <li>
                <p className="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">No existe el articulo con esa descripcion</p>
              </li>
              :
              <li>
                <p className="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">No hay ningún artículo, cargue uno</p>
              </li>
          )
      }
    </ul>
  )
}

export default TableArticulos