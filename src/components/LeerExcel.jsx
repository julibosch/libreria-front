import { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const LeerExcel = () => {
  const [excelData, setExcelData] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(sheet, { raw: true });
        setExcelData(excelData);
        console.log(excelData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleEnviar = async (e) => {
    e.preventDefault();
    const url = "http://localhost:4000/admin/tipos-de-articulo-excel"
    try {
      const respuesta = await axios.post(url, excelData);
      console.log(respuesta)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleEnviar} className="flex flex-col justify-center">
      <h1>Leer excelData</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <input type="submit" value="Enviar" className="w-2/3 px-10 py-5 mt-5 bg-emerald-700 text-white cursor-pointer hover:bg-green-500 transition-all" />
    </form>
  );
};

export default LeerExcel;
