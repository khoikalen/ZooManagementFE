import React, { useEffect, useState } from "react";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./Chart.css";
import axios from "axios";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const DoughnutChartFoodConsumption = () => {
  const [doughnutChart, setDoughnutChart] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const API_URL = "https://zouzoumanagement.xyz/api/v1/food";
    axios
      .get(API_URL)
      .then((response) => {
        const apiData = response.data;

        const lables = apiData.map((item) => item.name);
        const price = apiData.map((item) => item.price);

        setDoughnutChart({
          labels: lables,
          datasets: [
            {
              data: price,
              backgroundColor: [
                "rgba(255, 50, 50, 0.7)",
                "rgba(255, 255, 108, 0.7)",
                "rgba(255, 153, 153, 0.7)",
                "rgba(192, 192, 192, 0.7)",
                "rgba(50, 255, 50, 0.7)",
                "rgba(255, 205, 86, 0.7)",
                "rgba(255, 153, 51, 0.7)",
                "rgba(255, 255, 180, 0.7)",
                "rgba(51, 51, 255, 0.7)",
                "rgba(255, 0, 0, 0.7)",
                "rgba(204, 204, 255, 0.7)",
                "rgba(0, 204, 0, 0.7)",
                "rgba(255, 255, 153, 0.7)",
                "rgba(0, 255, 255, 0.7)",
                "rgba(255, 50, 255, 0.7)",
                "rgba(180, 224, 25, 0.7)",
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
    type: "doughnut",
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Consumable fee on each food",
      },
    },
  };

  return (
    <div className="pie-chart-style">
      <Doughnut data={doughnutChart} height={400} options={options} />
    </div>
  );
};
export default DoughnutChartFoodConsumption;
