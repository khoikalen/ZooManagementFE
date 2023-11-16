import React, { useState } from 'react';
import StaffManager from './StaffManager';
import Cage from './Cage';
import DashBoard from './Dashboard';
import Expert from './Expert';
import FoodStorage from './FoodStorage';
import { Link } from 'react-router-dom';
import userIcon from './User.png'; 
import './App2.css';

function App2() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashBoard />;
      case "staff-manager":
        return <StaffManager />;
      case "cages":
        return <Cage />;
      case "expert":
        return <Expert />;
      case "foodstorage":
        return <FoodStorage/>;

    };
  };

  return (
    <div className="App">
      <div className="sidebar">
        <div className="user-info">
          <img src={userIcon} alt="User Icon" className="user-icon" />
          <span className="user-name">Admin: {localStorage.getItem("email")}</span>
        </div>
        <ul>
          <li><button onClick={() => setCurrentPage("dashboard")}>Dash Board</button></li>
          <li><button onClick={() => setCurrentPage("staff-manager")}>Staff Management</button></li>
          <li><button onClick={() => setCurrentPage("cages")}>Cage Management</button></li>
          <li><button onClick={() => setCurrentPage("expert")}>Expert Management</button></li>
          <li><button onClick={() => setCurrentPage("foodstorage")}>Food Storage</button></li>
          <lu><Link to="/App1">Back</Link></lu>
        </ul>
      </div>
      <div className="content">
        {renderPage()}
      </div>
    </div>
  );
}

export default App2;
