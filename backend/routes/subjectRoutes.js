const express = require("express");
const router = express.Router();

// IMPORT: These names MUST match the exports in the controller file exactly
const { 
  getSubjects, 
  addSubject, 
  seedSubjects 
} = require("../controllers/subjectController");

// Route 1: Get all
router.get("/", getSubjects);

// Route 2: Add one
router.post("/add", addSubject);

// Route 3: Seed (This is likely your Line 13)
router.post("/seed", seedSubjects);

module.exports = router;