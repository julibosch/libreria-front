const Sidebar = () => {
  return (
    <aside className="h-screen bg-slate-950 w-1/5 fira flex flex-col justify-between">
      <h1 className="fira block uppercase font-bold text-slate-50 text-3xl text-center py-5 border-b border-slate-300">
        Piquitos
      </h1>

      <div className="flex flex-col">
        <a href="#" className="px-2 py-3 bg-slate-500 uppercase text-slate-950 font-bold hover:bg-slate-400 transition-colors">
          Inicio
        </a>
        <a href="#" className="px-2 py-3 bg-slate-500 uppercase text-slate-950 font-bold hover:bg-slate-400 transition-colors">
          Alta de Articulo
        </a>
        <a href="#" className="px-2 py-3 bg-slate-500 uppercase text-slate-950 font-bold hover:bg-slate-400 transition-colors">
          Graficos
        </a>
        <a href="#" className="px-2 py-3 bg-slate-500 uppercase text-slate-950 font-bold hover:bg-slate-400 transition-colors">
          Stock
        </a>
      </div>

      <button className="mb-16 py-2 px-4 bg-red-400 hover:bg-red-500 w-2/3 mx-auto shadow-md rounded-sm uppercase font-semibold">
        Cerrar Sesion
      </button>
    </aside>
  )
}

export default Sidebar