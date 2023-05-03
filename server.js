const express = require("express");
const todoRoutes = require("./src/todos/routes");
require("dotenv").config();
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const port = process.env.PORT || 8000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/v1/todos", todoRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
