const Header = ({title}) => {
  return (
    <header className="py-4 bg-slate-900 shadow-md">
      <h1 className="text-4xl uppercase font-bold text-center text-slate-50">
        {title}
      </h1>
    </header>
  )
}

export default Header