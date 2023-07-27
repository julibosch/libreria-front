import axios from 'axios';
import { useState } from 'react';

const AltaProvTipo = ({ title, placeholder, setActivado }) => {
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(descripcion === '') {
      return console.log("No hay nada");
    }

    const url = "http://localhost:4000/admin/tipos-de-articulo";

    try {
      const respuesta = await axios.post(url, {descripcion});
      console.log(respuesta.data);
      setActivado(false);
    } catch (error) {
      console.log(error);
    }
  } 

  return (
    <div className="w-full h-screen absolute top-0 left-0 bg-black bg-opacity-70 backdrop-blur-sm">
      <form
        action=""
        className="bg-white rounded-md shadow-md w-1/2 mx-auto my-52 pb-5 overflow-hidden"
        onSubmit={handleSubmit}
      >
        <div className="flex relative">
          <h2 className="w-full bg-slate-300 text-2xl font-bold uppercase text-center py-3 mb-5">
            {title}
          </h2>

          <button 
            className="absolute right-4 top-1 hover:scale-110 transition-all"
            type="button"
            onClick={() => {setActivado(false)}}
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
            onChange={e => setDescripcion(e.target.value)}
            placeholder={placeholder}
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

export default AltaProvTipo;
