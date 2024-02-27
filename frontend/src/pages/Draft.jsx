import React, { useEffect, useState } from 'react'
import {useLocation} from "react-router-dom"
import { SpinnerCircular } from "spinners-react";
import { BASE_URL } from '../services/helper';
import axios from 'axios';
import DraftPost from '../component/DraftPost';
import toast from "react-hot-toast"
function Draft({setSelect}) {
      const location = useLocation();
      const {pathname } = location;
      const [post, setPost] = useState([])
      const [loading, setLoading] = useState(false)
      const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage?.getItem("token")}`,
            },
          };

      useEffect(() => {
            setSelect(pathname)
            // eslint-disable-next-line
      }, [])

      useEffect(() => {
        const getPost = async () => {
              try {
                setLoading(true);
                const { data } = await axios.get(
                  `${BASE_URL}/api/post`,
                  config
                );

                setPost(data);
                setLoading(false);

              } catch (error) {
                  toast.error(error?.response?.data?.message)
                  console.log(error);
              }
            };
            getPost();
            // eslint-disable-next-line
      }, [])
          
  return (
    <div className='text-white flex justify-center h-[99vh] overflow-y-scroll'>
      {loading ? (
              <SpinnerCircular
                size="90"
                className=" w-full flex items-center xl:h-80  md:h-64 h-28 lg:h-72 flex-col  mx-auto"
                thickness="100"
                speed="600"
                color="white"
                secondaryColor="black"
      />):
      
      <div className='space-y-3 my-3 mx-2' >
            {post.map((d) =>(
                  <div key={d._id}>
                        <DraftPost d={d}/>
                  </div>

            ))}
            {post.length == 0 && <h1 className='text-green-500'>No drafted post available</h1>}
      </div>
      }
    </div>
    
  )
}

export default Draft
