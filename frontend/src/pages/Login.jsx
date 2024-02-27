import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginError, loginStart, loginSuccess } from "../redux/Slice/userSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../services/helper";
import { FaGoogle } from "react-icons/fa6";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const { data } = await axios.post(`${BASE_URL}/api/auth/login`, {
        username: username,
        password: password,
      });
      dispatch(loginSuccess(data.others));
      localStorage.setItem("data", JSON.stringify(data.others));
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      dispatch(loginError());
      console.log(err?.response?.data?.message);
      toast.error(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : "Something went wrong login through google account"
      );
    }
  };

  const google = async (e) => {
    e.preventDefault();
    window.open(`${BASE_URL}/api/auth/google`, "_self");
  };
  return (
    <>
      <div className="flex justify-evenly h-screen w-screen mx-auto">
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
                    value="login"
                  />
                  <Link to="/register">
                    <button className="bg-green-500 w-full h-10 md:w-32 hover:bg-green-700">
                      Sign up
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
