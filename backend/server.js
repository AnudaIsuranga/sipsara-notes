const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// 1. Load environment variables
dotenv.config();

// 2. Import Routes
const authRoutes = require("./routes/authRoutes"); 
const subjectRoutes = require("./routes/subjectRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const noteRoutes = require("./routes/noteRoutes");

// 3. Create Express App
const app = express();

// 4. Middleware Setup
// UPDATED: Now allows your live Vercel site to bypass the CORS "security guard"
const corsOptions = {
  origin: [
    "http://localhost:5173",             // Allows your laptop
    "https://sipsara-notes.vercel.app",  // Your actual Vercel URL
    process.env.FRONTEND_URL             // Reads the variable you set on Render
  ], 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions)); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// 5. Serving static files (Keep this for local testing, Cloudinary handles production)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 6. Route Middleware
app.use("/api/auth", authRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/notes", noteRoutes);

// 7. MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error);
  });

// 8. Base Test Route
app.get("/", (req, res) => {
  res.send("🚀 Sipsara Notes API is live and running!");
});

// 9. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});