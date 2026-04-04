const express = require("express");
const router = express.Router();

const {
  getSubjects,
  addSubject,
  seedSubjects,
} = require("../controllers/subjectController");

const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", getSubjects);
router.post("/add", protect, admin, addSubject);
router.post("/seed", protect, admin, seedSubjects);

module.exports = router;