const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true // Removes accidental spaces
  },
  level: {
    type: String,
    required: true,
    enum: ["O/L", "A/L"], // Strictly matches your frontend buttons
  },
  stream: {
    type: String,
    default: "Common", // Useful for future A/L filtering (Maths, Bio, etc.)
  }
}, { 
  timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model("Subject", subjectSchema);