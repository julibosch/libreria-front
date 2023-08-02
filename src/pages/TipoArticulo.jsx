import { useState, useEffect } from "react";
import TableProvTipo from "../components/TableProvTipo";
import axios from "axios";
import Alerta from "../components/Alerta";

const TipoArticulo = () => {
  const [tipoArticulos, setTipoArticulos] = useState([]);
  const [alerta, setAlerta] = useState({});

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

  const { msg } = alerta;

  return (
    <section className="w-4/5">
      <h2 className="bg-black w-full text-white py-5 text-2xl font-bold uppercase text-center mb-8">
        Tipos de articulo
      </h2>

      <div className="px-10">
      { msg && <Alerta alerta={alerta} /> }
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
