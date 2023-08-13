import {Link, useMatch} from 'react-router-dom';

const ButtonSidebar = ({nombre, to, icon}) => {

  const isActive = useMatch(to);

  return (
    <Link
    to={to}
    className={`flex items-center gap-2 w-full text-slate-100 hover:bg-indigo-400 hover:bg-opacity-10 transition-all cursor-pointer uppercase font-bold text-left text-md px-2 py-3 ${
      isActive ? 'bg-indigo-500 gap-4 bg-opacity-30 hover:!bg-indigo-500 hover:!bg-opacity-30 border-l-[6px] border-indigo-200' : ''
    }`}
  >
    {icon}
    {nombre}
  </Link>
  )
}

export default ButtonSidebar