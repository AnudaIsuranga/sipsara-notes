const multer = require("multer");
const path = require("path");
const fs = require("fs"); // NEW: Node's built-in File System module

// NEW: Automatically create the 'uploads' folder if it doesn't exist!
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Save to our guaranteed folder
  },
  filename: function (req, file, cb) {
    // Add the current timestamp to the filename to make it unique
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

module.exports = upload;