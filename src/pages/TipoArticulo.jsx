import { useState, useEffect } from "react";
import TableProvTipo from "../components/TableProvTipo";
import axios from "axios";

const TipoArticulo = () => {
  const [tipoArticulos, setTipoArticulos] = useState([]);

  useEffect(() => {
    const traerTipoArticulos = async () => {
      const url = "http://localhost:4000/admin/tipos-de-articulo";
      const traerTipoArticulos = await axios.get(url);
      setTipoArticulos(traerTipoArticulos.data);
    };
    traerTipoArticulos();
  }, []);

  return (
    <section className="w-4/5">
      <h2 className="bg-black w-full text-white py-5 text-2xl font-bold uppercase text-center mb-8">
        Tipos de articulo
      </h2>

      <div className="px-10">
        <TableProvTipo
          title={"Alta de Tipo de Articulo"}
          placeholder={"Ingrese el Tipo de Articulo"}
          tipoArticulos={tipoArticulos}
          setTipoArticulos={setTipoArticulos}
        />
      </div>
    </section>
  );
};

export default TipoArticulo;
