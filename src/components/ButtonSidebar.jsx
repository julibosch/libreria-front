import {useNavigate} from 'react-router-dom'

const ButtonSidebar = ({nombre, icon}) => {

  const navigate = useNavigate();

  const handleClick = () => {
    const url = `${nombre.trim()}`
    navigate(url)
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 w-full bg-slate-500 hover:bg-slate-300 transition-colors cursor-pointer uppercase font-bold text-left text-lg px-2 py-3"
    >
      {icon}
      {nombre}
    </button>
  )
}

export default ButtonSidebar