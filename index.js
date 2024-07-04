const express = require("express");
const { connectMongo } = require("./Connection/connection");
const app = express();
const { router } = require("./Router/router");

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
app.use("/user", router);

app.listen(process.env.port || 3000, () => {
  console.log(`Server is running on port ${process.env.port}`);
});
