import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Box } from "../components/Box";
import { DropField } from "../components/DropField";
import { ItemTypes } from "../constants/ItemTypes";
import "../css/create.css";

export default function Create() {
  return (
    <div className="create">
      <div className="heading-wrapper">
        <h2 className="heading">Create a Pipeline</h2>
      </div>
      <DndProvider backend={HTML5Backend}>
      <DropField />
      <div>
        <h3>Layers</h3>
        <div className="categories">
          <div className="category">
            <h4>Dense</h4>
            <Box name="Dense" className="transition" type={ItemTypes.DENSE} color="orange"/>
          </div>
          <div className="category">
            <h4>Activation</h4>
            <Box name="ReLU" type={ItemTypes.ACTIVATION} color="red"/>
            <Box name="sigmoid" type={ItemTypes.ACTIVATION} color="red"/>
            <Box name="leakyReLU" type={ItemTypes.ACTIVATION} color="red"/>
            <Box name="tanh" type={ItemTypes.ACTIVATION} color="red"/>
            <Box name="ELU" type={ItemTypes.ACTIVATION} color="red"/>
            <Box name="softmax" type={ItemTypes.ACTIVATION} color="red"/>
          </div>
          <div className="category">
            <h4>Batch Normalization</h4>
            <Box name="Batch Normalization" type={ItemTypes.BATCH} color="green"/>
          </div>
          <div className="category">
            <h4>Dropout</h4>
            <Box name="Dropout" type={ItemTypes.DROPOUT} color="blue"/>
          </div>
        </div>
      </div>
			</DndProvider>
      
    </div>
  )
}