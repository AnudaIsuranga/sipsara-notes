const Teacher = require("../models/Teacher");
const { cloudinary } = require("../config/cloudinary");

exports.addTeacher = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file received." });
    }

    const newTeacher = await Teacher.create({
      name: req.body.name,
      subject: req.body.subject,
      contact: req.body.contact,
      description: req.body.description,
      photo: req.file.path,
      photoPublicId: req.file.filename,
    });

    return res.status(201).json({
      message: "Teacher added successfully!",
      teacher: newTeacher,
    });
  } catch (error) {
    console.error("Add Teacher Error:", error);
    return res.status(500).json({
      message: "Failed to add teacher",
      error: error.message,
    });
  }
};

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ createdAt: -1 });
    return res.status(200).json(teachers);
  } catch (error) {
    console.error("Get Teachers Error:", error);
    return res.status(500).json({ message: "Error fetching teachers" });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    if (teacher.photoPublicId) {
      await cloudinary.uploader.destroy(teacher.photoPublicId, {
        resource_type: "image",
        invalidate: true,
      });
    }

    await Teacher.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Teacher removed successfully" });
  } catch (error) {
    console.error("Delete Teacher Error:", error);
    return res.status(500).json({ message: "Delete failed" });
  }
};