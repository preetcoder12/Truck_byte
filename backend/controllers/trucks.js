const { Truck } = require("../models/trucks");

const multer = require("multer");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const uploadDir = path.join(__dirname, "../uploads/trucks");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage });
const Addtruck = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized. Invalid token." });
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Request body is empty." });
        }

        const {
            truckNumber, model, manufacturer, registrationDate, insuranceExpiry,
            capacity, truckType, status, ownerType, pricePerKm, contactInfo
        } = req.body;

        const images = req.files && req.files.length > 0
            ? req.files.map(file => `/uploads/trucks/${file.filename}`)
            : [];

        if (!truckNumber || !model || images.length === 0 || !manufacturer || !registrationDate ||
            !insuranceExpiry || !capacity || !truckType || !status || !ownerType ||
            !pricePerKm || !contactInfo || !contactInfo.name || !contactInfo.phone || !contactInfo.email) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        const ownerId = req.user.id;

        const existingTruck = await Truck.findOne({ truckNumber });
        if (existingTruck) {
            return res.status(400).json({ error: "Truck already exists with this number!" });
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(contactInfo.phone)) {
            return res.status(400).json({ error: "Invalid phone number format. Must be 10 digits." });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contactInfo.email)) {
            return res.status(400).json({ error: "Invalid email format." });
        }

        // Create New Truck
        const newTruck = new Truck({
            truckNumber, model, manufacturer, registrationDate, insuranceExpiry, capacity,
            truckType, status, ownerType, ownerId, pricePerKm, contactInfo, images
        });

        await newTruck.save();

        // Generate Truck Token
        const trucktoken = jwt.sign({ id: newTruck._id }, JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({
            message: "Truck added successfully!",
            trucktoken,
            truckId: newTruck._id,
            truck: newTruck
        });

    } catch (error) {
        console.error("❌ Truck fill error:", error);
        res.status(500).json({ error: error.message || "Server error during truck details fill." });
    }
};


const Alltrucks = async (req, res) => {
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

const GetTruckById = async (req, res) => {
    try {
        const truckId = req.params.id;

        if (!truckId) {
            return res.status(400).json({ error: "Truck ID is required!" });
        }

        const truck = await Truck.findOne({ _id: truckId });
        if (!truck) {
            return res.status(404).json({ error: "Truck not found!" });
        }

        res.status(200).json(truck);
    } catch (error) {
        console.error("❌ Error fetching truck by ID:", error);
        res.status(500).json({ error: error.message || "Server error while fetching truck details." });
    }
};


module.exports = { Addtruck, upload, Alltrucks, GetTruckById };
