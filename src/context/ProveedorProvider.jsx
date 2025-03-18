import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import clienteAxios from "../config/axios";

const proveedorProvider = createContext();

const ProveedorProvider = ({ children }) => {
  const [proveedores, setProveedores] = useState([]); //Arreglo general
  const [alerta, setAlerta] = useState({}); //Alerta de la tabla
  const [alertaEditar, setAlertaEditar] = useState({}); //Alerta editar
  const [activado, setActivado] = useState(false); //Activa alerta
  const [activadoEditar, setActivadoEditar] = useState(false); //Activa editar
  const [proveedor, setProveedor] = useState({}); //Toma los datos para editar
  const [proveedoresFiltrados, setProveedoresFiltrados] = useState([]); //Arreglo de tipos de articulos filtrados

  const notify = (tipo, mensaje) => {
    if (tipo === "success") {
      toast.success(mensaje);
    }

    if (tipo === "info") {
      toast.info(mensaje);
    }

    if (tipo === "error") {
      toast.error(mensaje);
    }
  };

  //Trae los tipos de articulos apenas se carga el componente.
  useEffect(() => {
    const traerProveedores = async () => {
      try {
        const url = "/admin/proveedor";
        const traerProveedores = await clienteAxios.get(url);
        setProveedores(traerProveedores.data);
        setProveedoresFiltrados(traerProveedores.data);
      } catch (error) {
        setAlerta({
          error: true,
          msg: "Hubo un problema, reinicie la pagina.",
        });
        setTimeout(() => {
          setAlerta({});
        }, 3000);
      }
    };
    traerProveedores();
  }, []);

  useEffect(() => {
    setProveedoresFiltrados(proveedores);
  }, [proveedores]);

  //Crea un nuevo tipo de articulo
  const guardarProveedor = async (descripcion) => {
    const url = "/admin/proveedor";

    try {
      const respuesta = await clienteAxios.post(url, { descripcion });
      console.log(respuesta);

      setProveedores([...proveedores, respuesta.data.proveedor]);

      notify("success", "Proveedor agregado exitosamente!");
    } catch (error) {
      if (error.response.data.msg) {
        setAlerta({
          error: true,
          msg: error.response.data.msg,
        });
        setTimeout(() => {
          setAlerta({});
        }, 3000);
        return;
      }

      setAlerta({
        error: true,
        msg: "Hubo un error, vuelva a intentarlo",
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    }
  };

  const editarProveedor = async ({ id, descripcion }) => {
    const url = `/admin/proveedor/${id}`;

    try {
      const { data } = await clienteAxios.put(url, { descripcion });

      //Actualiza el arreglo de tipos de articulos, el que se edito
      const proveedorActualizado = proveedores.map((proveedor) =>
        proveedor.id == data.proveedor.id ? data.proveedor : proveedor
      );

      setProveedores(proveedorActualizado);

      notify("success", "Proveedor editado exitosamente!");

      setTimeout(() => {
        setActivadoEditar(false);
      }, 1000);
    } catch (error) {
      setAlertaEditar({
        error: true,
        msg: error.response.data.msg,
      });

      setTimeout(() => {
        setAlertaEditar({});
      }, 3000);
    }
  };

  const eliminarProveedor = async (proveedor) => {
    const { id } = proveedor;

    Swal.fire({
      title: "Estas seguro que deseas eliminar el proveedor?",
      text: "No se podran revertir los cambios",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await clienteAxios.delete(`admin/proveedor/${id}`);

          const proveedoresActualizados = proveedores.filter(
            (proveedor) => proveedor.id != id
          );

          setProveedores(proveedoresActualizados);

          notify("info", "Proveedor eliminado exitosamente!");
        } catch (error) {
          console.log(error)
          if (error.response.data.msg) {
            return notify("error", error.response.data.msg);
          }
          return notify("error", error);
        }
      }
    });
  };

  return (
    <proveedorProvider.Provider
      value={{
        proveedores, //Arreglo general
        setProveedores, //Set del arreglo general
        eliminarProveedor, //Funcioin de eliminar tipo articulo
        guardarProveedor, //Funcion de dar de alta
        alerta, //Alerta en guardar tipo
        setAlerta, //Alerta en guardar tipo
        activado, //Activa el dar de alta - el componente
        setActivado, //Activa o desactiva - el componente
        editarProveedor, //Funcion de editar
        activadoEditar, //Activa el editar - el componente
        setActivadoEditar, //Activa o desactiva - el componente
        setProveedor, //Articulo individual que se usa para el editado.
        proveedor, //Articulo individual que se usa para el editado.
        alertaEditar, //Mensaje de alerta en editar
        setAlertaEditar,
        proveedoresFiltrados, //Arreglo de tipos de articulos filtrados
        setProveedoresFiltrados,
      }}
    >
      {children}
    </proveedorProvider.Provider>
  );
};

export { proveedorProvider };

export default ProveedorProvider;
