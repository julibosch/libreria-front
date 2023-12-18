import { useState, useContext } from "react";
import AltaProvTipo from "./AltaProvTipo";
import EditarTipo from "./EditarTipo";
import TipoArticulo from "./TipoArticulo";
import tipoProvider from "../context/TipoArticuloProvider";
import HeaderTablaTipoArticulos from "./HeaderTablaTipoArticulos";

const TableProvTipo = ({ title, placeholder, setTipoArticulos }) => {
  const [descripcion, setDescripcion] = useState(""); //Se pasa al componente editar
  const [id, setId] = useState(""); //Se pasa al componente editar
  
  const { 
    tipoArticulos, 
    activado, 
    setActivado, 
    activadoEditar, 
    tipoArticulosFiltrados, 
    setTipoArticulosFiltrados 
  } = useContext(tipoProvider);
  
  const handleAgregar = () => {
    setActivado(true);
  };

  return (
    <div className="container mx-auto bg-slate-800 pb-2 rounded-lg shadow-md">
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <HeaderTablaTipoArticulos 
            setTipoArticulosFiltrados={setTipoArticulosFiltrados} 
            tipoArticulos={tipoArticulos}
            handleAgregar={handleAgregar}
          />

          <div className="px-3 w-full">
            <div className="overflow-x-scroll lg:overflow-x-auto border-0 rounded-lg h-[75vh] overflow-y-scroll">
              <table className="divide-y divide-gray-800 w-full bg-yellow-200">
                <thead className="bg-slate-400">
                  <tr>
                    <th
                      scope="col"
                      className="w-1/12 py-3 text-xs font-black text-center text-gray-950 uppercase"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="w-7/12 py-3 text-xs font-black text-left text-gray-950 uppercase"
                    >
                      Descripcion
                    </th>
                    <th
                      scope="col"
                      className="hidden md:block w-4/12 py-3 ml-32 text-xs font-black text-center text-gray-950 uppercase"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {
                    tipoArticulosFiltrados.length > 0 ? (
                      tipoArticulosFiltrados.map((tipo, index) => (
                        <TipoArticulo
                          key={tipo.id}
                          tipo={tipo}
                          index={index}
                        />
                      ))
                    )
                      : tipoArticulos.length > 0 ?
                        <tr>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">No existen tipos de artículos con esa descripcion</td>
                        </tr>
                        :
                        <tr>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">No hay ningún tipo de artículo, cargue uno</td>
                        </tr>

                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {activado && (
        <AltaProvTipo
          title={title}
          placeholder={placeholder}
          setActivado={setActivado}
          tipoArticulos={tipoArticulos}
          setTipoArticulos={setTipoArticulos}
        />
      )}

      {
        activadoEditar && (
          <EditarTipo
            descripcion={descripcion}
            id={id}
            tipoArticulos={tipoArticulos}
            setTipoArticulos={setTipoArticulos}
          />
        )
      }
    </div>
  );
};

export default TableProvTipo;
