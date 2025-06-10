const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./public/img/peliculas");
  },
  filename: (req, file, cb) => {
    return cb(null, `${uuidv4()}_pelicula_${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage
});

module.exports = upload;
