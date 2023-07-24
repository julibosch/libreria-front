const Alta = () => {
  return (
    <div className="w-1/2 bg-white rounded-md shadow-md h-1/2 mx-auto my-auto overflow-hidden">
      <h2 className="bg-slate-300 text-3xl font-bold uppercase text-center py-3">
        Alta
      </h2>

      <form
        action=""
        className="mt-10 px-3"
      >
        <div className="flex flex-col">
          <label
            htmlFor="descripcion"
            className="text-xl font-bold uppercase mb-1"
          >
            Descripción
          </label>
          <input
            id="descripcion"
            type="text"
            className="border border-slate-600 rounded-md py-1 px-2 mb-10"
            placeholder="Ingrese el Proveedor"
          />
        </div>

        <input
          type="submit"
          value="Añadir Proveedor"
          className="w-full bg-indigo-700 py-2 rounded-md uppercase font-bold cursor-pointer hover:bg-indigo-900 text-white transition-colors"
        />
      </form>
    </div>
  )
}

export default Alta