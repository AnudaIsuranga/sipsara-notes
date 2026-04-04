const Note = require("../models/Note");
const { cloudinary } = require("../config/cloudinary");

exports.addNote = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No PDF file received." });
    }

    const { title, category, medium, subject, teacher } = req.body;

    if (!title || !category || !medium || !subject) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newNote = await Note.create({
      title,
      category,
      medium,
      subject,
      teacher: teacher || null,
      fileUrl: req.file.path,
      filePublicId: req.file.filename,
    });

    return res.status(201).json({
      message: "PDF uploaded successfully!",
      note: newNote,
    });
  } catch (error) {
    console.error("Add Note Error:", error);
    return res.status(500).json({
      message: "Failed to add note",
      error: error.message,
    });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const query = {};

    if (req.query.subjectId) query.subject = req.query.subjectId;
    if (req.query.category) query.category = req.query.category;
    if (req.query.search) {
      query.title = { $regex: req.query.search, $options: "i" };
    }

    const notes = await Note.find(query)
      .populate("subject", "name level")
      .populate("teacher", "name subject")
      .sort({ createdAt: -1 });

    return res.status(200).json(notes);
  } catch (error) {
    console.error("Fetch Notes Error:", error);
    return res.status(500).json({ message: "Failed to fetch notes" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.filePublicId) {
      await cloudinary.uploader.destroy(note.filePublicId, {
        resource_type: "raw",
        invalidate: true,
      });
    }

    await Note.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Deleted successfully!" });
  } catch (error) {
    console.error("Delete Note Error:", error);
    return res.status(500).json({ message: "Failed to delete note" });
  }
};