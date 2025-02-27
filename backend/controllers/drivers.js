const Driver = require("../models/driver");
const bcrypt = require("bcryptjs");


const Filldrivedrdetails = async (req, res) => {

    try {
        const {
            drivername,
            age,
            email,
            phone,
            photo,
            gender,
            licenseNumber,
            licenseType,
            experience,
            address,
            emergencyContact,
            bankDetails,
            status
        } = req.body;


        console.log("before validation");
        console.log("Raw request body:", req.body);

        if (!drivername || !age || !email || !phone || !photo || !gender || !licenseNumber || !licenseType || !experience || !address || !emergencyContact || !bankDetails) {
            return res.status(400).json({ error: "All fields are required." });
        }
        if (age < 18) {
            return res.status(400).json({ error: "Age should be at least 18." });
        }
        if (experience === 0) {
            return res.status(400).json({ error: "Experience should be greater than 0." });
        }
        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({ error: "Phone number must be exactly 10 digits." });
        }
        if (!/^[A-Z]{2}\d{12}$/.test(licenseNumber)) {
            return res.status(400).json({ error: "License number must start with 2 uppercase letters followed by exactly 12 digits (Example: DL123456789123)." });
        }

        if (!/^\d{9,18}$/.test(bankDetails.accountNumber)) {
            return res.status(400).json({ error: "Account number must be between 9 to 18 digits." });
        }
        if (!/^[A-Z]{4}\d{7}$/.test(bankDetails.ifscCode)) {
            return res.status(400).json({ error: "Invalid IFSC code format. Example: SBIN0001234" });
        }
        if (!emergencyContact.phone || !/^\d{10}$/.test(emergencyContact.phone)) {
            return res.status(400).json({ error: "Emergency contact number must be exactly 10 digits." });
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ error: "Invalid email format." });
        }
        console.log("after validation");
        console.log("Raw request body:", req.body);

        const driverExist = await Driver.findOne({
            $or: [{ email }, { phone }, { licenseNumber }]
        });

        if (driverExist) {
            return res.status(400).json({ error: "Driver already registered with provided email, phone, or license number." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashAccountnumber = await bcrypt.hash(bankDetails.accountNumber, salt);

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
                accountNumber: hashAccountnumber,
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
}
module.exports = { Filldrivedrdetails };