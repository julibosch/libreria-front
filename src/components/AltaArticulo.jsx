import { useState, useEffect, useContext } from "react";
import Alerta from "./Alerta";
import tipoProvider from "../context/TipoArticuloProvider";
import articuloProvider from "../context/ArticuloProvider";

const AltaArticulo = ({ setActivado }) => {
  const [codigo, setCodigo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [codigoBarra, setCodigoBarra] = useState("");
  const [tipoArticulo, setTipoArticulo] = useState("");
  const [stock, setStock] = useState("");
  const [color, setColor] = useState("");

  const { tipoArticulos } = useContext(tipoProvider); //Este context es el de tipo de articulos, reutilizamos la funcion que trae los tipos de articulos
  const { alertaAlta, setAlertaAlta, setArticulo, guardarArticulo } = useContext(articuloProvider);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([codigo, descripcion, precio, codigoBarra, tipoArticulo, stock, color].includes("")) {

      setAlertaAlta({
        error: true,
        msg: "Debe rellenar todos los campos",
      });

      setTimeout(() => {
        setAlertaAlta({});
      }, 3000);
      return;
    }

    //setArticulo y guardarArticulo se llaman desde el context. SetArticulo guarda el objeto del form y guardar manda la info al back
    setArticulo({ codigo, descripcion, precio, codigoBarra, tipoArticulo, stock, color, });

    guardarArticulo();
  };

  const { msg } = alertaAlta;

  return (
    <div className="w-full h-screen absolute top-0 left-0 bg-black bg-opacity-70 backdrop-blur-sm">
      <form
        action=""
        className="bg-white rounded-md shadow-md w-1/2 mx-auto my-16 pb-5 overflow-hidden"
        onSubmit={handleSubmit}
      >
        <div className="flex relative">
          <h2 className="w-full bg-slate-300 text-2xl font-bold uppercase text-center py-3 mb-5">
            Alta artículo
          </h2>

          <button
            className="absolute right-4 top-1 hover:scale-110 transition-all"
            type="button"
            onClick={() => setActivado(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-square-rounded-x"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#2c3e50"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10l4 4m0 -4l-4 4" />
              <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col px-5">
          {msg && <Alerta alerta={alertaAlta} />}
          <label htmlFor="codigo" className="text-xl font-bold uppercase mb-1">
            Código
          </label>
          <input
            id="codigo"
            type="number"
            className="border border-slate-600 rounded-md py-1 px-3 mb-5"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Codigo"
          />
        </div>
        <div className="flex flex-col px-5">
          <label
            htmlFor="descripcion"
            className="text-xl font-bold uppercase mb-1"
          >
            Descripción
          </label>
          <input
            id="descripcion"
            type="text"
            className="border border-slate-600 rounded-md py-1 px-3 mb-10"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción"
          />
        </div>
        <div className="flex flex-col px-5">
          <label htmlFor="precio" className="text-xl font-bold uppercase mb-1">
            Precio
          </label>
          <input
            id="precio"
            type="number"
            className="border border-slate-600 rounded-md py-1 px-3 mb-10"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Precio"
          />
        </div>
        <div className="flex flex-col px-5">
          <label
            htmlFor="codigoBarra"
            className="text-xl font-bold uppercase mb-1"
          >
            codigo de barra
          </label>
          <input
            id="codigoBarra"
            type="number"
            className="border border-slate-600 rounded-md py-1 px-3 mb-10"
            value={codigoBarra}
            onChange={(e) => setCodigoBarra(e.target.value)}
            placeholder="codigoBarra"
          />
        </div>
        <div className="flex flex-col px-5">
          <label
            htmlFor="tipoArticulo"
            className="text-xl font-bold uppercase mb-1"
          >
            Tipo de artículo
          </label>
          <select
            id="tipoArticulo"
            value={tipoArticulo}
            onChange={(e) => setTipoArticulo(e.target.value)}
            className="border border-slate-600 rounded-md py-1 px-3 mb-10"
          >
          <option value="">Seleccione uno</option>
            {tipoArticulos.length > 0 ? (
              tipoArticulos.map((tipo) => (
                <option value={tipo.descripcion} key={tipo.id}>
                  {tipo.descripcion}
                </option>
              ))
            ) : (
              <option value="">
                No existen tipos de artículos, da de alta uno
              </option>
            )}
          </select>
        </div>
        <div className="flex flex-col px-5">
          <label htmlFor="stock" className="text-xl font-bold uppercase mb-1">
            Stock
          </label>
          <input
            id="stock"
            type="number"
            className="border border-slate-600 rounded-md py-1 px-3 mb-10"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="stock"
          />
        </div>
        <div className="flex flex-col px-5">
          <label htmlFor="color" className="text-xl font-bold uppercase mb-1">
            color
          </label>
          <input
            id="color"
            type="text"
            className="border border-slate-600 rounded-md py-1 px-3 mb-10"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="color"
          />
        </div>

        <div className="w-full px-5">
          <input
            type="submit"
            value="Agregar"
            className="w-full bg-indigo-700 py-2 rounded-md uppercase font-bold cursor-pointer hover:bg-indigo-900 text-white transition-colors"
          />
        </div>
      </form>
    </div>
  );
};

export default AltaArticulo;
