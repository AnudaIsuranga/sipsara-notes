const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name, email, password: hashedPassword, role: "student" // FORCED TO STUDENT
    });

    res.status(201).json({ message: "Registered successfully!", token: generateToken(user._id, user.role), user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) { res.status(500).json({ message: "Server Error" }); }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    res.status(200).json({ message: "Login successful!", token: generateToken(user._id, user.role), user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) { res.status(500).json({ message: "Server Error" }); }
};

// NEW: Change Password
exports.changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { oldPassword, newPassword } = req.body;

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect old password" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) { res.status(500).json({ message: "Server Error" }); }
};

// NEW: Create Master Admin
exports.seedAdmin = async (req, res) => {
  try {
    const adminExists = await User.findOne({ email: "admin@sipsara.com" });
    if (adminExists) return res.status(400).json({ message: "Admin already exists!" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    await User.create({ name: "Master Admin", email: "admin@sipsara.com", password: hashedPassword, role: "admin" });
    res.status(201).json({ message: "Admin created! Email: admin@sipsara.com, Pass: admin123" });
  } catch (error) { res.status(500).json({ message: "Server Error" }); }
};