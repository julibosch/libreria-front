import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Login";
import InicioLayout from "./layout/InicioLayout";
import Inicio from "./pages/Inicio";
import TipoArticulo from "./pages/TipoArticulo";
import Proveedores from "./pages/Proveedores";


function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}

export default App
