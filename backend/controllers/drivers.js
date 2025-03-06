require("dotenv").config();
const Driver = require("../models/driver");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET;
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
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Request body is empty." });
        }

        const { drivername, age, email, phone, gender, licenseNumber, licenseType, experience, address, emergencyContact, bankDetails, status } = req.body;

        const photo = req.file ? req.file.filename : null;

        if (!drivername || !age || !email || !phone || !photo || !gender || !licenseNumber || !licenseType || !experience || !address || !emergencyContact || !bankDetails) {
            return res.status(400).json({ error: "All fields are required." });
        }

        if (age < 18) return res.status(400).json({ error: "Age should be at least 18." });
        if (experience <= 0) return res.status(400).json({ error: "Experience should be greater than 0." });
        if (!/^\d{10}$/.test(phone)) return res.status(400).json({ error: "Phone number must be exactly 10 digits." });
        if (!/^[A-Z]{2}\d{12}$/.test(licenseNumber)) return res.status(400).json({ error: "License number must be in format (Example: DL123456789123)." });

        if (!bankDetails.accountNumber || !/^\d{9,18}$/.test(bankDetails.accountNumber)) {
            return res.status(400).json({ error: "Account number must be between 9 to 18 digits." });
        }
        if (!bankDetails.ifscCode || !/^[A-Z]{4}\d{7}$/.test(bankDetails.ifscCode)) {
            return res.status(400).json({ error: "Invalid IFSC code format." });
        }
        if (!emergencyContact.phone || !/^\d{10}$/.test(emergencyContact.phone)) {
            return res.status(400).json({ error: "Emergency contact number must be 10 digits." });
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            return res.status(400).json({ error: "Invalid email format." });
        }

        const driverExist = await Driver.findOne({ $or: [{ email }, { phone }, { licenseNumber }] });
        if (driverExist) {
            return res.status(400).json({ error: "Driver already registered with provided email, phone, or license number." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashAccountNumber = await bcrypt.hash(bankDetails.accountNumber, salt);

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

        await newDriver.save();

        const drivertoken = jwt.sign({ id: newDriver._id }, JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ message: "Driver details filled successfully.", drivertoken, driverId: newDriver._id });

    } catch (error) {
        console.error("Driver fill error:", error);
        res.status(500).json({ error: "Server error during driver details fill." });
    }
};



const DriverDetails = async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id);
        res.json(driver);
    } catch (error) {
        console.error("Driver details error:", error);
        res.status(500).json({ error: "Server error during driver details fetching !." });
    }
}

const LoginAsDriver = async (req, res) => {
    const { email, phone } = req.body;
    try {
        let driver = await Driver.findOne({ $or: [{ email }, { phone }] });
        if (!driver) return res.status(400).json({ message: "Driver not found" });

        const token = jwt.sign({ id: driver._id }, "yourSecretKey", { expiresIn: "1h" });

        res.json({
            driverId: driver._id,
            driverToken: token,
            driverDetails: {
                name: driver.drivername,
                email: driver.email,
                phone: driver.phone,
                photo: driver.photo,
                gender: driver.gender,
                licenseNumber: driver.licenseNumber,
                licenseType: driver.licenseType,
                experience: driver.experience,
                status: driver.status,
            },
            message: "Login Successful"
        });

    } catch (error) {
        console.error("Driver details error:", error);
        res.status(500).json({ error: "Server error during driver signin!." });
    }
}

const DriverDetailsupdate = async (req, res) => {
    try {
        const driverId = req.params.id;
        const updateData = req.body;
        const updatedriver = await Driver.findByIdAndUpdate(driverId, updateData, { new: true });

        if (!updatedriver) {
            return res.status(404).json({ message: "Driver not found" });
        }
        res.status(200).json(updatedriver);

    } catch (error) {
        console.error("Driver edit error:", error);
        res.status(500).json({ error: "Server error during driver details editing!." });
    }
}


module.exports = { FillDriverDetails, upload, DriverDetails, LoginAsDriver, DriverDetailsupdate };
