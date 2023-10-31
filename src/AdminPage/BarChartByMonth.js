import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import './Chart.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChartByMonth = () => {
  const [chartData, setChartData] = useState({});
  const [dataAdultSet] = useState([]);
  const [dataChildSet] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const API_URL = "https://zouzoumanagement.xyz/api/v1/ticket";
      const labelSet = [];
      try {
        const response = await fetch(API_URL);
        const res = await response.json();
        
        console.log("API data", res);
        const quantityAdult = 0;
        const quantityChild = 0;
        for (const temp of res) {
            const date = new Date (temp.date);
            const month = date.getMonth() + 1;
            console.log(month);
            labelSet.push(month);
        }

        for (const check of res) {
          if (check.type === "ADULT") {
            quantityAdult = quantityAdult + check.quantity;
          }
          if (check.type === "CHILD") {
            quantityChild = quantityChild + check.quantity;
          }

          
          
        }
  
        setChartData({
          labels: ["a","a","a","a","a","a"],
          datasets: [
            {
              label: "Adult",
              data: dataAdultSet,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "Child",
              data: dataChildSet,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        });
  
        console.log("Data - Adults:", dataAdultSet);
        console.log("Data - Children:", dataChildSet);
      } catch (error) {
        console.log("Error:", error);
      }
    };
  
    fetchData();
  }, []);

  
  const options = {
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Ticket Statistic Chart By Month",
      },
    },
  };
  return (
    <div className="bar-chart-style">
      {dataAdultSet.length > 0 && dataChildSet.length > 0 && (
        <Bar data={chartData} height={400} options={options} />
      )}
    </div>
  );
};

export default BarChartByMonth;
