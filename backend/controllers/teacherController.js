const Teacher = require("../models/Teacher");

exports.addTeacher = async (req, res) => {
  try {
    // req.file.path is the FULL HTTPS URL provided by Cloudinary
    const photo = req.file ? req.file.path : "";

    if (!photo) {
      return res.status(400).json({ message: "Photo upload failed. Please try again." });
    }

    const teacher = await Teacher.create({ 
      ...req.body, 
      photo // This is now a secure https link
    });

    res.status(201).json(teacher);
  } catch (error) {
    console.error("Add Teacher Error:", error);
    res.status(500).json({ message: "Failed to add professional" });
  }
};

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ createdAt: -1 });
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching professionals" });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ message: "Professional removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};