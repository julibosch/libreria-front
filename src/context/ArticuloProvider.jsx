import { createContext, useState, useEffect } from 'react';
import clienteAxios from '../config/axios';

const articuloProvider = createContext();

const ArticuloProvider = ({ children }) => {
  const [alertaAlta, setAlertaAlta] = useState({}); //muestra alerta para bien o para mal
  const [activarModal, setActivarModal] = useState(false);
  const [articulo, setArticulo] = useState({}); //Objeto que se usa en el dar de alta articulo
  const [articulos, setArticulos] = useState([]); //Arreglo de todos los articulos

  //Trae todos los articulos
  useEffect(() => {
    const listadoArticulos = async () => {
      try {
        const respuesta = await clienteAxios.get("/admin/articulo");
        setArticulos(respuesta.data)
        console.log(articulos)
      } catch (error) {
        console.log(error)
      }
    }
    listadoArticulos();
  }, [])
  

  const guardarArticulo = async () => {
    try {
      const respuesta = await clienteAxios.post("/admin/articulo",articulo);

      setAlertaAlta({
        error: false,
        msg: "Artículo creado exitosamente"
      });
      
      setTimeout(() => {
        setAlertaAlta({}); //Borra el mensaje de alerta
        setActivarModal(false); //Desactiva el modal
      }, 3000);

      setArticulo({}); // borra el objeto de articulos
      return;
    } catch (error) {
      console.log(error)
      setAlertaAlta({
        error: true,
        msg: error.message
      })
    }
  }

  return (
   <articuloProvider.Provider
    value={{
      alertaAlta,
      setAlertaAlta,
      setArticulo,
      guardarArticulo,
      activarModal,
      setActivarModal,
      articulos
    }}
   >
    {children}
   </articuloProvider.Provider>
  )
}

export{
  ArticuloProvider
}

export default articuloProvider