import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

import AuthLayout from "./layout/AuthLayout";
import InicioLayout from "./layout/InicioLayout";

import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import TipoArticulo from "./pages/TipoArticulo";
import Proveedores from "./pages/Proveedores";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
            </Route>

            <Route path="inicio" element={<InicioLayout />}>
              <Route index element={<Inicio />} />
              <Route path="tipo-de-articulos" element={<TipoArticulo />} />
              <Route path="proveedores" element={<Proveedores />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
