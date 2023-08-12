import { useState, useContext } from "react";
import articuloProvider from "../context/ArticuloProvider";

const Articulo = ({ articuloProp }) => {
  

  const { setActivarEditar, 
    setArticulo, 
    articulo
  } = useContext(articuloProvider);

  //Esta funcion activa el modal y llena articulo con los datos que es el state en el context.
  const handleEditar = () => {
    setActivarEditar(true);
    setArticulo({
      codigo_buscador: articuloProp.codigo_buscador,
      descripcion: articuloProp.descripcion,
      precio: articuloProp.precio,
      codigo_barra: articuloProp.codigo_barra,
      tipoArticulo: articuloProp.tipoArticulo,
      stock: articuloProp.stock,
      color: articuloProp.color,
    }); 
  };

  return (
    <tr>
      <td className="px-6 py-3 text-sm font-semibold text-gray-900 whitespace-nowrap">
        {articuloProp.codigo_buscador}
      </td>
      <td className="px-6 py-3 text-sm font-semibold text-gray-900 whitespace-nowrap">
        {articuloProp.descripcion}
      </td>
      <td className="px-6 py-3 text-sm font-semibold text-gray-900 whitespace-nowrap">
        {articuloProp.precio}
      </td>
      <td className="px-6 py-3 text-sm font-semibold text-gray-900 whitespace-nowrap">
        {articuloProp.codigo_barra}
      </td>
      <td className="px-6 py-3 text-sm font-semibold text-gray-900 whitespace-nowrap">
        {articuloProp.tipoArticulo}
      </td>
      <td className="px-6 py-3 text-sm font-semibold text-gray-900 whitespace-nowrap">
        {articuloProp.stock}
      </td>
      <td className="px-6 py-3 text-sm font-semibold text-gray-900 whitespace-nowrap">
        {articuloProp.color}
      </td>
      <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
        <button
          className="py-2 px-2 shadow-md bg-indigo-500 hover:bg-indigo-600 transition-colors rounded-full"
          onClick={() => handleEditar(articulo)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-edit"
            width="25"
            height="25"
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
      </td>
      <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
        <button className="py-2 px-2 shadow-md bg-red-500 hover:bg-red-600 transition-colors rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-trash"
            width="25"
            height="25"
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

export default Articulo;
