import ButtonCerrarSesion from "./ButtonCerrarSesion";
import ButtonSidebar from "./ButtonSidebar";

const Sidebar = () => {

  return (
    <aside className="pattern h-screen w-1/6 pb-5">
      <h2 className="uppercase text-4xl font-black text-center py-4 mx-3 border-b mb-10 text-slate-100">Piquitos</h2>

      <div className="flex flex-col justify-between h-3/4">
        <nav>
          <ButtonSidebar
            nombre={"Inicio"}
            to={"/inicio"}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-home-2" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#f1f5f9" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
              <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
              <path d="M10 12h4v4h-4z" />
            </svg>}
          />
          <ButtonSidebar
            nombre={"Articulos"}
            to={"/inicio/articulos"}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-apple" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#f1f5f9" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 14m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M12 11v-6a2 2 0 0 1 2 -2h2v1a2 2 0 0 1 -2 2h-2" />
              <path d="M10 10.5c1.333 .667 2.667 .667 4 0" />
            </svg>}
          />
          <ButtonSidebar
            nombre={"Tipos de Articulo"}
            to={"/inicio/tipos-de-articulo"}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-cards" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#f1f5f9" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3.604 7.197l7.138 -3.109a.96 .96 0 0 1 1.27 .527l4.924 11.902a1 1 0 0 1 -.514 1.304l-7.137 3.109a.96 .96 0 0 1 -1.271 -.527l-4.924 -11.903a1 1 0 0 1 .514 -1.304z" />
              <path d="M15 4h1a1 1 0 0 1 1 1v3.5" />
              <path d="M20 6c.264 .112 .52 .217 .768 .315a1 1 0 0 1 .53 1.311l-2.298 5.374" />
            </svg>}
          />
          {/* <ButtonSidebar
            nombre={"Proveedores"}
            to={"/inicio/proveedores"}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-users" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#f1f5f9" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
              <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
            </svg>}
          /> */}
          <ButtonSidebar
            nombre={"Altas Excel"}
            to={"/inicio/altas-excel"}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-import" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#f1f5f9" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M5 13v-8a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-5.5m-9.5 -2h7m-3 -3l3 3l-3 3" />
            </svg>}
          />
        </nav>

        <ButtonCerrarSesion />
      </div>
    </aside>
  )
}

export default Sidebar