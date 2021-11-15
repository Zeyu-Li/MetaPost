const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const fs = require('fs')
const multer = require('multer');
const processCaption = require('./util/processImageCaption');
const {processPostCaption} = require("./util/processPostedCaption");

require('dotenv').config();

const app = express();

// takes in json
app.use(express.json({ limit: "1mb" }));
// app.use(fileUpload());

// Storage setup for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, '' + 'im' + Date.now())
  }
})
const upload = multer({ storage: storage })

// not sure if we need cors but we'll keep it for now
app.use(cors());

app.get("/api", async function (req, res) {
  res.send("Hello World!");
  // const testCaption = "hi THERE HEllo HAVING 😀😃😄😁 #havingfun #livelyhuman";
  // const finPostCaption = await processPostCaption(testCaption, process.env.RAPID_API_KEY);
  // res.send(finPostCaption);
});


app.post("/api/process_post", upload.single('uploaded_file'), async function (req, res) {
  const file = req.file;
  const caption = req.body.caption;
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return res.send(error)
  }
  const imageDes = await processCaption.genCaptionImage(process.env.AZURE_API_KEY, file.path);
  let finPostCaption = caption;
  // try {
  //   finPostCaption = await processPostCaption(caption, process.env.RAPID_API_KEY);
  // }
  // catch (error) {
  //   console.log(error)
  //   finPostCaption = ""
  // }

  const obj = {
    filename: file.filename,
    fileDescription: imageDes,
    caption: finPostCaption
  };
  res.json(obj);
});

app.get("/api/get_image/:id", (req, res) => {
  const id = req.params.id;
  const imagePath = `./uploads/${id}`
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
