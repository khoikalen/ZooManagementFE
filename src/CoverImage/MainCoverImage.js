import React from 'react';
import { Link } from 'react-router-dom';
import './MainCoverImage.css';

// Import your background image
import backgroundImage from './antoine-barres.jpg'; // Update the path to your background image

// Import your overlay image
import overlayImage from './clouds.png'; // Update the path to your overlay image

const CoverImage = () => {
  // Define a style object with the background image
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover', // Make the background image cover 100%
  };

  // Define a style object for centering the content
  const centerContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Set the height to 100% of the viewport height
  };

  // Define a style object for the overlay image with a sliding animation
  const overlayImageStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `url(${overlayImage})`,
    backgroundSize: 'cover',
    zIndex: 1, // Set a higher z-index to place it above the background
    animation: 'slide 6s linear infinite', // Slide animation in 6 seconds, repeating infinitely
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  // Define a style object to make the "Enter" text larger
  const enterTextStyle = {
    fontSize: '2rem', // Adjust the font size as needed
  };

  return (
    <div className="cover-image" style={backgroundStyle}>
      <div className="content" style={centerContentStyle}>
        {/* Overlay image with sliding animation and "Enter" text */}
        <div style={overlayImageStyle}>
          <h1>Chào mừng bạn đến trang chủ!</h1>
          <Link to="/App1" style={enterTextStyle}>Enter</Link>
        </div>
      </div>
    </div>
  );
};

export default CoverImage;
