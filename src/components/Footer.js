import React from "react";
import "./Footer.css";
import {
  FaGithub,
  FaLinkedin,
  // FaMailBulk,
  // FaPhone,
  // FaSearchLocation,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        {/* <div className="left">
          {/* <div className="location">
            <FaSearchLocation
              size={20}
              style={{ color: "#ffffff", marginRight: "2rem" }}
            />
            <div>
              <p>123 Acme St.</p>
              <h4>Atlanta, Ga</h4>
            </div>
          </div>
          <div className="phone">
            <h4>
              <FaPhone
                size={20}
                style={{ color: "#ffffff", marginRight: "2rem" }}
              />{" "}
              1-800-123-1234
            </h4>
          </div>
          <div className="email">
            <h4>
              <FaMailBulk
                size={20}
                style={{ color: "#ffffff", marginRight: "2rem" }}
              />{" "}
              trips@galaxy.com
            </h4>
          </div> */}
        {/* </div> */}
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
