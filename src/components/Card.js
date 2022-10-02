import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className="card">
      <p className="btc">{props.name}</p>
      <p>{props.description}</p>
      <Link to="/create" className="btn">
        Open
      </Link>
    </div>
  );
};

export default Card;
