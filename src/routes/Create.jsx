import React, { useState, useCallback } from "react";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Box } from "../components/Box";
import { DropField } from "../components/DropField";
import { ItemTypes } from "../constants/ItemTypes";
import "../css/create.css";

export default function Create() {
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
      bg: "white",
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
      bg: "white",
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
      bg: "white",
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
        bg: "white",
      },
    ]);
  };

  const removeLayer = (index) => {
    var newLayers = Array.from(layers);
    newLayers.splice(index, 1);
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

  return (
    <div className="create">
      <div className="heading-wrapper">
        <h2 className="heading">Create a Pipeline</h2>
      </div>
      <DndProvider backend={HTML5Backend}>
        <div style={{ overflow: "visible", clear: "both", display: "flex" }}>
          <div className="inputsize">Input (Size: 8)</div>
          {layers.map(({ accepts, lastDroppedItem, strname, bg }, index) => (
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
                {strname == "Dense" ? <p>Size: </p> : <></>}
                {strname == "BatchNormalization" ? <p>Axis: </p> : <></>}
                {strname == "Dropout" ? <p>Size: </p> : <></>}
                {strname.includes("Layer") ? <p></p> : <></>}
              </div>
              <p className="removelayer" onClick={() => removeLayer(index)}>x</p>
            </div>
          ))}
          <div className="addlayer" onClick={() => addLayer()}>
            +
          </div>
        </div>
        <div>
          <h3>Layers</h3>
          <div className="categories">
            <div className="category">
              <h4>Dense</h4>
              <Box
                name="Dense"
                className="transition"
                type={ItemTypes.DENSE}
                color="orange"
              />
            </div>
            <div className="category">
              <h4>Activation</h4>
              <Box name="ReLU" type={ItemTypes.ACTIVATION} color="red" />
              <Box name="sigmoid" type={ItemTypes.ACTIVATION} color="red" />
              <Box name="leakyReLU" type={ItemTypes.ACTIVATION} color="red" />
              <Box name="tanh" type={ItemTypes.ACTIVATION} color="red" />
              <Box name="ELU" type={ItemTypes.ACTIVATION} color="red" />
              <Box name="softmax" type={ItemTypes.ACTIVATION} color="red" />
            </div>
            <div className="category">
              <h4>Batch Normalization</h4>
              <Box
                name="Batch Normalization"
                type={ItemTypes.BATCH}
                color="green"
              />
            </div>
            <div className="category">
              <h4>Dropout</h4>
              <Box name="Dropout" type={ItemTypes.DROPOUT} color="blue" />
            </div>
          </div>
        </div>
      </DndProvider>
    </div>
  );
}
