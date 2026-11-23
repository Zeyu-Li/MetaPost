const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const processCaption = require("./util/processImageCaption");

require("dotenv").config();

const app = express();

// Azure Computer Vision accepts images up to 4 MB, so larger uploads could never succeed.
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
// The image types both the frontend and Azure Computer Vision support, with the extension they are stored under.
// SVG is deliberately excluded: it can carry scripts, and Azure does not accept it.
const IMAGE_EXTENSIONS = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};
const UPLOAD_DIR = path.join(__dirname, "uploads");
const UPLOADED_FILENAME = /^[0-9a-f-]{36}\.(jpg|png|gif)$/;

fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// takes in json
app.use(express.json({ limit: "1mb" }));

// Storage setup for multer. Files get random names so one person's upload cannot be found by guessing.
const storage = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename: function (req, file, cb) {
    cb(null, `${crypto.randomUUID()}.${IMAGE_EXTENSIONS[file.mimetype]}`);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: MAX_UPLOAD_BYTES, files: 1 },
  fileFilter: function (req, file, cb) {
    cb(null, Object.hasOwn(IMAGE_EXTENSIONS, file.mimetype));
  },
});

// not sure if we need cors but we'll keep it for now
app.use(cors());

app.get("/api", async function (req, res) {
  res.send("Hello World!");
  // const testCaption = "hi THERE HEllo HAVING 😀😃😄😁 #havingfun #livelyhuman";
  // const finPostCaption = await processPostCaption(testCaption, process.env.RAPID_API_KEY);
  // res.send(finPostCaption);
});

app.post(
  "/api/process_post",
  upload.single("uploaded_file"),
  async function (req, res) {
    const file = req.file;
    const caption = req.body.caption;
    if (!file) {
      return res.status(400).json({ error: "Please upload a JPEG, PNG or GIF image" });
    }
    const imageDes = await processCaption.genCaptionImage(
      process.env.AZURE_API_KEY,
      file.path
    );
    let finPostCaption = caption;

    const obj = {
      filename: file.filename,
      fileDescription: imageDes,
      caption: finPostCaption,
    };
    res.json(obj);
  }
);

app.get("/api/get_image/:id", (req, res) => {
  const id = req.params.id;
  if (!UPLOADED_FILENAME.test(id)) {
    return res.status(404).end();
  }
  res.sendFile(id, {
    root: UPLOAD_DIR,
    headers: { "X-Content-Type-Options": "nosniff" },
  });
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    const status = err.code === "LIMIT_FILE_SIZE" ? 413 : 400;
    return res.status(status).json({ error: err.message });
  }
  if (err.status === 404) {
    return res.status(404).end();
  }
  console.error(err);
  res.status(500).json({ error: "Could not process the image" });
});

// controller
const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log("Started Server on " + port);
});

module.exports = app;
