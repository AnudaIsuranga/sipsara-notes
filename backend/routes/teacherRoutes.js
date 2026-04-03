const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config/cloudinary"); // This imports the config
const { addTeacher, getTeachers, deleteTeacher } = require("../controllers/teacherController");

const upload = multer({ storage });

router.get("/", getTeachers);
router.post("/add", upload.single("photo"), addTeacher);
router.delete("/:id", deleteTeacher);

module.exports = router;