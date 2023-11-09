import React, { useState } from 'react';
import DailyMeal from './DailyMeal'
import HealthLog from './HealthLog';
import { Link } from 'react-router-dom'; 
import userIcon from './User.png';

function Expert() {
  const [currentPage, setCurrentPage] = useState("healthlog");

  const renderPage = () => {
    switch (currentPage) {
      case "healthlog":
        return <HealthLog />;
      case "dailymeal":
        return <DailyMeal />;
    

      default:
        return <div>Home Page</div>;
    } 
  }

  return (
    <div className="App">
      <div className="sidebar">
      <div className="user-info">
          <img src={userIcon} alt="User Icon" className="user-icon" />
          <span className="user-name"> Expert: {localStorage.getItem("email")}</span>
        </div>
        <ul>
          <li><button onClick={() => setCurrentPage("healthlog")}>Health Log</button></li>
          <li><button onClick={() => setCurrentPage("dailymeal")}>Meal Management</button></li>
          <lu><Link to="/App1">Back</Link></lu>
        </ul>
      </div>
      <div className="content">
        {renderPage()}
      </div>
    </div>
  );
}

export default Expert;
