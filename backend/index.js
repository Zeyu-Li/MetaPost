const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const fs = require('fs')
require('dotenv').config();

const app = express();

// takes in json
app.use(express.json({ limit: "1mb" }));
app.use(fileUpload());

// not sure if we need cors but we'll keep it for now
app.use(cors());

app.get("/api", function (req, res) {

  res.send("Hello World!");

});

app.get("/api/get_image/:id", (req, res) => {
  const id = req.params.id;
  const imagePath = `./uploads/${id}.jpg`
  fs.readFile(imagePath, (err, data) => {
    if (err) console.log(err);
    res.end(data); // Send the file data to the browser.
  })
})

// controller
app.listen(port=3005, () => {
  console.log("Started Server on " + port)
});

module.exports = app;
