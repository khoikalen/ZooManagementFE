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

const BarChart = () => {
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const API_URL = "https://zouzoumanagement.xyz/api/v1/ticket";
      const labelSet = new Set();
      const adultData = [];
      const childData = [];

      try {
        const response = await fetch(API_URL);
        const res = await response.json();

        console.log("API data", res);
        const first10Record = res.slice(res.length - 10, res.length);

        console.log(res.length);

        for (const check of first10Record) {
          const dateArray = check.date;

          const formattedDate = `${dateArray[0]}-${dateArray[1]}-${dateArray[2]}`;

          if (check.type === "ADULT") {
            adultData.push({ x: formattedDate, y: check.quantity });
          }
          if (check.type === "CHILD") {
            childData.push({ x: formattedDate, y: check.quantity });
          }

          labelSet.add(formattedDate);
        }

        const labels = Array.from(labelSet);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Adult",
              data: adultData,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "Child",
              data: childData,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        });

        console.log("Data - Adults:", adultData);
        console.log("Data - Children:", childData);
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
        text: "Ticket Statistic Chart By Day",
      },
    }
  };

  return (
    <div className="bar-chart-style">
      {chartData.labels && chartData.labels.length > 0 && (
        <Bar data={chartData} height={400} options={options} />
      )}
    </div>
  );
};

export default BarChart;
