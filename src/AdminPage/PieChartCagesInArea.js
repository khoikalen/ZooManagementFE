import React, { useEffect, useState } from "react";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./Chart.css";
import axios from "axios";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChartCagesInArea = () => {
  const [pieChart, setPieChart] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const API_URL = "https://zouzoumanagement.xyz/api/v1/cage";
    axios
      .get(API_URL)
      .then((response) => {
        const apiData = response.data;
        const cageSumMap = {};

        for (const temp of apiData) {
          const { areaName } = temp;
          cageSumMap[areaName] =(cageSumMap[areaName] || 0) +1;
        }
        const uniqueAreaNames = Object.keys(cageSumMap);
        const cageSum = uniqueAreaNames.map((areaName) => cageSumMap[areaName]);

        console.log(uniqueAreaNames);
        console.log(cageSum);
        setPieChart({
          labels: uniqueAreaNames,
          datasets: [
            {
              data: cageSum,
              backgroundColor: [
                "rgba(255, 50, 50, 0.7)",
                "rgba(50, 255, 50, 0.7)",
                "rgba(150, 0, 150, 0.7)",
                "rgba(53, 162, 235, 0.7)",
                "rgba(255, 255, 0, 0.7)",
              ],
            },
          ],
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
        text: "Number of Cages in each area",
      },
    },
  };

  return (
    <div className="pie-chart-style">
      <Pie data={pieChart} height={400} options={options} />
    </div>
  );
};
export default PieChartCagesInArea;
