import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";
import "./CardsSection.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const CardsSection = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
        <Modal />
      </div>
    </div>
  );
};

export default CardsSection;
