const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Import your controllers and middleware
const { addNote, getAllNotes, deleteNote } = require("../controllers/noteController");
const { protect, admin } = require("../middleware/authMiddleware");

// 1. Configure Cloudinary (Uses variables from your .env file)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// 2. Set up Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "sipsara_notes", // This is the folder name that will appear in your Cloudinary dashboard
    resource_type: "auto",   // Important: This allows both PDFs and Images
    allowed_formats: ["pdf", "jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage: storage });

// 3. Define Routes
// Anyone can view notes
router.get("/", getAllNotes);

// Only Admin can add (now uploading to Cloudinary)
router.post("/add", protect, admin, upload.single("file"), addNote);

// Only Admin can delete
router.delete("/:id", protect, admin, deleteNote);

module.exports = router;