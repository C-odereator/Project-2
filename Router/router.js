const express = require("express");
const router = express.Router();
const {
  getTasks,
  getAllTasks,
  updateTasks,
  deleteTasks,
  createTasks,
} = require("../Conrollers/controller");

router.route("/").get(getAllTasks).post(createTasks);
router.route("/:id").get(getTasks).patch(updateTasks).delete(deleteTasks);

module.exports = {
  router,
};
