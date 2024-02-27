import React, { useEffect, useState } from 'react'
import {useLocation} from "react-router-dom"
import Card from '../component/Card';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);


function Home({setSelect}) {
  const location = useLocation();
  const {pathname } = location;
  const [get, setGet] = useState(1)


  useEffect(() => {
    setSelect(pathname)
  }, [])

  return (
    <div className='text-white w-full h-[99vh] overflow-y-scroll'>
              <div className='flex items-center justify-between md:mx-3'>
            <h1 className='my-3 md:text-lg ml-3 text-gray-300'>DashBoard</h1>
            <div className='flex space-x-3'>
                  <h1 onClick={() =>setGet(1)} className={`${get == 1 ?"bg-white text-black":"" } p-1 rounded-md cursor-pointer`}>24h</h1>
                  <h1 onClick={() =>setGet(2)} className={`${get == 2 ?"bg-white text-black":"" } p-1 rounded-md cursor-pointer`}>7d</h1>
                  <h1 onClick={() =>setGet(3)} className={`${get == 3 ?"bg-white text-black":"" } p-1 rounded-md cursor-pointer`}>1M</h1>
                  <h1 onClick={() =>setGet(4)} className={`${get == 4 ?"bg-white text-black":"" } p-1 rounded-md cursor-pointer`}>3M</h1>
            </div>
        </div>
      <div className='flex flex-col justify-center'>


         <div className='grid  md:grid-cols-2 grid-cols-1 gap-4 mx-3'>
            <Card id={1} get={get}  title={"Number of post"} number={30}/>
            <Card id={2} get={get} title={"Post likes"} number={100}/>
            <Card id={3} get={get} title={"Post shares"} number={20}/>
            <Card id={4} get={get} title={"Post engagement"} number={40}/>
         </div>
      </div>      
    </div>
  )
}

export default Home