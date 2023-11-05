import React, { useEffect, useState } from "react";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./Chart.css";
import axios from "axios";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChartAnimalsInArea = () => {
  const [pieChart, setPieChart] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const API_URL = "https://zouzoumanagement.xyz/api/v1/cage";
    axios.get(API_URL)
    .then((response) => {
        const apiData = response.data;
        const areaSumMap = {};
       
        for (const temp of apiData) {
            const { areaName, quantity } = temp;
            if (areaSumMap[areaName]) {
              areaSumMap[areaName] += quantity;
            } else {
              areaSumMap[areaName] = quantity;
            }
          }
          const uniqueAreaNames = Object.keys(areaSumMap);
          const quantities = uniqueAreaNames.map((areaName) => areaSumMap[areaName]);

        console.log(uniqueAreaNames);
        console.log(areaSumMap);
        console.log(quantities);
        setPieChart({
            labels: uniqueAreaNames,
            datasets: [
              {
                data: quantities,
                backgroundColor: ["rgba(255, 50, 50, 0.7)", "rgba(50, 255, 50, 0.7)", "rgba(150, 0, 150, 0.7)", "rgba(53, 162, 235, 0.7)", "rgba(255, 255, 0, 0.7)"],
              },
            ],
          });
    }).catch((error) => {console.log(error)});
}, []);

  

  const options = {
    type: "pie",
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Number of Animals in each area",
      },
    },
  };

  return (
    <div className="pie-chart-style">
      <Pie data={pieChart} height={400} options={options} />
    </div>
  );
};
export default PieChartAnimalsInArea;
