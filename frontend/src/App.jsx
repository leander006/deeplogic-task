
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import DashBoard from "./pages/DashBoard";
import Home from "./pages/Home";

function App() {

  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={currentUser ? <Home /> : <Login />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={currentUser ? <Home  /> : <Login />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />

      </Routes>
    </>
  )
}

export default App
