import React, { useState, useCallback } from "react";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Box } from "../components/Box";
import { DropField } from "../components/DropField";
import { ItemTypes } from "../constants/ItemTypes";
import "../css/create.css";
import axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";
import NavBar from "../components/Navbar";

export default function Create() {
  const [loss, setLoss] = useState("mse");
  const [epochs, setEpochs] = useState(10);
  const [optimizer, setOptimizer] = useState("sgd");
  const [metrics, setMetrics] = useState("accuracy");
  const [trainComplete, setTrainComplete] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [modelLoss, setmodelLoss] = useState(0);
  const [started, setStarted] = useState(false);

  const [layers, setLayers] = useState([
    {
      accepts: [
        ItemTypes.DENSE,
        ItemTypes.ACTIVATION,
        ItemTypes.BATCH,
        ItemTypes.DROPOUT,
      ],
      lastDroppedItem: null,
      strname: "Layer 1",
      bg: "black",
      setting: "",
    },
    {
      accepts: [
        ItemTypes.DENSE,
        ItemTypes.ACTIVATION,
        ItemTypes.BATCH,
        ItemTypes.DROPOUT,
      ],
      lastDroppedItem: null,
      strname: "Layer 2",
      bg: "black",
      setting: "",
    },
    {
      accepts: [
        ItemTypes.DENSE,
        ItemTypes.ACTIVATION,
        ItemTypes.BATCH,
        ItemTypes.DROPOUT,
      ],
      lastDroppedItem: null,
      strname: "Layer 3",
      bg: "black",
      setting: "",
    },
  ]);

  const addLayer = () => {
    setLayers([
      ...layers,
      {
        accepts: [
          ItemTypes.DENSE,
          ItemTypes.ACTIVATION,
          ItemTypes.BATCH,
          ItemTypes.DROPOUT,
        ],
        lastDroppedItem: null,
        strname: "New Layer",
        bg: "black",
        setting: "",
      },
    ]);
  };

  const removeLayer = (index) => {
    var newLayers = Array.from(layers);
    newLayers.splice(index, 1);
    setLayers(newLayers);
  };

  const setSetting = (value, index) => {
    var newLayers = Array.from(layers);
    newLayers[index].setting = value;
    setLayers(newLayers);
  };

  const handleDrop = useCallback(
    (index, item) => {
      let color = "white";
      if (item.name === "Dense") {
        color = "orange";
      }
      if (item.name === "ReLU") {
        color = "red";
      }
      if (item.name === "sigmoid") {
        color = "red";
      }
      if (item.name === "leakyReLU") {
        color = "red";
      }
      if (item.name === "tanh") {
        color = "red";
      }
      if (item.name === "ELU") {
        color = "red";
      }
      if (item.name === "softmax") {
        color = "red";
      }
      if (item.name === "Batch Normalization") {
        color = "green";
      }
      if (item.name === "Dropout") {
        color = "blue";
      }

      setLayers(
        update(layers, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
            strname: {
              $set: item.name,
            },
            bg: {
              $set: color,
            },
          },
        })
      );
    },
    [layers]
  );

  const submit = () => {
    setStarted(true);
    setTrainComplete(false);
    let request = {
      data: "",
      optimizer,
      loss,
      metrics,
      epochs,
    };
    console.log(layers);
    console.log(metrics);
    let model = [];
    model.push("input", "16");

    for (let i = 0; i < layers.length; i++) {
      if (layers[i].strname == "Dense") {
        model.push("dense", layers[i].setting);
      } else if (layers[i].strname == "Batch Normalization") {
        model.push("batchnormalization", layers[i].setting);
      } else if (layers[i].strname == "Dropout") {
        model.push("dropout", layers[i].setting);
      } else {
        model.push(layers[i].strname.toLowerCase());
      }
    }

    request.model = model;
    console.log(request);
    axios
      .post("http://localhost:5000/train", request)
      .then(function (response) {
        console.log(response);
        setTrainComplete(true);
        setAccuracy(response.data.accuracy);
        setmodelLoss(response.data.loss);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="create-holder">
      <NavBar />
      <div className="create">
      <div className="heading-wrapper">
        <h1 className="heading">Create a Pipeline</h1>
      </div>
      <DndProvider backend={HTML5Backend}>
        <div style={{ overflow: "visible", clear: "both", display: "flex" }} className="pipeline">
          <div className="inputsize">Input (Size: 16)</div>
          {layers.map(
            ({ accepts, lastDroppedItem, strname, bg, setting }, index) => (
              <div className="remove">
                <div className="layerSettings">
                  <DropField
                    accept={accepts}
                    lastDroppedItem={lastDroppedItem}
                    onDrop={(item) => handleDrop(index, item)}
                    bg={bg}
                    strname={strname}
                    key={index}
                  />
                  {strname == "Dense" ? (
                    <div className="size-input">
                      <p>Size (int): </p>
                      <input
                        className="create-page-input"
                        value={setting}
                        onChange={(e) => setSetting(e.target.value, index)}
                      ></input>
                    </div>
                  ) : (
                    <></>
                  )}
                  {strname == "Batch Normalization" ? (
                    <div className="size-input">
                      <p>Axis: </p>
                      <input
                        className="create-page-input"
                        value={setting}
                        onChange={(e) => setSetting(e.target.value, index)}
                      ></input>
                    </div>
                  ) : (
                    <></>
                  )}
                  {strname == "Dropout" ? (
                    <div className="size-input">
                      <p>Size (float): </p>
                      <input
                        className="create-page-input"
                        value={setting}
                        onChange={(e) => setSetting(e.target.value, index)}
                      ></input>
                    </div>
                  ) : (
                    <></>
                  )}
                  {strname.includes("Layer") ? <p></p> : <></>}
                </div>
                <p className="removelayer" onClick={() => removeLayer(index)}>
                  x
                </p>
              </div>
            )
          )}
          <div className="addlayer" onClick={() => addLayer()}>
            +
          </div>
        </div>
        <div className="options-and-score">
          <div>
            <h2>Options</h2>
            <div className="form">
              <div className="entry">
                <p>Optimizer: </p>
                <select
                  value={optimizer}
                  onChange={(e) => setOptimizer(e.target.value)}
                >
                  <option value="sgd">SGD</option>
                  <option value="adam">Adam</option>
                  <option value="rmsprop">RMSprop</option>
                  <option value="adagrad">Adagrad</option>
                  <option value="adamax">Adamax</option>
                </select>
              </div>
              <div className="entry">
                <p>Epochs: </p>
                <input
                  className="create-page-input"
                  value={epochs}
                  onChange={(e) => setEpochs(e.target.value)}
                ></input>
              </div>
              <div className="entry">
                <p>Loss: </p>
                <select value={loss} onChange={(e) => setLoss(e.target.value)}>
                  <option value="mse">Mean Squared Error</option>
                  <option value="categorical_crossentropy">
                    Categorical Crossentropy
                  </option>
                  <option value="binary_crossentropy">
                    Binary Crossentropy
                  </option>
                </select>
              </div>
              <div className="entry">
                <p>Metrics: </p>
                <select
                  value={metrics}
                  onChange={(e) => setMetrics(e.target.value)}
                >
                  <option value="accuracy">Accuracy</option>
                </select>
              </div>
            </div>
          </div>
          <div className="score">
            <h2>Score</h2>
            {trainComplete ? (
              <p>
                Accuracy: {accuracy}, Loss: {modelLoss}
              </p>
            ) : started ? (
              <p>Loading...</p>
            ) : (
              <p>Train the model to view its score.</p>
            )}
          </div>
        </div>
        <div>
          <h2>Layers</h2>
          <div className="categories">
            <div className="category">
              <h3>Dense</h3>
              <Box
                name="Dense"
                className="transition"
                type={ItemTypes.DENSE}
                color="orange"
              />
            </div>
            <div className="category">
              <h3>Activation</h3>
              <Tooltip title="f(x) = x if x > 0, else 0" placement="top">
                <div className="box">
                  <Box name="ReLU" type={ItemTypes.ACTIVATION} color="red" /> 
                </div>
              </Tooltip>
              <Tooltip title="f(x) = 1/(1+exp(-x))" placement="top">
                <div className="box">
                  <Box name="sigmoid" type={ItemTypes.ACTIVATION} color="red" />
                </div>
              </Tooltip>
              <Tooltip title="f(x) = 0.01x if x < 0, else x" placement="top">
                <div className="box">
                  <Box name="leakyReLU" type={ItemTypes.ACTIVATION} color="red" />
                </div>
              </Tooltip>
              <Tooltip title="2*sigmoid(2x)-1" placement="top">
                <div className="box">
                  <Box name="tanh" type={ItemTypes.ACTIVATION} color="red" />
                </div>
              </Tooltip>
              <Tooltip title="f(x) = a(exp(x)-1) if x < 0 else x" placement="top">
                <div className="box">
                  <Box name="ELU" type={ItemTypes.ACTIVATION} color="red" />
                </div>
              </Tooltip>
              <Tooltip title="f(x) = exp(x)/sum(exp(x))" placement="top">
                <div className="box">
                  <Box name="softmax" type={ItemTypes.ACTIVATION} color="red" />
                </div>
              </Tooltip>
            </div>
            <div className="category">
              <h3>Batch Normalization</h3>
              <Box
                name="Batch Normalization"
                type={ItemTypes.BATCH}
                color="green"
              />
            </div>
            <div className="category">
              <h3>Dropout</h3>
              <Box name="Dropout" type={ItemTypes.DROPOUT} color="blue" />
            </div>categories
            <div>
              <p className="submit" onClick={() => submit()}>
                Train model
              </p>
            </div>
          </div>
        </div>
      </DndProvider>
    </div>
    </div>
  );
}
