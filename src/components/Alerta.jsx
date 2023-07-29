const Alerta = ({alerta}) => {

  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-700' : 'from-green-500 to-green-700 w-3/4 mx-auto'} bg-gradient-to-br rounded-xl p-3 text-sm text-white text-center my-5 font-bold uppercase`}>
      {alerta.msg}
    </div>
  )
}

export default Alerta;