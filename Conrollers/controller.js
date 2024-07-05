const shortid = require("shortid");
const { URL } = require("../Models/models.js");

const getAllTasks = async (req, res) => {
  try {
    const task = await URL.find({});
    res.status(200).json(task.shortId);
  } catch (error) {
    res.status(500).json({ message: "Not User Found" });
  }
};

const createTasks = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ msg: "error" });
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortID });
};

const analytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

// const analytics = (req, res) => {
//   // Extract shortId from request parameters
//   const shortId = req.params.shortId;

//   // Assuming URL is a Mongoose model
//   // Find the URL document in the database based on shortId
//   const result = URL.findOne({ shortId });

//   // Handle the result asynchronously using promises or async/await
//   result
//     .then((url) => {
//       // If URL with shortId is found
//       if (url) {
//         // Construct the response JSON
//         const responseJson = {
//           totalClicks: url.visitHistory.length, // Get total clicks from visitHistory array
//           analytics: url.visitHistory, // Return the entire visitHistory array
//         };

//         // Send the JSON response
//         return res.json(responseJson);
//       } else {
//         // If URL with shortId is not found, send 404 Not Found response
//         return res.status(404).json({ error: "URL not found" });
//       }
//     })
//     .catch((err) => {
//       // Handle any errors that occur during the database query
//       console.error("Error fetching analytics:", err);
//       return res.status(500).json({ error: "Internal server error" });
//     });
// };

module.exports = {
  getAllTasks,
  createTasks,
  analytics,
};
