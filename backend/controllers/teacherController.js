const Teacher = require("../models/Teacher");

exports.addTeacher = async (req, res) => {
  try {
    // Check if the file actually reached the server
    if (!req.file) {
      return res.status(400).json({ message: "No photo uploaded. Please select an image." });
    }

    // IMPORTANT: Cloudinary uses 'path', not 'filename'
    const photoUrl = req.file.path; 

    const newTeacher = await Teacher.create({
      name: req.body.name,
      subject: req.body.subject,
      contact: req.body.contact,
      description: req.body.description,
      photo: photoUrl // This will be the https://res.cloudinary link
    });

    res.status(201).json(newTeacher);
  } catch (error) {
    console.error("Teacher Upload Error:", error);
    res.status(500).json({ message: "Server error during upload" });
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