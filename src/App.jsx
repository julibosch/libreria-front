import Header from "./components/Header"
import Sidebar from "./components/Sidebar"

function App() {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="w-full">
        <Header
          title={"Inicio"}
        />
      </div>
    </div>
  )
}

export default App
