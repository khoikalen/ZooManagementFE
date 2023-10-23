import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#F3B749',
    color: 'white',
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    
  };

  const logoImageStyle = {
    maxWidth: '100px',
    maxHeight: '50px',
    borderRadius: '10px'
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '10px',
  };

  const buttonStyle = {
    backgroundColor: '#333',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  useEffect(() => {
    // Initialize dropdown
    const elems = document.querySelectorAll('.dropdown-trigger');
    window.M.Dropdown.init(elems, { constrainWidth: false });
  }, []);

  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        <img src='name.jpg' style={logoImageStyle} alt="Logo" />
      </div>
      <div style={buttonContainerStyle}>
        <button style={buttonStyle}>Buy Now</button>
        <a className="dropdown-trigger" href="#!" data-target="dropdown1" style={buttonStyle}>
          Option<i className="material-icons right">arrow_drop_down</i>
        </a>
        <ul id="dropdown1" className="dropdown-content">
          <li><Link to="/admin">Login admin</Link></li>
          <li><Link to="/staff">Login staff</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
