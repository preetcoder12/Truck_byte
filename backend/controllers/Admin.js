const Admin = require("../models/Admin");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AdminSignUp = async (req, res) => {
    const { username, email, secretCode, password } = req.body;
    console.log("ok1");

    try {
        let user = await Admin.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });
        console.log("ok2");

        if (secretCode !== process.env.ADMIN_SECRET) {
            return res.status(403).json({ message: "Invalid Admin Secret Code" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({
            username,
            email,
            password: hashedPass,
            is_Admin: true,
        });

        await newAdmin.save();

        const token = jwt.sign({ id: newAdmin._id, isAdmin: true }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(201).json({ message: "Admin registered successfully", token });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


const AdminLogin = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Fill all details properly!" });
        }
        const existing_admin = await Admin.findOne({ email });
        if (!existing_admin) {
            return res.status(400).json({ error: "Email not registered!" });
        }
        const is_match = await bcrypt.compare(password, existing_admin.password);
        if (!is_match) {
            return res.status(400).json({ error: "password not matched!" });

        }
        const token = jwt.sign({ id: existing_admin.id }, process.env.JWT_SECRET, { expiresIn: "24h" });
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
                id: existing_admin._id,
                username: existing_admin.username,
                email: existing_admin.email,
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Server error during login" });
    }
}




module.exports = { AdminSignUp, AdminLogin };
