const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  analytics,
  createTasks,
} = require("../Conrollers/controller");

router.route("/").get(getAllTasks).post(createTasks);

router.get("/analytics/:shortId", analytics);

module.exports = {
  router,
};
