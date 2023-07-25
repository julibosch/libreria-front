import ButtonCerrarSesion from "./ButtonCerrarSesion";
import ButtonSidebar from "./ButtonSidebar";

const Sidebar = () => {

  return (
    <aside className="bg-slate-800 h-screen w-1/5 py-5">
      <h2 className="uppercase text-4xl font-black text-center mb-10 text-slate-50">Piquitos</h2>

      <div className="flex flex-col justify-between h-3/4">
        <nav>
          <ButtonSidebar
            nombre={"Inicio"}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-home-2" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
              <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
              <path d="M10 12h4v4h-4z" />
            </svg>}
          />
          <ButtonSidebar
            nombre={"Articulos"}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-apple" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 14m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M12 11v-6a2 2 0 0 1 2 -2h2v1a2 2 0 0 1 -2 2h-2" />
              <path d="M10 10.5c1.333 .667 2.667 .667 4 0" />
            </svg>}
          />
          <ButtonSidebar
            nombre={"Tipo de Articulos"}
          />
          <ButtonSidebar
            nombre={"Proveedores"}
          />
        </nav>

        <ButtonCerrarSesion />
      </div>
    </aside>
  )
}

export default Sidebar