
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "./component/Navbar";
import Draft from "./pages/Draft";
import Write from "./pages/Write";
import { useState } from "react";

function App() {

  const { currentUser } = useSelector((state) => state.user);
  const [select, setSelect] = useState("/")
  
  return (
    <>  
    <div className="flex w-full h-screen">
    {window.location.pathname !== '/login' && window.location.pathname !== '/register' && currentUser && (
          <div className="h-full">
            <Navbar select={select} setSelect={setSelect}/>
          </div>
        )}

        <div className="w-full ">
        <Routes>
        <Route
          path="/"
          element={currentUser ? <Home setSelect={setSelect} /> : <Login />}
        />
        <Route
          path="/write"
          element={currentUser ? <Write setSelect={setSelect} /> : <Login />}
        /> 
        <Route
          path="/draft"
          element={currentUser ? <Draft setSelect={setSelect} /> : <Login />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        

      </Routes>
  
      
        </div>
    </div>

    </>
    
  )
}

export default App