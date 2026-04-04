const express = require("express");
const router = express.Router();
const multer = require("multer");

const { pdfStorage } = require("../config/cloudinary");
const {
  addNote,
  getAllNotes,
  deleteNote,
} = require("../controllers/noteController");
const { protect, admin } = require("../middleware/authMiddleware");

const upload = multer({
  storage: pdfStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.get("/", getAllNotes);

router.post("/add", protect, admin, (req, res, next) => {
  upload.single("file")(req, res, function (err) {
    if (err) {
      console.error("PDF upload error:", err);
      return res.status(500).json({
        message: "PDF upload failed",
        details: err.message || err,
      });
    }
    next();
  });
}, addNote);

router.delete("/:id", protect, admin, deleteNote);

module.exports = router;