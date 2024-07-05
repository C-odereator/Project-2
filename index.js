const express = require("express");
const { connectMongo } = require("./Connection/connection");
const { URL } = require("./Models/models");
const path = require("path");
const app = express();
const { router } = require("./Router/router");

require("dotenv").config();
connectMongo(process.env.mognoUrl).then(() => {
  console.log("Connected to MongoDB");
});

// set the view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./Views"));

// middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Nothing in this page");
});

app.get("/test", (req, res) => {
  const allURL = URL.find({});
  res.json(allURL);
  // return res.render("home", {
  //   urls: allURL,
  //   names: ["nothing", "ntohi", "asd", "eehtethet"],
  //   name: "nothing",
  // });
});

//routes
app.use("/user", router);

app.get("/user/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(process.env.port || 3000, () => {
  console.log(`Server is running on port ${process.env.port}`);
});
