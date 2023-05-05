const pool = require("../../db");
const queries = require("./queries");

// Get request to get all todos from table in DB.

const getTodos = (req, res) => {
  pool.query(queries.getTodos, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

// Get request to get todo by ID.

const getTodoById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getTodoById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

// POST request to add todo to table on DB.

const addTodo = (req, res) => {
  const { tasks, email } = req.body;
  // add todo to db
  pool.query(queries.addTodo, [tasks, email], (error, results) => {
    if (error) throw error;
    res.status(201).send("New todo added successfully!");
    console.log("Todo created");
  });
};

// DELETE request to remove Todo from table in DB.

const removeTodo = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getTodoById, [id], (error, results) => {
    // Check if Todo ID is in the database first.
    const noTodoFound = !results.rows.length;
    if (noTodoFound) {
      res.send("Todo does not exist in database.");
    }
    //If the ID is in the database, then you remove it.
    pool.query(queries.removeTodo, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Todo removed from database");
    });
  });
};

const updateTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const { tasks } = req.body;

  // Check if todo ID exists
  pool.query(queries.getTodoById, [id], (error, results) => {
    const noTodoFound = !results.rows.length;
    if (noTodoFound) {
      res.send("Todo does not exist in database.");
    }
    // If todo ID is found
    pool.query(queries.updateTodo, [tasks, id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Updated todo");
    });
  });
};

module.exports = {
  getTodos,
  getTodoById,
  addTodo,
  removeTodo,
  updateTodo,
};
