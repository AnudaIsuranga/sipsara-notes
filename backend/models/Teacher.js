const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    contact: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    photo: { type: String, required: true },
    photoPublicId: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);