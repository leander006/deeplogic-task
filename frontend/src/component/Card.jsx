import React, { useEffect, useState } from 'react'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";


Chart.register(CategoryScale);

function Card({title,number,id,add,dataState}) {

  const [chartData, setChartData] = useState({
    labels: dataState.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained ",
        data: dataState.map((data) => data.userGain),
        backgroundColor: "#4d8c57", // Area color
        borderColor: "#013220", // Line color
        borderWidth: 2,
        fill: true // Fill area under line
      }
    ]
  });
      useEffect(() => {
        setChartData(prevChartData => ({
          ...prevChartData,
          labels: dataState.map((data) => data.year),
          datasets: [
            {
              ...prevChartData.datasets[0], // Keep other properties unchanged
              data: dataState.map((data) => data.userGain)
            }
          ]
        }));
      }, [dataState]);

  useEffect(() => {
    if(id == 1){
          setChartData(prevChartData => ({
                ...prevChartData,
                datasets: prevChartData.datasets.map(dataset => ({
                  ...dataset,
                  backgroundColor: "#008E5F" // Replace with your new color
                }))
              }));
    }
  }, [id])

  return (
    <div className={`${id == 1 ?"bg-[#01B075] text-white": "bg-[#202123] text-gray-300" } rounded-md p-3`}>
            <div>
                  <h1>{title}</h1>
                  <h1>{number+add}</h1>
            </div>
            
            <div>

            <Line
                  data={chartData}
                  options={{
                        maintainAspectRatio: false, // allow chart to resize freely
                        responsive: true ,// enable responsiveness
                        scales: {
                              x: {
                                display: false // hide x axis
                              },
                              y: {
                                display: false // hide y axis
                              }
                      }}
                  }
            />
            </div>
    </div>
  )
}

export default Card