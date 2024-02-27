import React, { useEffect, useState } from 'react'
import {useLocation} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import { SpinnerCircular } from "spinners-react";
import  axios  from 'axios';
import toast from "react-hot-toast";
import { BASE_URL } from '../services/helper';

function Write({setSelect}) {
  const location = useLocation();
  const {pathname } = location;
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [draftInfo, setDraftInfo] = useState({title:"",description:"",content:"",id:""});
  const [visible, setVisible] = useState(false)
  const [description, setDescription] = useState("")
  const [selectedImg, setSelectedImg] = useState("");
  const [info, setInfo] = useState({year:"",dayOfWeek:"",dayOfMonth:"",month:"",minute:"",hour:""})
  const [dateTime, setDateTime] = useState({
    datetime: `${new Date().getFullYear()}-${`${new Date().getMonth() +
      1}`.padStart(2, 0)}-${`${new Date().getDate() + 1}`.padStart(
      2,
      0
    )}T${`${new Date().getHours()}`.padStart(
      2,
      0
    )}:${`${new Date().getMinutes()}`.padStart(2, 0)}`
})
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(false);
  const [fileInputState, setFileInputState] = useState("");

  useEffect(() => {
    setSelect(pathname)
  }, [pathname])

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage?.getItem("token")}`,
    },
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedImg(file);
    setFileInputState(e.target.value);
  };


  const handleImage = (e) => {
    e.preventDefault();
    if(draftInfo?.content){
      return toast.error("You have already selected image")
    }
    if (!selectedImg) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${BASE_URL}/api/post/postUpload/postImg`,
        { data: base64EncodedImage },
        config
      );
      setFileInputState("");
      setProfile(data);
      setLoading(false);
      toast.success("Image uploaded");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message);
    }
  };

    const handleSubmit = async (e) => {
      e.preventDefault()
    try {
      if(draftInfo?.id){
        await axios.put(
          `${BASE_URL}/api/post`,
          { content: profile, title,description,id:draftInfo?.id},
          config
        )
        localStorage.removeItem("title");
        localStorage.removeItem("description");
        localStorage.removeItem("content");
        localStorage.removeItem("id");
      }
      else{
        await axios.post(
          `${BASE_URL}/api/post`,
          { content: profile, title,description},
          config
        );
      }

      navigate("/");
      toast.success(`Post ${isDraft?"saved in draft section":"created"}`);
    } catch (error) {
      console.log(error?.response?.data.message);
    }
  };

  const handleSchedule = async (e) => {
    e.preventDefault();
    try {
      if(!profile || ! title || !description || !info){
        return toast.error("Please enter all field!!")
      }
      await axios.put(
        `${BASE_URL}/api/post/schedule`,
        { content: profile, title,description,date:info },
        config
      );
      navigate("/");
      toast.success("Post scheduled successfully");
    } catch (error) {
      console.log(error?.response?.data.message);
    }
  };

  const handleDateTime = (dateString) =>{
    const date = new Date(dateString);

    const year = date.getFullYear()
    const dayOfWeek = date.getDay();
    const month = date.getMonth() + 1;
    const dayOfMonth = date.getDate(); 
    const hour = date.getHours();
    const minute = date.getMinutes(); 

    setInfo({
      year,
      dayOfWeek:dayOfWeek === 0 ? 7 : dayOfWeek,
      dayOfMonth,
      month,
      minute,
      hour
    })
  }
  
  useEffect(() => {
    handleDateTime(dateTime)
  }, [dateTime])
  
  useEffect(() => {
    const getDraftInfo =() =>{
        const title = localStorage.getItem("title")
        const description = localStorage.getItem("description")
        const id = localStorage.getItem("id")
        const content = localStorage.getItem("content") != "undefined" && JSON.parse(localStorage.getItem("content"))
        setDraftInfo({title,description,content,id})
    }

    getDraftInfo()
  }, [])
  console.log(draftInfo);
  return (
    <div className='z-2 h-full text-white flex justify-center items-center'>
        <div className="flex flex-1 justify-center items-center ">
          <div className="flex w-[80vw] text-green-500 bg-gray-800 rounded-lg lg:w-[400px]  md:w-[300px] md:justify-center">
            <div className="flex flex-col w-full p-5">
              {!visible && <h1 className="text-xl md:mb-3">Post</h1>}
              {!visible ?<form
                className="flex justify-center flex-col item-center mt-4"
                onSubmit={handleSubmit}
              >
                <label className="mb-2">Title</label>
                <input
                  className="w-full mb-3 h-12 focus:outline-none rounded-md p-3 border border-black"
                  onChange={(e) => setTitle(e.target.value)}
                  value={draftInfo?.title?draftInfo?.title:title}
                  type="text"
                  required
                />
                <label className="mb-2">Description</label>
                <textarea
                  className="w-full mb-2 focus:outline-none rounded-md p-3 border border-black"
                  onChange={(e) => setDescription(e.target.value)}
                  value={draftInfo?.description?draftInfo?.description:description}
                  type="text"
                  required
                />
          <div className="flex flex-col justify-center items-center">
            {loading && (
              <SpinnerCircular
                size="90"
                className=" w-full flex items-center xl:h-80  md:h-64 h-28 lg:h-72 flex-col  mx-auto"
                thickness="100"
                speed="600"
                color="white"
                secondaryColor="black"
              />)}

              {profile && <img className="h-28 md:h-64 lg:h-72 xl:h-80 object-contain my-2"
                  src={profile?.url} alt="write" />
              }
              {draftInfo?.content?.url && <img className="h-28 md:h-64 lg:h-72 xl:h-80 object-contain my-2"
                  src={draftInfo?.content?.url} alt="write" />
              }
            {!selectedImg && (
              <label
                className="bg-green-500 active:bg-green-00 text-center cursor-pointer my-4 text-white p-1 rounded"
                htmlFor="forFile"
              >
               <FaCloudUploadAlt />
              </label>
            )}
            <input
              type="file"
              id="forFile"
              accept="image/png , image/jpg, image/jpeg ,video/mp4"
              value={fileInputState}
              onChange={handleFileInputChange}
              style={{ display: "none" }}
              name="file"
            />
          </div>
          {selectedImg && !profile && (
            <div className="flex justify-center">
              <h1
                className="bg-green-500 active:bg-green-400 cursor-pointer my-2 text-white p-1 rounded-md"
                onClick={handleImage}
              >
                Upload image
              </h1>
            </div>
          )}
                <div className="md:flex text-white md:justify-evenly">
                  <input
                    type="submit"
                    className="bg-green-500 mb-2 cursor-pointer rounded-md w-full h-10 md:mr-2 hover:bg-green-700"
                    value="Add"
                  />
                  <button className="bg-green-500 mb-2 cursor-pointer rounded-md w-full  h-10 md:mr-2 hover:bg-green-700"
                   type='button' onClick={() =>setVisible(true)}>Schedule</button>
                </div>
                <div className='md:flex justify-center text-white'>
                <button className="bg-green-500 mb-2 cursor-pointer rounded-md w-full  h-10 md:mr-2 hover:bg-green-700"
                   type='button' onClick={handleSubmit}>Safe as draft</button>
                </div>
              </form>:
              <div className='flex flex-col w-full p-5 items-center'>       
                    <h1 className='my-3'>Schedule appropriate date and time </h1>           
                    <input
                      type="datetime-local"
                      className='text-green-500 cursor-pointer'
                      onChange={e => setDateTime(e.target.value)}
                     />
                    <p className='my-3'>So post will be live on {info.dayOfMonth}/{info.month} at {info.hour}:{info.minute}</p>
                    <div className='flex justify-evenly w-full'>
                        <button onClick={handleSchedule} className='bg-green-500 p-3 w-fit flex justify-center items-center text-white rounded-md' type="submit">Schedule</button>
                        <button onClick={() =>setVisible(false)} className='bg-green-500 p-3 w-fit flex justify-center items-center text-white rounded-md' type="submit">Cancel</button>
                    </div>
                    
              </div>}
            </div>
          </div>
        </div>
    </div>
  ) 
}

export default Write
