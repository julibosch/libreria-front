import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const ButtonCerrarSesion = () => {
  const { logout } = useContext(AuthContext);

  return (
    <button
      type="button"
      className=" flex uppercase font-bold text-xl items-center gap-2 w-2/3 bg-red-500 hover:bg-red-700 transition-colors cursor-pointer rounded-md px-3 py-2 mx-auto shadow-md"
      onClick={logout}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-logout"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#000000"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
        <path d="M9 12h12l-3 -3" />
        <path d="M18 15l3 -3" />
      </svg>
      Cerrar Sesión
    </button>
  );
};

export default ButtonCerrarSesion;
