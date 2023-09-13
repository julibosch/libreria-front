import { createContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

const articuloProvider = createContext();

const ArticuloProvider = ({ children }) => {
  const [alertaAlta, setAlertaAlta] = useState({}); //muestra alerta para bien o para mal
  const [activarAltaModal, setActivarAltaModal] = useState(false); //Activa el modal dar de alta.
  const [activarEditar, setActivarEditar] = useState(false); //Activa el modal editar en el componente Articulo
  const [articulo, setArticulo] = useState({}); //Objeto que se usa en el dar de alta articulo
  const [articulos, setArticulos] = useState([]); //Arreglo de todos los articulos
  const [articulosFiltrados, setArticulosFiltrados] = useState([]); //Arreglo de articulos filtrados

  const [idArticulo, setIdArticulo] = useState("");
  const [codigo, setCodigo] = useState("");
  const [codigoBarra, setCodigoBarra] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [tipoArticulo, setTipoArticulo] = useState("");
  const [stock, setStock] = useState("");
  const [color, setColor] = useState("");

  const notify = (tipo, mensaje) => {
    if(tipo === "success") {
      toast.success(mensaje)
    }

    if(tipo === "info") {
      toast.info(mensaje)
    }
  }

  //Trae todos los articulos
  useEffect(() => {
    const listadoArticulos = async () => {
      try {
        const respuesta = await clienteAxios.get("/admin/articulo");

        setArticulos(respuesta.data)
      } catch (error) {
        console.log(error);
      }
    };
    listadoArticulos();
    return () => {
      console.log("cargo componente")
    }
  }, []);

  useEffect(() => {
    setArticulosFiltrados(articulos)
  }, [articulos])

  //Cuando se actualiza articulo y ademas esta activada la edicion, se setean los valores en los campos asi se muestran en el form.


  // FUNCION GUARDAR ARTICULO
  const guardarArticulo = async () => {

    try {
      const respuesta = await clienteAxios.post("/admin/articulo", articulo);

      const { id, codigo_buscador, descripcion, precio, codigo_barra, stock, color } = respuesta.data.respuesta

      const nuevoArticulo = {
        id,
        codigo_buscador,
        descripcion,
        precio,
        codigo_barra,
        stock,
        color,
        tipoArticulo: respuesta.data.descripcionTipoArticulo
      }

      setArticulos([...articulos, nuevoArticulo]);

      notify("success", "Articulo agregado exitosamente!");

      setTimeout(() => {
        handleCerrar();  //Resetea todos los states y cierra el modal que este abierto, ya sea alta o edit.
      }, 1500);

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

  // FUNCION EDITAR ARTICULO
  const editarArticulo = async (articulo) => {
    console.log(codigo)
    try {
      const respuesta = await clienteAxios.put(
        `/admin/articulo/${codigo}`,
        articulo
      );
        console.log(respuesta)
        return
      //Variable que tiene el numero 1 si la edicion fue correcta o 0 si no se modificaron campos
      const exito = respuesta.data.respuesta[0];

      //Si se modifico con exito el articulo
      if (exito == 1) {
        //Articulo actualizado que viene desde el back
        const articuloActualizado = respuesta.data.articuloActualizado;

        //Creo un arreglo nuevo a partir del general, pero reemplazo el articulo por el modificado a partir de su id
        const articulosActualizados = articulos.map(articuloArreglo => articuloArreglo.id === articuloActualizado.id ? articuloActualizado : articuloArreglo);

        setArticulos(articulosActualizados);

        notify("success", "Articulo editado exitosamente!");
      } else {
        setAlertaAlta({
          error: true,
          msg: respuesta.data.msg,
        });
      }

      setTimeout(() => {
        setAlertaAlta({}); //Borra el mensaje de alerta.
        handleCerrar();  //Resetea todos los states y cierra el modal que este abierto, ya sea alta o edit.
      }, 2000);
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

  const eliminarArticulo = async (articuloProp) => {
    Swal.fire({
      title: 'Estas seguro que deseas eliminar el articulo?',
      text: "No se podran revertir los cambios",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { id } = articuloProp;
          const respuesta = await clienteAxios.delete(`admin/articulo/${id}`);
  
          if (respuesta.data.respuesta == 1) {
            const articulosActualizados = articulos.filter(articulo => articulo.id != id);
            setArticulos(articulosActualizados);
  
            notify("info", "Articulo eliminado exitosamente!")
          }
  
        } catch (error) {
          notify("error", error);
        }
      }
    })
  }

  const handleCerrar = () => {
    setActivarAltaModal(false);
    setActivarEditar(false);
    setArticulo({});
    setCodigo("");
    setDescripcion("");
    setCodigoBarra("");
    setStock("");
    setColor("");
    setTipoArticulo("");
    setPrecio("");
    setIdArticulo("");
  };

  return (
    <articuloProvider.Provider
      value={{
        alertaAlta,
        setAlertaAlta,
        articulo,
        setArticulo,
        guardarArticulo,
        activarAltaModal,
        setActivarAltaModal,
        articulos,
        articulosFiltrados,
        setArticulos,
        setArticulosFiltrados,
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
        idArticulo,
        setIdArticulo,
        editarArticulo,
        eliminarArticulo,
        handleCerrar
      }}
    >
      {children}
    </articuloProvider.Provider>
  );
};

export { ArticuloProvider };

export default articuloProvider;
