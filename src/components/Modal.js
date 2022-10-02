import React, { useState } from "react";
import "./Modal.css";

export default function Modal() {
  const [modal, setModal] = useState(false);
  const [counter, updateCounter] = useState(0);

  function increment() {
    updateCounter(counter + 1);
  }

  function decrement() {
    if (counter > 0) {
      updateCounter(counter - 1);
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
              <label className="input-label">
                Enter the number of features:
              </label>
              <div className="counter-label">
                <h2>{counter}</h2>
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
              <button className="btn btn-light" onClick={toggleModal}>
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
