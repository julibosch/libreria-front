import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { TipoArticuloProvider } from "./context/TipoArticuloProvider";
import { ArticuloProvider } from "./context/ArticuloProvider";

import AuthLayout from "./layout/AuthLayout";
import InicioLayout from "./layout/InicioLayout";

import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import TipoArticuloPage from "./pages/TipoArticuloPage";
import Proveedores from "./pages/Proveedores";
import ArticuloPage from "./pages/ArticuloPage";
import AltasExcel from "./pages/AltasExcel";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ArticuloProvider>
          <TipoArticuloProvider>
            <Routes>
              <Route>
                <Route path="/" element={<AuthLayout />}>
                  <Route index element={<Login />} />
                </Route>

                <Route path="inicio" element={<InicioLayout />}>
                  <Route index element={<Inicio />} />
                  <Route path="tipos-de-articulo" element={<TipoArticuloPage />} />
                  <Route path="proveedores" element={<Proveedores />} />
                  <Route path="articulos" element={<ArticuloPage />} />
                  <Route path="altas-excel" element={<AltasExcel />} />
                </Route>
              </Route>
            </Routes>
          </TipoArticuloProvider>
        </ArticuloProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
