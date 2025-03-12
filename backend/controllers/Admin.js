const Admin = require("../models/Admin");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Truck } = require("../models/trucks");
const Driver = require("../models/driver");
const User = require("../models/user");

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

const ViewAllTrucks = async (req, res) => {
    try {
        const trucks = await Truck.find({});
        if (!trucks || trucks.length === 0) {
            return res.status(404).json({ error: "❌ No trucks found!" });
        }
        res.status(200).json(trucks);


    } catch (error) {
        console.error("❌ Truck fetching  error:", error);
        res.status(500).json({ error: error.message || "Server error during fetching trucks details." });
    }
}

const ViewAllDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find({});
        if (!drivers || drivers.length == 0) {
            return res.status(404).json({ error: "❌ No Driver found!" });
        }
        res.status(200).json(drivers);

    } catch (error) {
        console.error("❌ Truck fetching  error:", error);
        res.status(500).json({ error: error.message || "Server error during fetching drievrs details." });
    }
}

const RemoveDriver = async (req, res) => {
    try {
        const selectedDriver = await Driver.findById(req.params.id);
        if (!selectedDriver) {
            return res.status(404).json({ message: "Driver not found" });
        }
        await Driver.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Driver removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const RemoveUser = async (req, res) => {
    try {
        const selectedUser = await User.findById(req.params.id);
        if (!selectedUser) {
            return res.status(404).json({ msg: "No user found" });
        }
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "User removed successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};



const RequestedAddTrucks = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const EditTruckDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedTruck = await Truck.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

        if (!updatedTruck) {
            return res.status(404).json({ msg: "No truck found" });
        }

        res.status(200).json({ message: "Truck details updated successfully", truck: updatedTruck });

    } catch (error) {
        console.error("🚨 Error updating truck:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
const DeleteTruck = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTruck = await Truck.findByIdAndDelete(id);

        if (!deletedTruck) {
            return res.status(404).json({ msg: "Truck not found" });
        }

        const updatedTrucks = await Truck.find({ requestStatus: "pending" });

        res.status(200).json({ msg: "Deleted successfully", updatedTrucks });

    } catch (error) {
        console.error("🚨 Error deleting truck:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


module.exports = {
    AdminSignUp, AdminLogin, ViewAllTrucks, ViewAllDrivers,
    RemoveDriver, RemoveUser, RequestedAddTrucks, EditTruckDetails, DeleteTruck
};