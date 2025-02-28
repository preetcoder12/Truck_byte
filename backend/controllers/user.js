require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 🔹 Validate Email Format
const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// 🔹 Validate Password Strength
const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password);
};

// 🔹 User Signup Controller
const userSignup = async (req, res) => {
    try {
        const { username, email, password, phone } = req.body;

        if (!username || !email || !password || !phone) {
            return res.status(400).json({ error: "Please fill all fields" });
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }
        if (!validatePassword(password)) {
            return res.status(400).json({ error: "Password must be at least 6 characters long, contain uppercase, lowercase, number, and special character" });
        }
        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({ error: "Phone number must be exactly 10 digits" });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPass, phone });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Server error during signup" });
    }
};

// 🔹 User Login Controller
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill all fields" });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ error: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000, 
        })
        res.status(200).json({
            message: "User logged in successfully",
            token,
            user: {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                phone: existingUser.phone
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Server error during login" });
    }
};

module.exports = { userSignup, userLogin };
