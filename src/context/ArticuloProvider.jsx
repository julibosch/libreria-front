import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const articuloProvider = createContext();

const ArticuloProvider = ({ children }) => {
  const [alertaAlta, setAlertaAlta] = useState({}); //muestra alerta para bien o para mal
  const [activarModal, setActivarModal] = useState(false); //Activa el modal dar de alta.
  const [activarEditar, setActivarEditar] = useState(false); //Activa el modal editar en el componente Articulo
  const [articulo, setArticulo] = useState({}); //Objeto que se usa en el dar de alta articulo
  const [articulos, setArticulos] = useState([]); //Arreglo de todos los articulos

  const [codigo, setCodigo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [codigoBarra, setCodigoBarra] = useState("");
  const [tipoArticulo, setTipoArticulo] = useState("");
  const [stock, setStock] = useState("");
  const [color, setColor] = useState("");

  //Trae todos los articulos
  useEffect(() => {
    const listadoArticulos = async () => {
      try {
        const respuesta = await clienteAxios.get("/admin/articulo");
        setArticulos(respuesta.data);
      } catch (error) {
        console.log(error);
      }
    };
    listadoArticulos();
  }, []);

  //Cuando se actualiza articulo y ademas esta activada la edicion, se setean los valores en los campos asi se muestran en el form.
  useEffect(() => {
    if (activarEditar) {
      const {
        codigo_buscador,
        descripcion,
        precio,
        codigo_barra,
        tipoArticulo,
        stock,
        color,
      } = articulo;
      setCodigo(codigo_buscador);
      setDescripcion(descripcion);
      setPrecio(precio);
      setCodigoBarra(codigo_barra);
      setTipoArticulo(tipoArticulo);
      setStock(stock);
      setColor(color);
    }
  }, [articulo]);

  const guardarArticulo = async () => {
    console.log(`TipoArticulo: ${tipoArticulo}`);
    console.log(articulo);
    return;
    try {
      const respuesta = await clienteAxios.post("/admin/articulo", articulo);

      setArticulos([...articulos, respuesta.data.respuesta]);

      setAlertaAlta({
        error: false,
        msg: "Artículo creado exitosamente",
      });

      setTimeout(() => {
        setAlertaAlta({}); //Borra el mensaje de alerta
        setActivarModal(false); //Desactiva el modal
      }, 3000);

      return setArticulo({}); // borra el objeto de articulos
    } catch (error) {
      console.error(error);
      setAlertaAlta({
        error: true,
        msg: error.message,
      });
      setTimeout(() => {
        setAlertaAlta({});
      }, 2000);
    }
  };

  const editarArticulo = async ({ articulo }) => {
    try {
      const respuesta = await clienteAxios.put(
        `/admin/articulo/${articulo.id}`,
        articulo
      );
      console.log(respuesta);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <articuloProvider.Provider
      value={{
        alertaAlta,
        setAlertaAlta,
        setArticulo,
        guardarArticulo,
        activarModal,
        setActivarModal,
        articulos,
        setArticulos,
        activarEditar,
        setActivarEditar,
        codigo,
        setCodigo,
        descripcion,
        setDescripcion,
        codigoBarra,
        setCodigoBarra,
        stock,
        setStock,
        color,
        setColor,
        tipoArticulo,
        setTipoArticulo,
        precio,
        setPrecio,
        editarArticulo,
      }}
    >
      {children}
    </articuloProvider.Provider>
  );
};

export { ArticuloProvider };

export default articuloProvider;
