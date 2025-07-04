import { Outlet } from "react-router"
import Navbar from "./Layout/Navbar/Navbar"
import Footer from "./Layout/Footer/Footer"



function App() {





  return (
    <>
      <div>
        <Navbar></Navbar>
      </div>

      <main className="p-4" >
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </>

  )
}

export default App
