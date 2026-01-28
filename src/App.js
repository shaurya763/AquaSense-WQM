import { Route, Routes } from "react-router-dom"
import Navbar from "./Navbar"
import Admin from "./pages/Admin"
import Complaint from "./pages/Complaint"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* 🔥 FULL WIDTH PAGE */}
        <Route path="/" element={<Home />} />

        {/* 📦 NORMAL PAGES */}
        <Route
          path="/complaint"
          element={
            <div className="container">
              <Complaint />
            </div>
          }
        />

        <Route
          path="/Login"
          element={
            <div className="container">
              <Login />
            </div>
          }
        />

        <Route
          path="/Register"
          element={
            <div className="container">
              <Register />
            </div>
          }
        />

        <Route
          path="/Admin"
          element={
            <div className="container">
              <Admin />
            </div>
          }
        />
      </Routes>
    </>
  )
}

export default App
