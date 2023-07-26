const Login = () => {
  return (
    <div className="w-1/3 mx-auto bg-slate-300 rounded-lg shadow-md overflow-hidden">
      <p className="text-2xl font-black bg-[#838FFC] py-3 text-slate-950 uppercase text-center">Inicio de Sesión</p>

      <form
        action=""
        className="px-3 py-3 flex flex-col gap-4"
      >
        <div className="flex flex-col mt-3">
          <label
            htmlFor="usuario"
            className="text-slate-950 font-bold uppercase text-md mb-1"
          >
            Usuario
          </label>
          <input
            id="usuario"
            type="text"
            placeholder="Ingresa tu Usuario"
            className="py-1 px-2 text-md rounded-md border border-slate-400 "
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-slate-950 font-bold uppercase text-md mb-1"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Ingresa tu Contraseña"
            className="py-1 px-2 text-md rounded-md border border-slate-400"
          />
        </div>

        <input 
        type="submit" 
        value="Iniciar Sesión" 
        className="mt-10 py-3 bg-[#2d39a8] hover:bg-[#121b6b] cursor-pointer transition-all w-full rounded-md uppercase font-bold text-lg text-slate-50"
        />
      </form>
    </div>
  )
}

export default Login