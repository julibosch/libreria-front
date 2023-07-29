import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usuarioNoExiste, setUsuarioNoExiste] = useState("");

  const navigate = useNavigate();

  const login = async (nombre, contrasenia) => {
    try {
      const url = "http://localhost:4000";
      const respuesta = await axios.post(url, { nombre, contrasenia });
      
      // Se le cambia el estado de Logueado a true y se navega
      setIsLoggedIn(true)
      setUsuarioNoExiste("");
      navigate("/inicio");
    } catch (error) {
      
      setUsuarioNoExiste(error.response.data.msg);
      setTimeout(() => {
        setUsuarioNoExiste('');
      }, 1500);
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
