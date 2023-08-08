import { createContext, useState, useEffect } from 'react';
import axios from "axios";

const tipoProvider = createContext();

const TipoArticuloProvider = ({ children }) => {
  const [tipoArticulos, setTipoArticulos] = useState([]); //Arreglo general
  const [alerta, setAlerta] = useState({}); //Alerta de la tabla 
  const [alertaEditar, setAlertaEditar] = useState({}); //Alerta editar
  const [activado, setActivado] = useState(false); //Activa alerta
  const [activadoEditar, setActivadoEditar] = useState(false); //Activa editar
  const [tipoArticulo, setTipoArticulo] = useState({}); //Toma los datos para editar

  //Trae los tipos de articulos apenas se carga el componente.
  useEffect(() => {
    const traerTipoArticulos = async () => {
      try {
        const url = "http://localhost:4000/admin/tipos-de-articulo";
        const traerTipoArticulos = await axios.get(url);
        setTipoArticulos(traerTipoArticulos.data);
      } catch (error) {
        setAlerta({
          error: true,
          msg: "Hubo un problema, reinicie la pagina."
        });
        setTimeout(() => {
          setAlerta({});
        }, 3000);
      }
    };
    traerTipoArticulos();
  }, []);

  //Crea un nuevo tipo de articulo
  const guardarTipoArticulo = async (descripcion) => {

    const url = "http://localhost:4000/admin/tipos-de-articulo";

    try {
      const respuesta = await axios.post(url, { descripcion });

      setTipoArticulos([...tipoArticulos, respuesta.data.respuesta]);
      setAlerta({
        tipo: false,
        msg: "Tipo de artículo creado exitosamente"
      })

      setTimeout(() => {
        setAlerta({});
      }, 2000);

    } catch (error) {
      setAlerta({
        error: true,
        msg: "Hubo un error, vuelva a intentarlo"
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    }
  };

  const editarTipoArticulo = async ({ id, descripcion }) => {
  
    const url = `http://localhost:4000/admin/tipos-de-articulo/${id}`;

    try {
      const { data } = await axios.put(url, { descripcion });

      //Actualiza el arreglo de tipos de articulos, el que se edito
      const tipoArticuloActualizado = tipoArticulos.map( tipoArticulo => tipoArticulo.id == data.tipo.id ? data.tipo : tipoArticulo);
      
      setTipoArticulos(tipoArticuloActualizado)
      
      setAlertaEditar({
        error: false,
        msg: data.msg,
      });

      setTimeout(() => {
        setAlertaEditar({});
        setActivadoEditar(false);
      }, 1500);

    } catch (error) {

      setAlertaEditar({
        error: true,
        msg: error.response.data.msg,
      });

      setTimeout(() => {
        setAlertaEditar({});
      }, 3000);
    }
  }

  return (
    <tipoProvider.Provider
    value={{
      tipoArticulos, // arreglo general
      guardarTipoArticulo, //Funcion de dar de alta
      alerta, //Alerta en guardar tipo
      setAlerta, //Alerta en guardar tipo
      activado, //Activa el dar de alta - el componente
      setActivado, //Activa o desactiva - el componente
      editarTipoArticulo, //Funcion de editar
      activadoEditar, //Activa el editar - el componente
      setActivadoEditar, //Activa o desactiva - el componente
      setTipoArticulo, //Articulo individual que se usa para el editado.
      tipoArticulo, //Articulo individual que se usa para el editado.
      alertaEditar, //Mensaje de alerta en editar
      setAlertaEditar
    }}
    >
      { children }
    </tipoProvider.Provider>
  )
}

export {
  TipoArticuloProvider
}

export default tipoProvider