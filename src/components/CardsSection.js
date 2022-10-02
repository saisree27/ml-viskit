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
  const [cards, setCards] = useState([
    { strname: "Default", description: "Test pipeline" },
  ]);

  let modalClick = (name, description) => {
    setCards([...cards, { strname: name, description }]);
  };
  return (
    <div className="cardsSection-container">
      <div className="card-container">
        {cards.map(({ strname, description }, index) => (
          <Card name={strname} description={description} />
        ))}
      </div>
      <div className="submit-container">
        <Modal click={modalClick}/>
      </div>
    </div>
  );
};

export default CardsSection;
