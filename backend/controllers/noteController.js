const Note = require("../models/Note");

exports.addNote = async (req, res) => {
  try {
    // IMPORTANT: Cloudinary returns the full URL in req.file.path
    // This will look like: https://res.cloudinary.com/Root/image/upload/v123/sipsara_notes/abc.pdf
    const fileUrl = req.file ? req.file.path : "";

    if (!fileUrl) {
      return res.status(400).json({ message: "File upload failed. Please try again." });
    }

    // Create the note using the data from the Admin form + the Cloudinary URL
    const newNote = await Note.create({ 
      ...req.body, 
      fileUrl 
    });

    res.status(201).json({ 
      message: "Upload successful and saved to Cloudinary!", 
      note: newNote 
    });
  } catch (error) {
    console.error("Add Note Error:", error);
    res.status(500).json({ message: "Failed to add item to database" });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    let query = {};
    
    // Filtering logic remains the same
    if (req.query.subjectId) query.subject = req.query.subjectId;
    if (req.query.category) query.category = req.query.category; 
    if (req.query.search) query.title = { $regex: req.query.search, $options: "i" };

    const notes = await Note.find(query)
      .populate("subject", "name level")
      .sort({ createdAt: -1 }); // Added sorting to show newest notes first

    res.status(200).json(notes);
  } catch (error) {
    console.error("Fetch Notes Error:", error);
    res.status(500).json({ message: "Failed to fetch data" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    // This deletes the entry from MongoDB. 
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted from database successfully!" });
  } catch (error) {
    console.error("Delete Note Error:", error);
    res.status(500).json({ message: "Failed to delete" });
  }
};