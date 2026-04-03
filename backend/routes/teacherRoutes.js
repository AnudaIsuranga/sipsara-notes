const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config/cloudinary"); // Import the cloud config
const { addTeacher, getTeachers, deleteTeacher } = require("../controllers/teacherController");

// Use the cloud storage instead of diskStorage
const upload = multer({ storage });

router.get("/", getTeachers);

// 'photo' matches the name attribute in your Admin.jsx form
router.post("/add", upload.single("photo"), addTeacher);

router.delete("/:id", deleteTeacher);

module.exports = router;