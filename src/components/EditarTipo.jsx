import { useState } from "react";
import axios from "axios";
import Alerta from "./Alerta";

const EditarTipo = ({ setActivadoEditar, descripcion, id }) => {
  const [descripcionEditar, setDescripcionEditar] = useState(descripcion); //Recibe la descripcion del padre y la muestra en el input
  const [idEditar, setIdEditar] = useState(id);
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (descripcionEditar === "") {
      setAlerta({
        msg: "Debe rellenar el campo",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }

    const url = `http://localhost:4000/admin/tipos-de-articulo/${idEditar}`;

    try {
      const response = await axios.put(url,{descripcionEditar});
      
    } catch (error) {
      setAlerta({
        error: true,
        msg: "Hubo un error, vuelva a intentarlo",
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    }
  };

  const { msg } = alerta;

  return (
    <div className="w-full h-screen absolute top-0 left-0 bg-black bg-opacity-70 backdrop-blur-sm">
      <form
        action=""
        className="bg-white rounded-md shadow-md w-1/2 mx-auto my-52 pb-5 overflow-hidden"
        onSubmit={handleSubmit}
      >
        <div className="flex relative">
          <h2 className="w-full bg-slate-300 text-2xl font-bold uppercase text-center py-3 mb-5">
            Editar tipo de artículo
          </h2>

          <button
            className="absolute right-4 top-1 hover:scale-110 transition-all"
            type="button"
            onClick={() => {
              setActivadoEditar(false);
            }}
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
          {msg && <Alerta alerta={alerta} />}
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
            value={descripcionEditar}
            onChange={(e) => setDescripcionEditar(e.target.value)}
            placeholder="Descripción"
          />
          <input
            type="text"
            className="hidden"
            value={id}
          />
        </div>

        <div className="w-full px-5">
          <input
            type="submit"
            value="Editar"
            className="w-full bg-indigo-700 py-2 rounded-md uppercase font-bold cursor-pointer hover:bg-indigo-900 text-white transition-colors"
          />
        </div>
      </form>
    </div>
  );
};

export default EditarTipo;
