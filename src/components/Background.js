import React from "react";
import "./Background.css";
import { Link } from "react-router-dom";

import spaceVideo from "../assets/video.mp4";

const Background = () => {
  return (
    <div className="hero">
      <video autoPlay loop muted id="video">
        <source src={spaceVideo} type="video/mp4" />
      </video>
      <div className="content">
        <h1>ML VISKIT</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <div>
          <Link to="/home" className="btn">
            Home
          </Link>
          <Link to="/login" className="btn btn-light">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Background;
