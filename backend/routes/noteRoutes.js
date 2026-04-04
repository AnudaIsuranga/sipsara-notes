const express = require("express");
const router = express.Router();
const multer = require("multer");
const { teacherImageStorage } = require("../config/cloudinary");
const { addTeacher, getTeachers, deleteTeacher } = require("../controllers/teacherController");
const { protect, admin } = require("../middleware/authMiddleware");

const upload = multer({
  storage: teacherImageStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.get("/", getTeachers);

router.post("/add", protect, admin, (req, res, next) => {
  upload.single("photo")(req, res, function (err) {
    if (err) {
      console.error("Teacher upload error:", err);
      return res.status(500).json({
        message: "Teacher image upload failed",
        details: err.message || err,
      });
    }
    next();
  });
}, addTeacher);

router.delete("/:id", protect, admin, deleteTeacher);

module.exports = router;