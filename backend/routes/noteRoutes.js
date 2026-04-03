const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config/cloudinary"); // Same import!
const { addNote, getAllNotes, deleteNote } = require("../controllers/noteController");
const { protect, admin } = require("../middleware/authMiddleware");

const upload = multer({ storage });

router.get("/", getAllNotes);
router.post("/add", protect, admin, upload.single("file"), addNote);
router.delete("/:id", protect, admin, deleteNote);

module.exports = router;