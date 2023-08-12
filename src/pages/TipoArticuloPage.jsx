import { useState, useEffect } from "react";
import TableProvTipo from "../components/TableProvTipo";
import Alerta from "../components/Alerta";

const TipoArticuloPage = () => {
  const [alerta, setAlerta] = useState({});

  const { msg } = alerta;

  return (
    <section className="w-full">
      <h2 className="bg-black w-full text-white py-5 text-2xl font-bold uppercase text-center mb-8">
        Tipos de articulo
      </h2>

      <div className="px-10">
      { msg && <Alerta alerta={alerta} /> }
        <TableProvTipo
          title={"Alta de Tipo de Articulo"}
          placeholder={"Ingrese el Tipo de Articulo"}
        />
      </div>
    </section>
  );
};

export default TipoArticuloPage;
