const Task = require("../models/task.js");
const asyncWrapper = require("../middleware/asyncWrapper.js");
const {
  createCustomError,
  CustomAPIError,
} = require("../errors/customError.js");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json(tasks);
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    const err = createCustomError("Task not found", 404);
    return next(err);
  }
  res.json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    const err = createCustomError("Task not found", 404);
    return next(err);
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOneAndDelete(req.params.id);
  if (!task) {
    const err = createCustomError("Task not found", 404);
    return next(err);
  }
  return res.status(204).json({ msg: "Task deleted" });
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
