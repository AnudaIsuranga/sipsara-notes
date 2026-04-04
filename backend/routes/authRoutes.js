const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  changePassword,
  seedAdmin,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/change-password", protect, changePassword);
router.post("/seed-admin", seedAdmin);

module.exports = router;