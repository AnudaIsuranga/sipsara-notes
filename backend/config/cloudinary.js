const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

// ==============================
// STORAGE FOR TEACHER IMAGES
// ==============================
const teacherImageStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "sipsara_teachers",
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  }),
});

// ==============================
// STORAGE FOR NOTE/PAPER PDFs
// ==============================
const pdfStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "sipsara_notes",
    resource_type: "raw",
    format: "pdf",
    public_id: `${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, "").replace(/\s+/g, "-")}`,
  }),
});

module.exports = {
  cloudinary,
  teacherImageStorage,
  pdfStorage,
};