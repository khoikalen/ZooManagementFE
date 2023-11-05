import React from "react";
import BarChart from "./BarChart";
import BarChartByMonth from "./BarChartByMonth";
import PieChartAnimalsInArea from "./PieChartAnimalsInArea";
import Statistics from "./Statistics";
import PieChartCagesInArea from "./PieChartCagesInArea";
import "./Chart.css";
import DoughnutChartFoodInStorage from "./DoughnutChartFoodInStorage";

const Dashboard = () => {
  return (
    <div>
      <h1>Dash board</h1>
      <div>
        <Statistics />
      </div>
      <div className="ticket-chart-container">
        <BarChart />
      </div>
      
      <div className="chart-container">
        <PieChartCagesInArea/>
        <PieChartAnimalsInArea />
        <DoughnutChartFoodInStorage />
      </div>
    </div>
  );
};

export default Dashboard;
