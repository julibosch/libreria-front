import TableProvTipo from "../components/TableProvTipo"

const TipoArticulo = () => {
  return (
    <section className="w-4/5">
      <h2 className="bg-black w-full text-white py-5 text-2xl font-bold uppercase text-center mb-8">Tipos de articulo</h2>

      <div className="px-10">
        <TableProvTipo 
          title={"Alta de Tipo de Articulo"}
          placeholder={"Ingrese el Tipo de Articulo"}
        />
      </div>

    </section>
  )
}

export default TipoArticulo