import React, { useState } from 'react';
import ViewLog from './ViewLog';
import { Link } from 'react-router-dom'; 

function App3() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "viewlog":
        return <ViewLog />;
    

      default:
        return <div>Home Page</div>;
    } 
  }

  return (
    <div className="App">
      <div className="sidebar">
        <h2>Zoo Management System</h2>
        <ul>
          <li><button onClick={() => setCurrentPage("viewlog")}>ViewLog</button></li>
          <lu><Link to="/App1">Back</Link></lu>
        </ul>
      </div>
      <div className="content">
        {renderPage()}
      </div>
    </div>
  );
}

export default App3;
