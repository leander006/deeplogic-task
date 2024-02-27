import React, { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiDraftLine } from "react-icons/ri";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { SlLogout } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import { logout } from "../redux/Slice/userSlice";
import { BASE_URL } from "../services/helper";

function Navbar({select,setSelect}) {

  const [nav, setNav] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const log = (e) => {
      e.preventDefault();
      dispatch(logout());
      // window.open(`${BASE_URL}/api/auth/google/logout`, "_self");
      navigate("/");

    };
  return (
    <div className="flex flex-col items-center bg-[#202123] shadow-xl z-50 h-full">
      {!nav ?<>
                  <div className="flex items-center my-6">
                  <div className="flex text-black/60"
                        onClick={() => setNav(!nav)}>
                        {!nav && (
                              <h1 className="text-xl cursor-pointer text-white mt-3"><FiAlignJustify /></h1>
                        )}
                  </div>
                   </div>

                  <div className='p-2 flex items-center my-4'>
                  <img className='rounded-full w-6 h-6' src={currentUser?.profile?.url} alt="logo" />
                  </div>
                              
                  <div className="space-y-3 mt-[40px]">
                  <div className={`flex justify-center xl:text-2xl cursor-pointer items-center p-2 py-6 px-4 ${select === "/" ? " text-green-400":"text-[#b2aeae]" }`}
                        onClick={() =>{
                              setSelect("/")
                              navigate("/")
                              }     
                        }
                  >
                        <MdOutlineDashboard />
                  </div>
                  <div className={`flex justify-center xl:text-2xl cursor-pointer items-center p-2 py-6 px-4 ${select === "/draft"? " text-green-400":"text-[#b2aeae]" }`}
                                 onClick={() =>{
                                    setSelect("/draft")
                                    navigate("/draft")
                                    }     
                              }
                  >
                        <RiDraftLine />
                  </div>
                  <div className={`flex justify-center xl:text-2xl cursor-pointer items-center p-2 py-6 px-4 ${select === "/write" ? " text-green-400":"text-[#b2aeae]" }`}
                                  onClick={() =>{
                                    setSelect("/write")
                                    navigate("/write")
                                    }     
                              }
                  >
                        <MdOutlineDriveFolderUpload />
                  </div>
                  </div>
                  <div className="text-white py-6 text-sm cursor-pointer" onClick={log}>
                        <SlLogout />
                  </div>
            </>: (
            <div className="z-50 h-screen bg-black/30 ">
                <ul className="flex flex-col top-0 left-0 w-[50%] md:w-[20vw] fixed md:static bg-[#202123] h-screen">
                  <div className="w-full items-center">
                    <div className="flex justify-between items-center bg-[#131414]">
                        <div className='w-[80%] p-3'>
                              <h1 className='text-center text-2xl my-4 text-green-400'>Socio</h1>
                        </div>
                      <div
                        onClick={() => setNav(!nav)}
                        className="flex cursor-pointer text-black/60 justify-center mr-2"
                      >
                        {nav && (
                          <h1 className="text-xl text-white"><RxCross2 /></h1>
                        )}
                      </div>
                    </div>

                  </div>

                  <div className='p-2 w-[50%] flex items-center space-x-3 mt-3'>
                        <img className='rounded-full w-9 h-9' src={currentUser?.profile?.url} alt="logo" />
                        <h1 className=' capitalize xl:text-xl text-white text-sm'>{currentUser?.username}</h1>
                  </div>
                  <div className="space-y-3 mt-[40px]">
                        <div className={`flex justify-center xl:text-2xl cursor-pointer items-center p-2 py-4 px-4 hover:bg-black hover:text-green-500 ${select === "/" ? "bg-black text-green-400":"text-white " }`}
                              onClick={() =>{
                                    setSelect("/")
                                    navigate("/")
                                    }     
                              }
                        >
                              <MdOutlineDashboard />
                              <h1 className="ml-[20px] xl:text-lg text-xs w-[80%]">
                                    DashBaord
                              </h1>
                        </div>
                        <div className={`flex justify-center xl:text-2xl cursor-pointer items-center p-2 py-4 px-4 hover:bg-black hover:text-green-500 ${select === "/draft"? "bg-black text-green-400":"text-white " }`}
                                           onClick={() =>{
                                                setSelect("/draft")
                                                navigate("/draft")
                                                }     
                                          }
                        >
                              <RiDraftLine />
                              <h1 className="ml-[20px] xl:text-lg text-xs w-[80%]">
                                    Draft
                              </h1>
                        </div>
                        <div className={`flex justify-center xl:text-2xl cursor-pointer items-center p-2 py-4 px-4 hover:bg-black hover:text-green-500 ${select === "/write" ? "bg-black text-green-400":"text-white " }`}
                                        onClick={() =>{
                                          setSelect("/write")
                                          navigate("/write")
                                          }     
                                    }
                        >
                              <MdOutlineDriveFolderUpload />
                              <h1 className= "ml-[20px] xl:text-lg text-xs w-[80%]">
                                    Post
                               </h1>
                        </div>
                        <div className="flex justify-center xl:text-2xl cursor-pointer items-center p-2 py-4 px-4 text-white hover:bg-black hover:text-green-500"
                              onClick={log}
                        >
                              <SlLogout />
                              <h1 className= "ml-[20px] xl:text-lg text-xs w-[80%]">
                                    Logout
                               </h1>
                        </div>
                  </div>
                </ul>
              </div>
            )}

    </div>
  );
}

export default Navbar;