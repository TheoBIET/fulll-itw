import React, { useState } from "react";
// Import mock data
import { Items } from "./data";

export default function App() {
  const [items, setItems] = useState(Items);
  const [allChecked, setAllChecked] = useState(false);
  
  const setChecked = (id) => {
    // Find the item in the array and update the checked property
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });

    // Check if all items are checked
    const allChecked = newItems.every(item => item.checked);
    
    // Update the state with the new array of items
    setItems(newItems);
    // Update the state with the new value of allChecked
    setAllChecked(allChecked);
  };

  const handleCheckAll = (e) => {
    const { checked } = e.target;

    // Set all items to checked or unchecked
    const newItems = items.map((item) => ({
      ...item,
      checked,
    }));

    // Update state
    setItems(newItems);
    setAllChecked(checked);
  };

  return (
    <div className="App">
      <main className="container">
        <h1 className="title">React Level 1 - Fulll</h1>
        <label className="checkbox" onClick={handleCheckAll}>
          <input type="checkbox" checked={allChecked}></input>
          {allChecked ? "Uncheck all elements" : "Check all elements"}
        </label>
        <div className="container">
          {items.map((item) => (
            <li className="box" key={item.id}>
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => setChecked(item.id)}
                />
                {item.name}
              </label>
            </li>
          ))}
        </div>
      </main>
    </div>
  );
}
