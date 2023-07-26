import TableProvTipo from "../components/TableProvTipo"

const Proveedores = () => {
  return (
    <section className="w-4/5">
      <h2 className="bg-black w-full text-white py-5 text-2xl font-bold text-center mb-16">Proveedores</h2>

      <div className="px-10">
        <TableProvTipo />
      </div>

    </section>
  )
}

export default Proveedores