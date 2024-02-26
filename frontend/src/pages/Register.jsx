import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../services/helper";
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_URL}/api/auth/register`, {
        username,
        password,
        email,
      });
      toast.success("An email send for verification");
      setPassword("");
      setEmail("");
      setUsername("");
      navigate("/login")
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  const google = (e) => {
    e.preventDefault();
    window.open(`${BASE_URL}/api/auth/google/callback`, "_self");
  };
  return (
    <>
      <div className="flex justify-evenly h-screen w-screen mx-auto">
        {/* <div className="hidden md:flex m-auto flex-1">
          <img src="/images/register.jpeg" alt="register" />
        </div> */}
        <div className="flex flex-1 justify-center items-center ">
          <div className="flex w-[91vw] text-green-500 bg-gray-800 rounded-lg lg:w-[400px]  md:w-[300px] md:justify-center">
            <div className="flex flex-col w-full p-5">
              <h1 className="text-xl md:mb-3">Login</h1>
              <form
                className="flex justify-center flex-col item-center mt-4"
                onSubmit={handleSubmit}
              >
                <label className="mb-2">Username</label>
                <input
                  className="w-full mb-3 h-12 focus:outline-none rounded-md p-3 md:mb-8  border border-black"
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  required
                />
                <label className="mb-2">Email</label>
                <input
                  className="w-full mb-3 h-12 focus:outline-none rounded-md p-3 md:mb-8  border border-black"
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  required
                />
                <label className="mb-2">Password</label>
                <input
                  className="w-full h-12 mb-4 focus:outline-none rounded-md p-3 md:mb-8  border border-black"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                />
                <div className="md:flex text-white md:justify-evenly">
                  <input
                    type="submit"
                    className="bg-green-500 mb-2 cursor-pointer w-full md:w-32 h-10 md:mr-2 hover:bg-green-700"
                    value="Sign up"
                  />
                  <Link to="/login">
                    <button className="bg-green-500 w-full h-10 md:w-32 hover:bg-green-700">
                     Login
                    </button>
                  </Link>
                </div>
              </form>
              <h1 className="text-center my-2 text-slate-500">
                --------or--------
              </h1>
              <div className=" bg-green-500 text-white flex rounded-lg hover:bg-green-700 hover:border ">
                <i className="fa-brands text-[#b4c1db] fa-2xl fa-google-plus-g m-auto pl-2"></i>
                <button className=" w-full h-10" onClick={google}>
                  Sign up with google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
