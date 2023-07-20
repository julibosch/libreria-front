const Formulario = () => {
  return (
    <div className="mx-auto w-1/2 mt-20 bg-slate-50">
      <h2 className="text-2xl uppercase text-center">Alta de productos</h2>

      <form 
        action=""
        className="mt-5"
      >
        <div className="flex flex-col">
          <label htmlFor="nombre">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre del articulo"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="tipoArticulo">
            Tipo de articulo
          </label>
          <input
          id="tipoArticulo"
            type="text"
            placeholder="Tipo de articulo"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="proveedor">
            Proveedor
          </label>
          <input
          id="proveedor"
            type="text"
            placeholder="Nombre del proveedor"
          />
        </div>
      </form>
    </div>
  )
}

export default Formulario