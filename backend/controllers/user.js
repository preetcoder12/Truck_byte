require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password);
};

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

const ViewAllUsers = async (req, res) => {
    try {
        const allusers = await User.find({});
        if (!allusers) {
            return res.status(400).json({ msg: "No user found" });
        }
        res.status(200).json(allusers);
    } catch (error) {
        console.error("❌ users fetching  error:", error);
        res.status(500).json({ error: error.message || "Server error during fetching users details." });
    }
}


const GoogleAuth = async (req, res) => {
    try {
        const { email, username, googleId } = req.body;

        let user = await User.findOne({ googleId });

        if (!user) {
            user = await User.create({ email, username, googleId });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

        res.status(200).json({
            message: "Google authentication successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("❌ Google Signup error:", error);
        res.status(500).json({ error: error.message || "Server error during Google signup." });
    }
};

const ViewSpecificUsers = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });  // Use 404 instead of 400
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal Server Error" }); // Handle errors properly
    }
};
const Usersupdate = async (req, res) => {
    try {
        const UserId = req.params.id;
        const updateData = req.body;

        const updateuser = await User.findByIdAndUpdate(
            UserId,
            updateData,
            { new: true, runValidators: true } // Ensures validation
        );

        if (!updateuser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updateuser);

    } catch (error) {
        console.error("User update error:", error);
        res.status(500).json({ error: "Server error during updating user information!" });
    }
};

module.exports = { userSignup, userLogin, ViewAllUsers, GoogleAuth, ViewSpecificUsers, Usersupdate };
