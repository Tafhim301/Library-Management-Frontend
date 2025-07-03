import { Outlet } from "react-router"
import Navbar from "./Layout/Navbar/Navbar"

function App() {


  return (
    <>
      <div>
        <Navbar></Navbar>
      </div>
      <main className="p-4" >
        <Outlet></Outlet>
      </main>
    </>

  )
}

export default App
