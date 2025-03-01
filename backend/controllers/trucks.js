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
            truckNumber, model, manufacturer, registrationDate,
            insuranceExpiry, capacity, truckType, status, ownerType
        } = req.body;

        const images = req.files && req.files.length > 0
            ? req.files.map(file => `/uploads/trucks/${file.filename}`)
            : [];

        if (!truckNumber || !model || images.length === 0 || !manufacturer || !registrationDate ||
            !insuranceExpiry || !capacity || !truckType || !status || !ownerType) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        const ownerId = req.user.id;

        const existingTruck = await Truck.findOne({ truckNumber });
        if (existingTruck) {
            return res.status(400).json({ error: "Truck already exists with this number!" });
        }

        // Create New Truck
        const newTruck = new Truck({
            truckNumber, model, manufacturer, registrationDate,
            insuranceExpiry, capacity, truckType, status, ownerType, ownerId,
            images
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

module.exports = { Addtruck, upload };
