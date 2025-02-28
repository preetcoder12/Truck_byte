const Driver = require("../models/driver");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "../uploads");
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

const FillDriverDetails = async (req, res) => {
    try {
        // Handle potential empty request body
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Request body is empty." });
        }

        const {
            drivername,
            age,
            email,
            phone,
            gender,
            licenseNumber,
            licenseType,
            experience,
            address,
            emergencyContact,
            bankDetails,
            status
        } = req.body;

        // Handle photo upload
        const photo = req.file ? req.file.filename : null;

        console.log("Before validation");
        console.log("Raw request body:", req.body);

        // Validate required fields
        if (!drivername || !age || !email || !phone || !photo || !gender || !licenseNumber || !licenseType || !experience || !address || !emergencyContact || !bankDetails) {
            return res.status(400).json({ error: "All fields are required." });
        }

        if (age < 18) {
            return res.status(400).json({ error: "Age should be at least 18." });
        }

        if (experience <= 0) {
            return res.status(400).json({ error: "Experience should be greater than 0." });
        }

        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({ error: "Phone number must be exactly 10 digits." });
        }

        if (!/^[A-Z]{2}\d{12}$/.test(licenseNumber)) {
            return res.status(400).json({ error: "License number must start with 2 uppercase letters followed by exactly 12 digits (Example: DL123456789123)." });
        }

        if (!bankDetails.accountNumber || !/^\d{9,18}$/.test(bankDetails.accountNumber)) {
            return res.status(400).json({ error: "Account number must be between 9 to 18 digits." });
        }

        if (!bankDetails.ifscCode || !/^[A-Z]{4}\d{7}$/.test(bankDetails.ifscCode)) {
            return res.status(400).json({ error: "Invalid IFSC code format. Example: SBIN0001234" });
        }

        if (!emergencyContact.phone || !/^\d{10}$/.test(emergencyContact.phone)) {
            return res.status(400).json({ error: "Emergency contact number must be exactly 10 digits." });
        }

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            return res.status(400).json({ error: "Invalid email format." });
        }

        // Check if driver already exists
        const driverExist = await Driver.findOne({
            $or: [{ email }, { phone }, { licenseNumber }]
        });

        if (driverExist) {
            return res.status(400).json({ error: "Driver already registered with provided email, phone, or license number." });
        }

        // Hash account number securely
        const salt = await bcrypt.genSalt(10);
        const hashAccountNumber = await bcrypt.hash(bankDetails.accountNumber, salt);

        // Create a new driver
        const newDriver = new Driver({
            drivername,
            age,
            email,
            phone,
            photo,
            gender,
            licenseNumber,
            licenseType,
            experience,
            address: {
                street: address.street,
                city: address.city,
                state: address.state,
                pincode: address.pincode
            },
            emergencyContact: {
                name: emergencyContact.name,
                phone: emergencyContact.phone,
                relation: emergencyContact.relation
            },
            bankDetails: {
                accountNumber: hashAccountNumber,
                ifscCode: bankDetails.ifscCode,
                bankName: bankDetails.bankName
            },
            status
        });

        console.log("Received request body:", req.body);
        await newDriver.save();

        res.status(201).json({ message: "Driver details filled successfully." });

    } catch (error) {
        console.error("Driver fill error:", error);
        res.status(500).json({ error: "Server error during driver details fill." });
    }
};

module.exports = { FillDriverDetails, upload };
