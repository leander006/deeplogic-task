import React from 'react'
import {useNavigate} from "react-router-dom"
function DraftPost({d}) {
      const navigate = useNavigate()
      const draft = () =>{
            localStorage.setItem("title",d?.title)
            localStorage.setItem("description",d?.description)
            localStorage.setItem("content",JSON.stringify(d?.content))
            localStorage.setItem("id",d._id)
            navigate("/write")
      }
  return (
      <div className='w-[80vw] lg:w-[600px] md:w-[300px] p-3 rounded-md bg-[#202123]'>
            <div className='space-y-3'>
                  <div className='flex'>
                        Title:<h1 className='ml-2'>{d?.title?d?.title:"No title given"}</h1>
                  </div>
                  <div className='flex'>
                        Description:<h1 className='ml-2'>{d?.description?d?.description:"No Description given"}</h1>
                  </div>
                  <div className='flex'>
                        {d?.content ?<img className='p-3 rounded-md ' src={d?.content?.url} alt="postImage" />:<h1>No image</h1>}
                  </div>                 

            </div>
            <div >
                  <button onClick={draft} className='bg-green-500 text-white w-full rounded-md p-2 my-3' type="button">Update</button>
            </div>
      </div>
  )
}

export default DraftPost