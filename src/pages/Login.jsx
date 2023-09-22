import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import Alerta from "../components/Alerta";

const Login = () => {
  const [nombre, setNombre] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [alerta, setAlerta] = useState({});
  const { login, usuarioNoExiste } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, contrasenia].includes("")) {
      setAlerta({
        msg: "Ambos campos son obligatorios",
        error: true,
      });

      setTimeout(() => {
        setAlerta({});
      }, 1500);
      
      return;
    }

    login(nombre, contrasenia);
  };

  //Si el catch del context devuelve un error del que usuario no existe , entra aca.
  useEffect(() => {
    if (usuarioNoExiste) {
      setAlerta({
        msg: usuarioNoExiste,
        error: true,
      });
    } else {
      setAlerta({}); // Restablecer la alerta cuando no hay error
    }
  }, [usuarioNoExiste]);

  const { msg } = alerta;

  return (
    <div className="md:w-1/3 w-3/4 mx-auto bg-slate-300 rounded-lg shadow-md overflow-hidden">
      <p className="text-2xl font-black bg-[#838FFC] py-3 text-slate-950 uppercase text-center">
        Inicio de Sesión
      </p>

      <form
        onSubmit={handleSubmit}
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
            autoComplete="username"
            type="text"
            placeholder="Ingresa tu Usuario"
            className="py-1 px-2 text-md rounded-md border border-slate-400 "
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
            autoComplete="current-password"
            type="password"
            placeholder="Ingresa tu Contraseña"
            className="py-1 px-2 text-md rounded-md border border-slate-400"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
          />
        </div>

        {msg && <Alerta alerta={alerta} />}

        <input
          type="submit"
          value="Iniciar Sesión"
          className=" py-3 bg-[#2d39a8] hover:bg-[#121b6b] cursor-pointer transition-all w-full rounded-md uppercase font-bold text-lg text-slate-50"
        />
      </form>
    </div>
  );
};

export default Login;
