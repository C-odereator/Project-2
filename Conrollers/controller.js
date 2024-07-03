const { Task } = require("../Models/models.js");

const getAllTasks = async (req, res) => {
  try {
    const task = await Task.find({});
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Not User Found" });
  } 
};

const createTasks = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ message: "Error Occured From CreateTask" });
  }
};

const getTasks = (req, res) => {
  res.send("Hello from getaltask");
};

const updateTasks = (req, res) => {
  res.send("Hello from getaltask");
};

const deleteTasks = (req, res) => {
  res.send("Hello from getaltask");
};

module.exports = {
  getAllTasks,
  createTasks,
  getTasks,
  updateTasks,
  deleteTasks,
};
