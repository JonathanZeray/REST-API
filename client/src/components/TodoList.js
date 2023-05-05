import axios from "axios";
import React, { useState, useEffect } from "react";
import AddItemForm from "./AddItemForm";
import './todoList.css';

const BASE_URL = "http://localhost:8000/api/v1/todos";

const TodoList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(BASE_URL)
      .then((res) => setItems(res.data))
      .catch((error) => console.log(error));
  }, []);

  const onToDoCreate = async (newToDo) => {
    try {
      // Send POST request
      await axios.post(BASE_URL, { tasks: newToDo });

      // Update the frontend by fetching the updated data from the server
      const updatedItems = await axios.get(BASE_URL);
      setItems(updatedItems.data);
    } catch (error) {
      console.log(error);
    }
  };


function handleDelete(id) {
  axios
    .delete(`http://localhost:8000/api/v1/todos/${id}`)
    .then(() => {
      // Update the frontend by filtering out the deleted item
      setItems(items.filter(item => item.id !== parseInt(id))); 
      console.log("Successfully deleted");
    })
    .catch(error => {
      console.log(error);
    });
}

function handleEdit(id) {
  let editedTask = prompt('Write your new task');
  axios
    .put(`http://localhost:8000/api/v1/todos/${id}`, {
      tasks: `${editedTask}`
    })
    .then(() => {
      // Update the frontend by fetching the updated data
      axios.get(BASE_URL).then((res) => setItems(res.data));
      console.log("Successfully edited");
    })
    .catch(error => {
      console.log(error);
    });
}

  const sortedTasks = items?.sort((a, b) => new Date(a.date) - new Date(b.date));

  if (!sortedTasks) return <p>Loading...</p>;

  return (
    <>
    <div className="todoList">
      <div className="todo-header">
      <h1>To Do List</h1>
      </div>
      {sortedTasks?.map((item) => (
        <li key={item.id}>
    {item.tasks} - {" "}
    <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
    <button className="edit-btn" onClick={() => handleEdit(item.id)}>Edit</button>
  </li>
))}
      <br />
      <br />
      <AddItemForm onToDoCreate={onToDoCreate} />
</div>
    </>
  );
};


export default TodoList;
