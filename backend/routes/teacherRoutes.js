const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { addTeacher, getTeachers, deleteTeacher } = require("../controllers/teacherController");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get("/", getTeachers);
router.post("/add", upload.single("photo"), addTeacher);
router.delete("/:id", deleteTeacher);

module.exports = router;