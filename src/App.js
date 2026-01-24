import { Route, Routes } from "react-router-dom"
import Navbar from "./Navbar"
import About from "./pages/About"
import Admin from "./pages/Admin"
import Complaint from "./pages/Complaint"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import StayAware from "./pages/StayAware"

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
          path="/StayAware"
          element={
            <div className="container">
              <StayAware />
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

        <Route
          path="/about"
          element={
            <div className="container">
              <About />
            </div>
          }
        />
      </Routes>
    </>
  )
}

export default App
