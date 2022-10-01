import React from "react";
import Card from "./Card";
import "./CardsSection.css";

const CardsSection = () => {
  return (
    <div className="cardsSection-container">
      <div className="card-container">
        <Card name="name" description="description" />
        <Card name="name" description="description" />
        <Card name="name" description="description" />
        <Card name="name" description="description" />
      </div>
    </div>
  );
};

export default CardsSection;
