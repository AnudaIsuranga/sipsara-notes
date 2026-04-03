const Subject = require("../models/Subject");

// 1. Get all subjects
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ level: -1, name: 1 });
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subjects" });
  }
};

// 2. Add a single subject manually (if needed)
exports.addSubject = async (req, res) => {
  try {
    const newSubject = await Subject.create(req.body);
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(500).json({ message: "Error adding subject" });
  }
};

// 3. Seed all GCE subjects
exports.seedSubjects = async (req, res) => {
  try {
    const olSubjects = ["Sinhala", "English", "History", "Mathematics", "Religion", "Life skills", "ICT", "Art", "Commerce"];
    const alSubjects = ["Combined Mathematics", "Physics", "Chemistry", "Bio", "Accounting", "Business Studies", "Economics", "History", "Sinhala", "Logic", "ET", "BST", "ICT"];

    await Subject.deleteMany({}); // Clears database first

    const subjectsToCreate = [
      ...olSubjects.map(name => ({ name, level: "O/L" })),
      ...alSubjects.map(name => ({ name, level: "A/L" }))
    ];

    await Subject.insertMany(subjectsToCreate);
    res.status(201).json({ message: "Subjects seeded successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Seeding failed", error: error.message });
  }
};