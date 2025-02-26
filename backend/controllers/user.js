require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// User Signup Controller
const userSignup = async (req, res) => {
    try {
        const { username, email, password, phone } = req.body;
        if (!username || !email || !password || !phone) {
            return res.status(400).json({ error: "Please fill all fields" });
        }
        if (password.length < 4) {
            return res.status(400).json({ error: "Password must be at least 4 characters long " });
        }
        if (phone.length < 10) {
            return res.status(400).json({ error: "Phone number must be at least 10 characters long" });
        }
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPass,
            phone,
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ error: "Server error during signup" });
    }
};

// User Login Controller
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
        res.cookie("token", token, { httpOnly: true });
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
        res.status(500).json({ error: "Server error during login" });
    }
};

module.exports = { userSignup, userLogin };
