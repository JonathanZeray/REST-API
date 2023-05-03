const getTodos = "SELECT * FROM todos";
const getTodoById = "SELECT * FROM todos WHERE id = $1";
const checkEmailExists = "SELECT s FROM todos s WHERE s.email = $1"; 
const addTodo =
  "INSERT INTO todos (tasks, email) VALUES ($1, $2)";
const removeTodo = "DELETE FROM todos WHERE id = $1";
const updateTodo = "UPDATE todos SET tasks = $1 WHERE id = $2";

module.exports = {
  getTodos,
  getTodoById,
  checkEmailExists,
  addTodo,
  removeTodo,
  updateTodo,
};
