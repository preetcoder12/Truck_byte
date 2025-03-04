const Admin = require("../models/Admin");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AdminSignUp = async (req, res) => {
    const { username, email, secretCode, password } = req.body;
console.log("ok1")
try {
    // Check if the email is already registered
    let user = await Admin.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });
    console.log("ok2")

        // Validate Admin Secret Code
        if (secretCode !== process.env.ADMIN_SECRET) {
            return res.status(403).json({ message: "Invalid Admin Secret Code" });
        }

        // Hash the password securely
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        // Create a new Admin user
        const newAdmin = new Admin({
            username,
            email,
            password: hashedPass,
            is_Admin: true,  // Ensuring it's an Admin
        });

        // Save the Admin in the database
        await newAdmin.save();

        // Generate a JWT Token
        const token = jwt.sign({ id: newAdmin._id, isAdmin: true }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Send a success response
        res.status(201).json({ message: "Admin registered successfully", token });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { AdminSignUp };
