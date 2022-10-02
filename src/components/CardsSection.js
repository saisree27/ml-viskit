import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import "./CardsSection.css";

const CardsSection = () => {
  return (
    <div className="cardsSection-container">
      <div className="card-container">
        <Card name="name" description="description" />
        <Card name="name" description="description" />
        <Card name="name" description="description" />
        <Card name="name" description="description" />
        <Card name="name" description="description" />
        <Card name="name" description="description" />
        <Card name="name" description="description" />
        <Card name="name" description="description" />
      </div>
      <div className="submit-container">
        <button className="btn btn-light">Submit</button>
      </div>
    </div>
  );
};

export default CardsSection;
