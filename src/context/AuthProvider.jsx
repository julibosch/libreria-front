import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const login = async (nombre, contrasenia) => {
    try {
      const url = "http://localhost:4000";
      const respuesta = await axios.post(url, { nombre, contrasenia });
      console.log(respuesta);
      
      // Se le cambia el estado de Logueado a true y se navega
      setIsLoggedIn(true)
      navigate("/inicio");
    } catch (error) {
      console.log(error.message);
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
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
