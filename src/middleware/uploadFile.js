const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads");
  },
  filename: (req, file, cb) => {
    const uniqe = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extFile = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqe + extFile);
  },
});

const upload = multer({ storage });
module.exports = upload;
