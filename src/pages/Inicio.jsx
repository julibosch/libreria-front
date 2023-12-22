import { useContext, useEffect, useState } from 'react';
import articuloProvider from '../context/ArticuloProvider';
import tipoProvider from '../context/TipoArticuloProvider';

const Inicio = () => {
  const { articulos } = useContext(articuloProvider);
  const { tipoArticulos } = useContext(tipoProvider);

  const [articulosManuales, setArticulosManuales] = useState([]);

  useEffect(() => {
    // Filtrar los artículos creados manualmente
    const articulosManualesFiltrados = articulos.filter(articulo => /[^\d\s]/.test(articulo.codigo_buscador));

    // Actualizar el estado con los artículos manuales
    setArticulosManuales(articulosManualesFiltrados);
  }, [articulos]);

  return (
    <section className="w-full md:w-5/6">
      <h2 className="bg-black w-full text-white py-3 text-2xl uppercase font-bold text-center">Inicio</h2>

      <div className="flex w-full h-[90%]">
        {/* Div de articulos */}
        <div className="flex w-1/2 flex-col justify-center gap-12 px-8">
          {/* Total articulos */}
          <div className={`flex flex-col bg-amber-400 w-5/6 h-fit mx-auto rounded-md shadow-md pb-3 px-3`}>
            <div className='flex justify-start gap-2 items-center py-3'>
              {<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-apple-arcade stroke-amber-950" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M20 12.5v4.75a.734 .734 0 0 1 -.055 .325a.704 .704 0 0 1 -.348 .366l-5.462 2.58a5 5 0 0 1 -4.27 0l-5.462 -2.58a.705 .705 0 0 1 -.401 -.691l0 -4.75" />
                <path d="M4.431 12.216l5.634 -2.332a5.065 5.065 0 0 1 3.87 0l5.634 2.332a.692 .692 0 0 1 .028 1.269l-5.462 2.543a5.064 5.064 0 0 1 -4.27 0l-5.462 -2.543a.691 .691 0 0 1 .028 -1.27z" />
                <path d="M12 7l0 6" />
              </svg>}
              <p className="text-amber-950 font-bold uppercase">Total de Articulos</p>
            </div>
            <div className="bg-amber-300 rounded-2xl">
              <p className="text-amber-950 font-black text-5xl text-center fira py-5">{articulos.length > 0 ? articulos.length : 0}</p>
            </div>
          </div>

          {/* Articulos cargados manualmente */}
          <div className={`flex flex-col bg-rose-400 w-5/6 h-fit mx-auto rounded-md shadow-md pb-3 px-3`}>
            <div className='flex justify-start gap-2 items-center py-3'>
              {<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-apple-arcade stroke-rose-950" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M20 12.5v4.75a.734 .734 0 0 1 -.055 .325a.704 .704 0 0 1 -.348 .366l-5.462 2.58a5 5 0 0 1 -4.27 0l-5.462 -2.58a.705 .705 0 0 1 -.401 -.691l0 -4.75" />
                <path d="M4.431 12.216l5.634 -2.332a5.065 5.065 0 0 1 3.87 0l5.634 2.332a.692 .692 0 0 1 .028 1.269l-5.462 2.543a5.064 5.064 0 0 1 -4.27 0l-5.462 -2.543a.691 .691 0 0 1 .028 -1.27z" />
                <path d="M12 7l0 6" />
              </svg>}
              <p className="text-rose-950 font-bold uppercase">Articulos cargados manualmente</p>
            </div>
            <div className="bg-rose-300 rounded-2xl">
              <p className="text-rose-950 font-black text-5xl text-center fira py-5">{articulosManuales.length > 0 ? articulosManuales.length : 0}</p>
            </div>
          </div>
        </div>

        {/* Div de tipo de articulos */}
        <div className="flex w-1/2 justify-center flex-col px-8">
          {/* Cantidad total de tipos de articulo */}
          <div className={`flex flex-col bg-indigo-400 w-5/6 h-fit mx-auto rounded-md shadow-md pb-3 px-3`}>
            <div className='flex justify-start gap-2 items-center py-3'>
              {<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-apple-arcade stroke-indigo-950" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M20 12.5v4.75a.734 .734 0 0 1 -.055 .325a.704 .704 0 0 1 -.348 .366l-5.462 2.58a5 5 0 0 1 -4.27 0l-5.462 -2.58a.705 .705 0 0 1 -.401 -.691l0 -4.75" />
                <path d="M4.431 12.216l5.634 -2.332a5.065 5.065 0 0 1 3.87 0l5.634 2.332a.692 .692 0 0 1 .028 1.269l-5.462 2.543a5.064 5.064 0 0 1 -4.27 0l-5.462 -2.543a.691 .691 0 0 1 .028 -1.27z" />
                <path d="M12 7l0 6" />
              </svg>}
              <p className="text-indigo-950 font-bold uppercase">Total tipos de articulo</p>
            </div>
            <div className="bg-indigo-300 rounded-2xl">
              <p className="text-indigo-950 font-black text-5xl text-center fira py-5">{tipoArticulos.length > 0 ? tipoArticulos.length : 0}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Inicio