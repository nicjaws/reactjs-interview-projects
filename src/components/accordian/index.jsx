// This component implements an accordion with single or multiple selection functionality

// Import data from a separate file (likely containing questions and answers)
import data from "./data";
// Import useState hook from React for managing component state
import { useState } from "react";
// Import styles from a separate CSS file (optional)
import "./styles.css";

export default function Accordian() {
  // State variable to store the currently selected item ID (single selection)
  const [selected, setSelected] = useState(null);

  // State variable to indicate if multiple selection is enabled
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);

  // State variable to store the selected items' IDs (multiple selection)
  const [multiple, setMultiple] = useState([]);

  // Function to handle single item selection
  function handleSingleSelection(getCurrentId) {
    // If the clicked item is already selected, deselect it, otherwise select it
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  // Function to handle multi-item selection
  function handleMultiSelection(getCurrentId) {
    // Create a copy of the multiple state to avoid mutation
    let cpyMultiple = [...multiple];

    // Find the index of the clicked item in the copied array
    const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId);

    // If the item is not selected, add it to the array
    if (findIndexOfCurrentId === -1) cpyMultiple.push(getCurrentId);
    // Otherwise, remove it from the array
    else cpyMultiple.splice(findIndexOfCurrentId, 1);

    // Update the multiple state with the modified array
    setMultiple(cpyMultiple);
  }

  // For debugging purposes, log the currently selected item ID (single selection)
  console.log(selected);

  return (
    <div className="wrapper">
      {/* Button to toggle between single and multiple selection */}
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable Multiple Selection
      </button>
      <div className="accordian">
        {/* Check if data exists and has elements */}
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item" key={dataItem.id}>
              {/* Click handler based on selection mode */}
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {/* Conditionally display content based on selection mode and selected items */}
              {enableMultiSelection
                ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className="content">{dataItem.answer}</div>
                  )
                : selected === dataItem.id && (
                    <div className="content">{dataItem.answer}</div>
                  )}
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
}
