const Teacher = require("../models/Teacher");

exports.addTeacher = async (req, res) => {
  try {
    // 1. Check if the file actually reached the backend
    if (!req.file) {
      return res.status(400).json({ message: "No file received. Please select an image." });
    }

    // 2. Cloudinary returns the full HTTPS URL in req.file.path
    const photoUrl = req.file.path; 
    console.log("✅ Successfully uploaded to Cloudinary:", photoUrl);

    // 3. Create the teacher in MongoDB
    const newTeacher = await Teacher.create({
      name: req.body.name,
      subject: req.body.subject,
      contact: req.body.contact,
      description: req.body.description,
      photo: photoUrl
    });

    res.status(201).json(newTeacher);
  } catch (error) {
    // 4. Send the REAL error message to the browser so we can see it
    console.error("🔥 Teacher Upload Error:", error);
    res.status(500).json({ 
      message: "Cloud upload failed", 
      error: error.message 
    });
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