import { ToastContainer } from 'react-toastify';
import TableProvTipo from "../components/TableProvTipo";
import TableProveedores from '../components/TableProveedores';

const Proveedor = () => {
  return (
    <section className="w-full md:w-5/6">
      <h2 className="bg-black w-full text-white py-3 text-2xl font-bold uppercase text-center mb-2">
        Proveedores
      </h2>

      <div className="p-2 md:px-10">
        <TableProveedores
          title={"Alta de Proveedores"}
          placeholder={"Ingrese el Proveedor"}
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

export default Proveedor;
