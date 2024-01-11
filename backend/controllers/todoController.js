const mongoose = require("mongoose");
const { ToDo } = require("../models/todoModel.js");

const createController = async (req, res) => {
  try {
    const { task, completed } = req.body;
    const newTodo = new ToDo({ task, completed });
    await newTodo.save();
    // res.json(newTodo);
    res.status(201).send({
      success: true,
      message: "TODO Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while adding todo",
    });
  }
};
const updateController = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    let updatedTask = await ToDo.findByIdAndUpdate(id, { completed });

    res.status(200).send({
      success: true,
      message: "Task Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Todo",
      error,
    });
  }
};
// delete todo
const removeController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await ToDo.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Deleted todo successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting the task",
      error,
    });
  }
};

const fetchController = async (req, res) => {
  try {
    const todo = await ToDo.find({});
    res.status(200).send({
      success: true,
      message: "All todo fetched",
      todo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while geting All todos",
    });
  }
};

module.exports = {
  createController,
  fetchController,
  updateController,
  removeController,
};
