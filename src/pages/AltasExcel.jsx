// import LeerExcel from "../components/LeerExcel"
import { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const AltasExcel = () => {

  const [tipoArticulos, setTipoArticulos] = useState([]);
  const [articulos, setArticulos] = useState([]);

  const handleLeer = (e,informacion) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const resultado = XLSX.utils.sheet_to_json(sheet, { raw: true });
        
        if (informacion === "tipoArticulo") {
          setTipoArticulos(resultado);
          console.log("tipo",resultado)
        }else {
          setArticulos(resultado)
          console.log("articulo",articulos)
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleEnviarTiposArticulos = async (e) => {
    e.preventDefault();
    const url = "http://localhost:4000/admin/tipos-de-articulo-excel"
    try {
      const respuesta = await axios.post(url, tipoArticulos);
      console.log(respuesta)
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleEnviarArticulos = async (e) => {
    e.preventDefault();
    console.log(articulos)
  }

  return (
    <section className="w-4/5">
      <h1 className="bg-black w-full text-white py-5 text-2xl font-bold uppercase text-center mb-8">Altas mediante Excel</h1>
      <h3 className="text-center mb-2 font-bold text-white text-2xl">Tipos de artículos</h3>
      <div className="px-10 w-full mb-5">
        <form onSubmit={handleEnviarTiposArticulos} className=" flex flex-col justify-around items-center container mx-auto rounded-lg min-h-[200px] shadow-md bg-neutral-500">
          <input type="file" accept=".xlsx, .xls" onChange={(e) => handleLeer(e, "tipoArticulo")} className="w-1/2 text-xl mx-auto my-3  text-white cursor-pointer" />
          <input type="submit" value="Enviar" className="disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed disabled:shadow-none bg-gray-800 text-white hover:bg-slate-500 py-3 border-2 border-slate-600 my-6 w-6/12 mx-auto cursor-pointer rounded-xl transition-all shadow-md" />
        </form>
      </div>
      <h3 className="text-center mb-2 font-bold text-white text-2xl">Artículos</h3>
      <div className="px-10 w-full">
        <form onSubmit={handleEnviarArticulos} className=" flex flex-col justify-around items-center container mx-auto rounded-lg min-h-[200px] shadow-md bg-neutral-500">
          <input type="file" accept=".xlsx, .xls" onChange={(e) => handleLeer(e, "articulo")} className="w-1/2 text-xl mx-auto my-3  text-white cursor-pointer" />
          <input type="submit" value="Enviar" className="disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed disabled:shadow-none bg-gray-800 text-white hover:bg-slate-500 py-3 border-2 border-slate-600 my-6 w-6/12 mx-auto cursor-pointer rounded-xl transition-all shadow-md" />
        </form>
      </div>
    </section>
  )
}

export default AltasExcel