import React from 'react';
import { FaFacebook, FaGithub, FaEnvelope } from 'react-icons/fa';


const SocialIcons = () => {
  return (
    <div className="social-icons">
      <div className="social-icon">
        <a href="link-to-your-Facebook-profile">
          <FaFacebook size={32} className="white-icon" />
        </a>
        <span className="icon-text">Facebook</span>
      </div>
      <div className="social-icon">
        <a href="link-to-your-GitHub-profile">
          <FaGithub size={32} className="white-icon" />
        </a>
        <span className="icon-text">GitHub</span>
      </div>
      <div className="social-icon">
        <a href="mailto:your-email@example.com">
          <FaEnvelope size={32} className="white-icon" />
        </a>
        <span className="icon-text">Email</span>
      </div>
    </div>
  );
};

export default SocialIcons;
