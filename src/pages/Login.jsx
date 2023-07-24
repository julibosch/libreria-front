const Login = () => {
  return (
    <div className="w-1/3 mx-auto bg-slate-300 rounded-md shadow-lg overflow-hidden">
      <p className="text-2xl font-bold bg-slate-900 py-3 text-slate-50 uppercase text-center">Iniciar Sesión</p>

      <form
        action=""
        className="px-3 py-3 flex flex-col gap-7"
      >
        <div className="flex flex-col mt-3">
          <label
            htmlFor="usuario"
            className="text-slate-950 font-bold uppercase text-xl mb-1"
          >
            Usuario
          </label>
          <input
            type="text"
            className="py-1 px-2 text-lg rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-slate-950 font-bold uppercase text-xl mb-1"
          >
            Contraseña
          </label>
          <input
            type="password"
            className="py-1 px-2 text-lg rounded-md"
          />
        </div>

        <input 
        type="submit" 
        value="Iniciar Sesión" 
        className="mt-3 py-3 bg-slate-600 hover:bg-slate-700 cursor-pointer transition-colors w-full rounded-lg uppercase font-bold text-lg text-slate-50"
        />
      </form>
    </div>
  )
}

export default Login