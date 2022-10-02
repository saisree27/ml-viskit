import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Modal.css";

export default function Modal() {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [featureNumber, updateFeatureNumber] = useState(0);

  function increment() {
    updateFeatureNumber(featureNumber + 1);
  }

  function decrement() {
    if (featureNumber > 0) {
      updateFeatureNumber(featureNumber - 1);
    }
  }

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <button onClick={toggleModal} className="btn btn-light">
        Open
      </button>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <p>
              <h3>Name :</h3>
              <input
                className="text-input"
                type="text"
                onChange={(e) => setName(e.target.value)}
              ></input>
              <h3>Description :</h3>
              <input
                className="text-input"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
              ></input>
              <h3>Number of features:</h3>
              <div className="counter-label">
                <h2>{featureNumber}</h2>
              </div>
              <div className="input-field">
                <button onClick={decrement} className="btn">
                  -
                </button>
                <button onClick={increment} className="btn">
                  +
                </button>
              </div>
            </p>
            <div className="btn-container">
              <Link className="btn btn-light" to="/create">
                SUBMIT
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
