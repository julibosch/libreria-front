const Footer = ({fecha}) => {
  return (
    <footer className="py-1 bg-[#03050e] w-full absolute bottom-0">
      <p className="text-slate-50 text-center uppercase text-sm fira">Todos los derechos reservados &copy; StarkTwo {fecha}</p>
    </footer>
  )
}

export default Footer