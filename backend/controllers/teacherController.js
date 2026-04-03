const Teacher = require("../models/Teacher");

exports.addTeacher = async (req, res) => {
  try {
    const photo = req.file ? `/uploads/${req.file.filename}` : "";
    const teacher = await Teacher.create({ ...req.body, photo });
    res.status(201).json(teacher);
  } catch (error) {
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