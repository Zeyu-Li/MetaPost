const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();

// takes in json
app.use(express.json({ limit: "1mb" }));
app.use(fileUpload());

// not sure if we need cors but we'll keep it for now
app.use(cors());

app.get("/api", function (req, res) {
  res.send("Hello World!");
});

// controller
app.listen(3000, () => {
  // console.log("Started Server")
});

module.exports = app;