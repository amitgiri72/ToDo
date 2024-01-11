const express = require("express");
const todoRoute = express.Router();
const {
  createController,
  fetchController,
  updateController,
  removeController,
} = require("../controllers/todoController.js");

todoRoute.post("/create-todo", createController);

todoRoute.get("/show-todos", fetchController);

//update todo route
todoRoute.put("/update-todo/:id", updateController);

//detele todo
todoRoute.delete("/delete-todo/:id", removeController);

module.exports = { todoRoute };
