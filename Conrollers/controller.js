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

const getTasks = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Task.findById(id);
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: "Data Not Found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error Occured" });
  }
};

const updateTasks = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedData = await Task.findByIdAndUpdate(id, data, { new: true });
    if (updatedData) {
      res.json(updatedData);
    } else {
      res.status(404).json({ message: "Data Not Found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error Occured" });
  }
  // try {
  //   const { id: taskId } = req.params;
  //   const task = await Task.findByIdAndUpdate({ _id: taskId }, req.body);
  //   if (!task) {
  //     return res.status(404).json({ msg: `No task with id : ${taskId}` });
  //   }
  //   res.status(200).json(task);
  // } catch (err) {
  //   res.status(500).json({ msg: error });
  // }
};

const deleteTasks = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Task.findByIdAndDelete(id);
    if (data) {
      res.json({ message: "Data Deleted" });
    } else {
      res.status(404).json({ message: "Data Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error Occured" });
  }
};

module.exports = {
  getAllTasks,
  createTasks,
  getTasks,
  updateTasks,
  deleteTasks,
};
