import React from "react";
import "./Footer.css";
import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="right">
          <h4>About the team</h4>
          <p>
            Here at ML Viskit, we strive to make machine learning tools more accessible 
            and easy for anyone to use. With our team of developers, we aim to bring the power of ML to life!
          </p>
          <div className="social">
            <FaLinkedin
              size={30}
              style={{ color: "#ffffff", marginRight: "1rem" }}
            />
            <FaGithub               
              size={30}
              style={{ color: "#ffffff", marginRight: "1rem" }}
              href="https://github.com/saisree27/ml-viskit"
              />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
