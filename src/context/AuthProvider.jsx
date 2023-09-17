import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usuarioNoExiste, setUsuarioNoExiste] = useState("");

  const navigate = useNavigate();

  const login = async (nombre, contrasenia) => {
    try {
      // const url = "http://localhost:4000";
      const respuesta = await clienteAxios.post("/login", { nombre, contrasenia });

      if(respuesta.data) {
        if(respuesta.data.contrasenia != contrasenia) {
          setUsuarioNoExiste("La contraseña no coincide");

          setTimeout(() => {
            setUsuarioNoExiste('')
          }, 2000);
          return;
        }
        
        // Se le cambia el estado de Logueado a true y se navega
        setIsLoggedIn(true)
        setUsuarioNoExiste("");
        navigate("/inicio");
      } else {
        setUsuarioNoExiste("El usuario no existe");
        
        setTimeout(() => {
          setUsuarioNoExiste('')
        }, 2000);
        return;
      }
    } catch (error) {
      console.log(error)
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    navigate('/');
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        usuarioNoExiste
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
