import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { TipoArticuloProvider } from "./context/TipoArticuloProvider";

import AuthLayout from "./layout/AuthLayout";
import InicioLayout from "./layout/InicioLayout";

import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import TipoArticulo from "./pages/TipoArticulo";
import Proveedores from "./pages/Proveedores";
import Articulos from "./pages/Articulos";
import AltasExcel from "./pages/AltasExcel";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TipoArticuloProvider>
          <Routes>
            <Route>
              <Route path="/" element={<AuthLayout />}>
                <Route index element={<Login />} />
              </Route>

              <Route path="inicio" element={<InicioLayout />}>
                <Route index element={<Inicio />} />
                <Route path="tipos-de-articulo" element={<TipoArticulo />} />
                <Route path="proveedores" element={<Proveedores />} />
                <Route path="articulos" element={<Articulos />} />
                <Route path="altas-excel" element={<AltasExcel />} />
              </Route>
            </Route>
          </Routes>
        </TipoArticuloProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
