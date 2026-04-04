const Teacher = require("../models/Teacher");

exports.addTeacher = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file received." });
    }

    const photoUrl = req.file.path;

    const newTeacher = await Teacher.create({
      name: req.body.name,
      subject: req.body.subject,
      contact: req.body.contact,
      description: req.body.description,
      photo: photoUrl,
    });

    res.status(201).json({
      message: "Teacher added successfully!",
      teacher: newTeacher,
    });
  } catch (error) {
    console.error("Add Teacher Error:", error);
    res.status(500).json({
      message: "Failed to add teacher",
      error: error.message,
    });
  }
};

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ createdAt: -1 });
    res.status(200).json(teachers);
  } catch (error) {
    console.error("Get Teachers Error:", error);
    res.status(500).json({ message: "Error fetching teachers" });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Teacher removed successfully" });
  } catch (error) {
    console.error("Delete Teacher Error:", error);
    res.status(500).json({ message: "Delete failed" });
  }
};