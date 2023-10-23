import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App1 from './Component/App1';
import Admin from './AdminPage/Admin'; // Import trang Admin
import Staff from './StaffPage/Staff';
import MainCoverImage from './CoverImage/MainCoverImage';
import './App.css'
function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path='/' element={<MainCoverImage />} />
          <Route path='/App1' element={<App1 />} />
          <Route path="/admin" element={<Admin />} /> 
          <Route path="/staff" element={<Staff />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
