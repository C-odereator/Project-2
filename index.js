const express = require("express");
const { connectMongo } = require("./Connection/connection");
const app = express();
const { router } = require("./Router/router");
const port = 3000;
require("dotenv").config();

connectMongo(process.env.mognoUrl).then(() => {
  console.log("Connected to MongoDB");
});

// middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Nothing in this page");
});

//routes
app.use("/api/v1/tasks", router);

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
