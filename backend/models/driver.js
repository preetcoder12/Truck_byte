const mongoose = require("mongoose");
const { Schema } = mongoose;

const driverSchema = new Schema({
    drivername: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    photo: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female", "other"],
    },
    licenseNumber: {
        type: String,
        required: true,
        unique: true,
    },
    licenseType: {
        type: String,
        enum: ["Light", "Heavy", "Commercial"],
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true }
    },

    emergencyContact: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        relation: { type: String, required: true },
    },
    bankDetails: {
        accountNumber: { type: String, required: true },
        ifscCode: { type: String, required: true },
        bankName: { type: String, required: true },
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "On Leave"],
        default: "Active",
    },
}, { timestamps: true });

const Driver = mongoose.model("Driver", driverSchema);
module.exports = Driver;
