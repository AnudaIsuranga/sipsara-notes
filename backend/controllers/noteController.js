const Note = require("../models/Note");

exports.addNote = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No PDF file received." });
    }

    const fileUrl = req.file.path;

    const newNote = await Note.create({
      ...req.body,
      fileUrl,
    });

    res.status(201).json({
      message: "PDF uploaded successfully!",
      note: newNote,
    });
  } catch (error) {
    console.error("Add Note Error:", error);
    res.status(500).json({
      message: "Failed to add note",
      error: error.message,
    });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    let query = {};

    if (req.query.subjectId) query.subject = req.query.subjectId;
    if (req.query.category) query.category = req.query.category;
    if (req.query.search) query.title = { $regex: req.query.search, $options: "i" };

    const notes = await Note.find(query)
      .populate("subject", "name level")
      .sort({ createdAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    console.error("Fetch Notes Error:", error);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully!" });
  } catch (error) {
    console.error("Delete Note Error:", error);
    res.status(500).json({ message: "Failed to delete note" });
  }
};