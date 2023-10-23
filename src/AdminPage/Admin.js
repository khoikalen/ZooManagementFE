  import React, { useState } from 'react';
  import StaffManager from './StaffManager';
  import Cage from './Cage';
  import DashBoard from './Dashboard';
  import Expert from './Expert';
  import { Link } from 'react-router-dom';
  import './App2.css';
  function App2() {
    const [currentPage, setCurrentPage] = useState("home");

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
            

        default:
          return <div>Home Page</div>;
      } 
    }

    return (
      <div className="App">
        <div className="sidebar">
          <h2>Welcome Admin!</h2>
          <ul>
            <li><button onClick={() => setCurrentPage("dashboard")}>DashBoard</button></li>
            <li><button onClick={() => setCurrentPage("staff-manager")}>Staff Manager</button></li>
            <li><button onClick={() => setCurrentPage("cages")}>Cages</button></li>
            <li><button onClick={() => setCurrentPage("expert")}>Expert</button></li>
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
