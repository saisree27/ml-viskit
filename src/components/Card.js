import React from "react";
import "./Card.css";

const Card = ({ title, body }) => {
  return (
    <div className="card-container">
      <div className="card-title">
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        <h3>{body}</h3>
      </div>
      <div className="btn">
        <button>Select</button>
      </div>
    </div>
  );
};

export default Card;
