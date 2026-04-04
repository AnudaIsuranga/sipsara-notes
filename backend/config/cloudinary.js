const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

const teacherImageStorage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: "sipsara_teachers",
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  }),
});

const pdfStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const originalName = file.originalname
      .replace(/\.[^/.]+$/, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-_]/g, "");

    return {
      folder: "sipsara_notes",
      resource_type: "raw",
      format: "pdf",
      public_id: `${Date.now()}-${originalName}`,
    };
  },
});

module.exports = {
  cloudinary,
  teacherImageStorage,
  pdfStorage,
};