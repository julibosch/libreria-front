import { ToastContainer } from 'react-toastify';
import TableProvTipo from "../components/TableProvTipo";

const TipoArticuloPage = () => {
  return (
    <section className="w-5/6">
      <h2 className="bg-black w-full text-white py-3 text-2xl font-bold uppercase text-center mb-2">
        Tipos de articulo
      </h2>

      <div className="px-10">
        <TableProvTipo
          title={"Alta de Tipo de Articulo"}
          placeholder={"Ingrese el Tipo de Articulo"}
        />
      </div>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </section>
  );
};

export default TipoArticuloPage;
