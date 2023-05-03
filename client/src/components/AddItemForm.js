import React, { useState } from "react";
import './todoList.css';

const AddItemForm = ({ onToDoCreate }) => {
  const [newToDo, setNewToDo] = useState("");
  const onChange = (event) => {
    setNewToDo(event.target.value);
  };

  const onCreate = (event) => {
    event.preventDefault();
    // Send a POST request to API and add the new to do
    onToDoCreate(newToDo);
    setNewToDo("");
  };

  return (
    <>
      <form onSubmit={onCreate}>
        <input
          value={newToDo}
          type="text"
          onChange={onChange}
          placeholder="add new to do"
        />
        <button className="add-btn" type="submit" disabled={!newToDo.length}>
          Add
        </button>
      </form>
    </>
  );
};

export default AddItemForm;
