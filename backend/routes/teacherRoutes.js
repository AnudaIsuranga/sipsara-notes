const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config/cloudinary"); 
const { addTeacher, getTeachers, deleteTeacher } = require("../controllers/teacherController");

const upload = multer({ storage });

router.get("/", getTeachers);

// 🛡️ THE X-RAY CATCHER
// This forces Multer to reveal why it is crashing
router.post("/add", (req, res, next) => {
  upload.single("photo")(req, res, function (err) {
    if (err) {
      console.error("🔥 CAUGHT MULTER ERROR:", err);
      // This sends the exact error message to your browser's Network tab
      return res.status(500).json({ 
        message: "The upload middleware crashed", 
        details: err.message || err 
      });
    }
    // If it passes the security check, go to the controller
    next();
  });
}, addTeacher);

router.delete("/:id", deleteTeacher);

module.exports = router;