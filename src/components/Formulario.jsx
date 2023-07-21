const Formulario = () => {
  return (
    <div className="mx-auto w-1/3 mt-12 bg-slate-50 shadow-md rounded-md px-3 pb-5">
      <h2 className="text-2xl uppercase text-center py-5 font-bold border-b mb-5">Alta de articulo</h2>

      <form
        action=""
      >
        <div className="flex flex-col mb-5">
          <label htmlFor="tipoArticulo" className="uppercase text-sm font-semibold">
            Tipo de articulo
          </label>
          <input
            id="tipoArticulo"
            type="text"
            placeholder="Tipo de articulo"
            className="border-2 py-2 px-1 rounded-md"
          />
        </div>

        <div className="flex flex-col mb-5">
          <label htmlFor="nombre" className="uppercase text-sm font-semibold">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre del articulo"
            className="border-2 py-2 px-1 rounded-md"
          />
        </div>

        <div className="flex flex-col mb-5">
          <label htmlFor="proveedor" className="uppercase text-sm font-semibold">
            Proveedor
          </label>
          <input
            id="proveedor"
            type="text"
            placeholder="Nombre del proveedor"
            className="border-2 py-2 px-1 rounded-md"
          />
        </div>

        <input
          type="submit"
          value="Añadir Producto"
          className="bg-indigo-800 hover:bg-indigo-950 uppercase text-slate-50 w-full py-2 cursor-pointer transition-colors rounded-lg"
        />
      </form>
    </div>
  )
}

export default Formulario