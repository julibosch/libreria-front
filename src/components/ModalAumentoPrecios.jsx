import { useRef, useState } from "react";
import clienteAxios from "../config/axios";
import Swal from 'sweetalert2';

const ModalAumentoPrecios = ({ setActivarAumentoModal, articulos, setArticulos }) => {
  const [descripcionArticulos, setDescripcionArticulos] = useState("");
  const [articulosAgregados, setArticulosAgregados] = useState([]);
  const [incluirIVA, setIncluirIVA] = useState(false);
  const [porcentajeGanancia, setPorcentajeGanancia] = useState(0);
  const [modalCalcularImportes, setModalCalcularImportes] = useState(false);

  const refArticulosOriginales = useRef([]);

  /* CERRAR MODAL */
  const handleCerrar = () => {
    setActivarAumentoModal(false);
  }

  /* Agrega el porcentaje de ganancia al estado */
  const handlePorcentaje = (e) => {
    const porcentaje = Number(e.target.value);

    setPorcentajeGanancia(porcentaje);
  }

  /* Agregar descripcion del articulo que queremos agregar al listado general al state para filtrado */
  const handleSeleccion = (e) => {
    const descripcion = e.target.value;
    setDescripcionArticulos(descripcion.toLowerCase());
  }

  /* Agregar los articulos seleccionados al arreglo general, sin contar los duplicados */
  const handleAgregar = () => {
    const artAgregados = [...articulos].filter(articulo =>
      articulo.descripcion.toLowerCase().includes(descripcionArticulos)  //Crea un arreglo con los objetos filtrados.
    );

    //Convierte una copia del state de articulos agregados, insertando los filtrados recien y transformarlo a
    //una coleccion Set para eliminar los duplicados.
    const articulosSinDuplicar = new Set([...articulosAgregados, ...artAgregados]);

    //Convierto al coleccion Set a un Array normal, para evitar conflictos a la hora de recorrerlo y renderizar.
    const articulosSelecionados = Array.from(articulosSinDuplicar);

    //Seteo el estado general de articulos agregados con el arreglo ya convertido.
    setArticulosAgregados(articulosSelecionados);
    refArticulosOriginales.current = articulosSelecionados;
  }

  /* Quitar un articulo del listado */
  const handleQuitar = (id) => {
    const articulosActualizados = [...articulosAgregados].filter(articulo =>
      articulo.id !== id
    )

    setArticulosAgregados(articulosActualizados);
  }

  /* Abrir modal de aumento de precios */
  const handleCalcularImportes = () => {
    setModalCalcularImportes(true);
    console.log(articulosAgregados);
    let IVA = 0;

    if(incluirIVA) {
      IVA = 21;
    }

    const articulosActualizados = [...articulosAgregados].map(articulo => {
      return {
        ...articulo,
        precio: (Number(articulo.precio) + (Number(articulo.precio) * porcentajeGanancia / 100) + (Number(articulo.precio) * IVA / 100)).toFixed(3)
      }
    });

    setArticulosAgregados(articulosActualizados);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    /* Primero debemos mostrar el modal para calcular los precios */
    Swal.fire({
      title: 'Confirmar el aumento de articulos',
      text: "No podras revertir los cambios",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const url = '/admin/articulo/actualizar-precio';

        try {
          const respuesta = await clienteAxios.post(url, articulosAgregados);

          if (respuesta.status === 200) {
            console.log(articulos);
            console.log(respuesta.data.articulosFront);

            // Crear una copia de los artículos originales
            const articulosCopia = [...articulos];

            // Actualizar los precios de los artículos en la copia
            const articulosActualizados = articulosCopia.map((articulo) => {
              // Busca el artículo correspondiente en la respuesta del servidor
              const articuloActualizado = respuesta.data.articulosFront.find((item) => item.id === articulo.id);

              if (articuloActualizado) {
                // Si se encuentra el artículo en la respuesta, actualiza su precio
                return {
                  ...articulo,
                  precio: articuloActualizado.precio,
                };
              }

              // Si no se encuentra, devuelve el artículo sin cambios
              return articulo;
            });
            // Actualiza el estado de 'articulos' con los artículos actualizados
            setArticulos(articulosActualizados);
          }
        } catch (error) {
          console.log(error);
        }

        //Mensaje de exito al aumentar los precios
        Swal.fire(
          'Confirmado!',
          'Los precios se han aumentado con exito!',
          'success'
        ).then(
          setActivarAumentoModal(false)
        )
      }
    })
  }

  return (
    <div className="absolute w-screen h-screen top-0 left-0 bg-black/70 backdrop-blur-sm">
      <div className="flex w-full h-full place-content-center place-items-center">
        {/* MODAL */}
        <div className="w-4/6">
          <form
            className="bg-white rounded-md shadow-sm pb-5 overflow-hidden"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col">
              <div className={`${modalCalcularImportes ? 'bg-sky-400' : 'bg-green-400 mb-5'} flex justify-between items-center w-full transition-all`}>
                <h2 className="fira flex-grow lg:text-2xl font-bold uppercase text-center px-3 py-3">
                  {modalCalcularImportes ? "Listado de articulos actualizados" : "Aumento de IVA y Ganancia"}
                </h2>

                <button
                  className="hover:scale-110 transition-all pr-3"
                  type="button"
                  onClick={handleCerrar}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-square-rounded-x"
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#000000"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 10l4 4m0 -4l-4 4" />
                    <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex flex-row justify-end w-full">
              {/* INPUTS */}
                <div className={`${modalCalcularImportes ? 'hidden' : 'visible'} mx-4 w-2/5 bg-zinc-300 rounded-md shadow-md overflow-hidden transition-all`}>
                  {/* Search de articulos para aumentar */}
                  <div className="flex flex-col">
                    <p className="fira py-3 mb-3 px-3 text-center text-sm bg-zinc-400 font-semibold">Seleccione los articulos a aumentar</p>
                    <p className="text-xs text-center mb-2 border-b border-zinc-500 pb-1">Primero agregue todos los articulos deseados a la lista</p>
                    <div className="flex my-2 mx-3">
                      <input
                        type="text"
                        name="seleccion"
                        className="w-full bg-slate-50 pl-2 text-sm font-semibold border-2 focus:border-y-teal-600 focus:border-l-teal-600 outline-0 placeholder:text-slate-500 rounded-l-md transition-colors"
                        placeholder="Agregar Articulos al listado..."
                        id="seleccion"
                        onChange={handleSeleccion}
                      />
                      <button
                        type="button"
                        className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors cursor-pointer"
                        onClick={handleAgregar}
                      >
                        Agregar
                      </button>
                    </div>
                  </div>

                  {/* Campos */}
                  <div className="px-3 mt-8 flex flex-col">
                    <p className="text-xs text-center mb-2 border-b border-zinc-500 pb-1">Luego indique la ganancia y el IVA</p>
                    {/* Porcentaje */}
                    <div className="flex gap-2 items-center mb-3">
                      <label className="fira font-semibold text-sm" htmlFor="porcentaje">Porcentaje de Ganancia: %</label>
                      <input onChange={handlePorcentaje} onInput={(e) => { const inputValue = e.target.value; e.target.value = inputValue.replace(/[^0-9]/g, '') }} pattern="[0-9]*" inputMode="numeric" placeholder="Ej: 10" className="border font-semibold border-slate-800 rounded-lg w-14 px-2 py-1" type="text" name="porcentaje" id="porcentaje" />
                    </div>

                    {/* IVA */}
                    <div className="flex gap-2 items-center mb-3">
                      <div className="cntr flex items-center gap-3">
                        <label className="fira font-semibold text-sm" htmlFor="cbx">Incluir IVA?</label>
                        <input type="checkbox" onChange={() => setIncluirIVA(!incluirIVA)} name="cbx" id="cbx" className="hidden-xs-up" />
                        <label htmlFor="cbx" className="cbx"></label>
                      </div>
                    </div>
                    <button
                      type="button"
                      disabled={(articulosAgregados.length > 0 && incluirIVA === true || articulosAgregados.length > 0 && porcentajeGanancia >= 1) ? false : true}
                      className="w-full flex justify-center items-center gap-2 bg-indigo-700 py-2 mt-5 mb-3 rounded-md uppercase font-bold cursor-pointer hover:bg-blue-950 text-white text-center transition-all disabled:bg-zinc-500 disabled:cursor-not-allowed"
                      onClick={handleCalcularImportes}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-calculator" width="35" height="35" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#FFFFFF" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 3m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                        <path d="M8 7m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z" />
                        <path d="M8 14l0 .01" />
                        <path d="M12 14l0 .01" />
                        <path d="M16 14l0 .01" />
                        <path d="M8 17l0 .01" />
                        <path d="M12 17l0 .01" />
                        <path d="M16 17l0 .01" />
                      </svg>
                      Calcular Precios
                    </button>
                  </div>
                </div>

              {/* Listado */}
              <div className={`${modalCalcularImportes ? 'w-full rounded-t-none mx-0' : 'w-3/5 mx-4'} h-[23rem] rounded-md bg-sky-200 shadow-md text-xs overflow-hidden transition-all`}>
                {!modalCalcularImportes &&
                  <p className="fira py-3 px-3 text-center text-sm bg-sky-400 font-semibold">Listado de Articulos seleccionados</p>
                }
                <ul className={`${modalCalcularImportes ? 'h-[23rem]' : 'h-[20rem]'} overflow-y-scroll transition-all`}>
                  {modalCalcularImportes && 
                    <div className="flex px-3 py-2 gap-4 border-b-2 border-zinc-900">
                      <p className="w-1/12 text-center font-black uppercase">Codigo</p>
                      <p className="w-8/12 font-black uppercase">Descripcion</p>
                      <p className="w-3/12 text-center font-black uppercase">Precio Actualizado</p>
                    </div>
                  }
                  {
                    articulosAgregados.length > 0 ? articulosAgregados.map(articulo => (
                      <li className="px-3 fira w-full border-b border-zinc-700 items-center flex gap-4 py-1" key={articulo.id}>
                        <p className="w-1/12 text-center font-semibold">{articulo.codigo_buscador}</p>
                        <p className="w-8/12 font-semibold">{articulo.descripcion}</p>
                        <p className="w-3/12 text-center font-bold">${articulo.precio}</p>
                        <button type="button" onClick={() => handleQuitar(articulo.id)}
                          className={`${modalCalcularImportes ? 'hidden' : 'visible'}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-minus hover:fill-red-300 transition-colors" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="#e93c61" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                            <path d="M9 12l6 0" />
                          </svg>
                        </button>
                      </li>
                    ))
                      :
                      <li className="w-full text-center mt-24">
                        <p className="w-2/3 px-4 py-5 font-semibold uppercase bg-slate-50 mx-auto">Aun no agregó ningún articulo</p>
                      </li>
                  }
                </ul>
              </div>
            </div>
            {modalCalcularImportes &&
              <div className="flex w-full justify-center gap-16 mt-5">
                <button
                  type="submit"
                  className="bg-indigo-700 uppercase text-sm px-5 py-3 rounded-lg shadow-md text-white font-semibold hover:bg-blue-900 transition-colors cursor-pointer"
                >
                  Confirmar
                </button>
                <button
                  type="button"
                  className="bg-rose-600 uppercase text-sm px-5 py-3 rounded-lg shadow-md text-white font-semibold hover:bg-rose-800 transition-colors cursor-pointer"
                  onClick={() => {
                    setModalCalcularImportes(false);
                    setArticulosAgregados(refArticulosOriginales.current);
                  }}
                >
                  volver
                </button>
              </div>
            }
          </form>
        </div>
      </div>
    </div>
  )
}

export default ModalAumentoPrecios