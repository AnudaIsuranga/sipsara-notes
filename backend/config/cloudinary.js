const cloudinary = require("cloudinary").v2; // Keep the .v2 here
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true // 🔒 THE MAGIC FIX: This forces Cloudinary to generate HTTPS links!
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "sipsara_uploads",
    resource_type: "auto", 
    allowed_formats: ["jpg", "png", "jpeg", "pdf"],
  },
});

module.exports = { cloudinary, storage };