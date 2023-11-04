import axios from "axios";
import React, { useEffect, useState } from "react";

const Statistics = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCage, setTotalCage] = useState(0);
  const [totalAnimal, setTotalAnimal] = useState(0);
  useEffect(() => {
    const revenueAPI = "https://zouzoumanagement.xyz/api/v1/ticket";
    axios
      .get(revenueAPI)
      .then((response) => {
        const revenueAPIData = response.data;
        let total = 0;
        for (const temp of revenueAPIData) {
          total += temp.total;
        }
        setTotalRevenue(total);
        console.log(totalRevenue);
      })
      .catch((error) => {
        console.log(error);
      });

    const cageAPI = "https://zouzoumanagement.xyz/api/v1/cage";
    axios
      .get(cageAPI)
      .then((response) => {
        const cageAPI = response.data;
        const totalCageTemp = cageAPI.length;
        let totalAnimalTemp = 0;
        for (const temp of cageAPI) {
          totalAnimalTemp += temp.quantity;
        }
        setTotalAnimal(totalAnimalTemp);
        setTotalCage(totalCageTemp);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  const formatRevenue = (revenue) => {
    return revenue.toLocaleString("vi-VN");
  };
  return (
    <div className="statistic-container">
      <div className="revenue-statistic">
        <h5>Total revenue</h5>
        <p>{formatRevenue(totalRevenue)} VND</p>
      </div>
      <div className="cage-statistic">
        <h5>Total cage</h5>
        <p>{totalCage}</p>
      </div>
      <div className="animal-statistic">
        <h5>Total animal</h5>
        <p>{totalAnimal}</p>
      </div>
    </div>
  );
};

export default Statistics;
