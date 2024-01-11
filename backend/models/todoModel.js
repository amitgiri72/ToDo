const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  task: String,
  completed: Boolean,
});

const ToDo = mongoose.model("todo", todoSchema);
module.exports =  {ToDo};
