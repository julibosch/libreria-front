// import { useContext } from "react";
// import articuloProvider from "../context/ArticuloProvider";

// const TablaVirtual = ({ data }) => {

//   const {
//     setActivarEditar,
//     setCodigo,
//     setDescripcion,
//     setCodigoBarra,
//     setStock,
//     setColor,
//     setTipoArticulo,
//     setPrecio,
//     setIdArticulo,
//     eliminarArticulo
//   } = useContext(articuloProvider);

//   //Esta funcion activa el modal de EDITAR y llena los estados para que se complete el formulario
//   const handleEditar = () => {
//     setActivarEditar(true);
//     setCodigo(articuloProp.codigo_buscador);
//     setDescripcion(articuloProp.descripcion);
//     setCodigoBarra(articuloProp.codigo_barra);
//     setStock(articuloProp.stock);
//     setColor(articuloProp.color);
//     setTipoArticulo(articuloProp.tipoArticulo);
//     setPrecio(articuloProp.precio);
//     setIdArticulo(articuloProp.id);
//   };


//   return (
//     <List
//       width={300}
//       height={400}
//       rowCount={data.length}
//       rowHeight={50}
//       rowRenderer={({ key, index, style }) => (
//         <tr className={index % 2 === 0 ? 'bg-zinc-300' : 'bg-zinc-200'}>
//       <td className="text-sm font-semibold text-center text-gray-900">
//         {data[index].codigo_buscador}
//       </td>
//       <td className="text-xs pr-3 font-semibold text-gray-900">
//         {data[index].descripcion}
//       </td>
//       <td className="text-sm pr-3 font-sans font-bold text-gray-950">
//         ${data[index].precio}
//       </td>
//       <td className="text-sm pr-3 font-semibold text-center text-gray-900">
//         {data[index].codigo_barra}
//       </td>
//       <td className="text-xs px-2 font-semibold text-center text-gray-900">
//         {data[index].tipoArticulo}
//       </td>
//       <td className="text-sm text-center font-semibold text-gray-900">
//         {data[index].stock}
//       </td>
//       <td className="text-xs text-center font-semibold text-gray-900">
//         {data[index].color}
//       </td>

//       {/* EDITAR */}
//       <td className="text-sm font-medium text-center whitespace-nowrap flex py-2 pr-1 justify-around">
//         <button
//           className="py-2 px-2 shadow-md bg-indigo-400 hover:bg-indigo-600 transition-colors rounded-full"
//           onClick={() => handleEditar()}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="icon icon-tabler icon-tabler-edit"
//             width="18"
//             height="18"
//             viewBox="0 0 24 24"
//             strokeWidth="1.5"
//             stroke="#000000"
//             fill="none"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//             <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
//             <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
//             <path d="M16 5l3 3" />
//           </svg>
//         </button>


//       {/* ELIMINAR */}
      
//         <button onClick={() => eliminarArticulo(data[index])} className="py-2 px-2 shadow-md bg-red-500 hover:bg-red-600 transition-colors rounded-full">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="icon icon-tabler icon-tabler-trash"
//             width="18"
//             height="18"
//             viewBox="0 0 24 24"
//             strokeWidth="1.5"
//             stroke="#000000"
//             fill="none"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//             <path d="M4 7l16 0" />
//             <path d="M10 11l0 6" />
//             <path d="M14 11l0 6" />
//             <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
//             <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
//           </svg>
//         </button>
//       </td>
//     </tr>
//       )}
//     />
//   );
// };

// export default TablaVirtual;