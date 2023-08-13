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
    <section className="w-full">
      <h1 className="bg-black w-full text-white py-5 text-2xl font-bold uppercase text-center mb-8">Altas mediante Excel</h1>
      
      <div className="w-5/6 mx-auto mb-10 rounded-lg overflow-hidden shadow-md">
        <h3 className="bg-neutral-800 text-center font-bold text-white text-xl py-2">Excel Tipos de artículo</h3>
        <form onSubmit={handleEnviarTiposArticulos} className=" flex flex-col justify-around items-center container mx-auto min-h-[150px] bg-neutral-500">
          <input type="file" accept=".xlsx, .xls" onChange={(e) => handleLeer(e, "tipoArticulo")} className="w-1/2 text-lg mx-auto my-3 text-white cursor-pointer" />
          <input type="submit" value="Enviar" className="uppercase font-bold disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed disabled:shadow-none bg-slate-900 text-white hover:bg-slate-700 py-3 w-6/12 mx-auto mb-2 cursor-pointer rounded-xl transition-all shadow-md" />
        </form>
      </div>

      <div className="w-5/6 mx-auto rounded-lg overflow-hidden shadow-md">
        <h3 className="bg-neutral-800 text-center font-bold text-white text-xl py-2">Excel Artículos</h3>
        <form onSubmit={handleEnviarArticulos} className=" flex flex-col justify-around items-center container mx-auto min-h-[150px] bg-neutral-500">
          <input type="file" accept=".xlsx, .xls" onChange={(e) => handleLeer(e, "articulo")} className="w-1/2 text-lg mx-auto my-3 text-white cursor-pointer" />
          <input type="submit" value="Enviar" className="uppercase font-bold disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed disabled:shadow-none bg-slate-900 text-white hover:bg-slate-700 py-3 w-6/12 mx-auto mb-2 cursor-pointer rounded-xl transition-all shadow-md" />
        </form>
      </div>
    </section>
  )
}

export default AltasExcel