import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Login";
import InicioLayout from "./layout/InicioLayout";
import Inicio from "./pages/Inicio";


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
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
