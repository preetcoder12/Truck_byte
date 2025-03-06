const mongoose = require("mongoose");
const { Schema } = mongoose;

const truckSchema = new Schema({
    truckNumber: {
        type: String,
        required: true,
        unique: true
    },
    model: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        required: true
    },
    insuranceExpiry: {
        type: Date,
        required: true
    },
    capacity: {
        type: Number,
        required: true 
    },
    truckType: {
        type: String,
        enum: ["Flatbed", "Refrigerated", "Tanker", "Box Truck", "Dump Truck", "Other"],
        required: true
    },
    status: {
        type: String,
        enum: ["Available", "On Trip", "Under Maintenance", "Inactive"],
        default: "Available"
    },
    ownerType: {
        type: String,
        enum: ["Individual", "Company"],
        required: true
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        refPath: "ownerType",
        required: true
    },
    images: {
        type: [String],
        default: []
    },

    pricePerKm: {
        type: Number,
        required: true,
        min: 1
    },
    contactInfo: {
        name: { type: String, required: true },
        phone: { type: String, required: true,}, 
        email: { type: String, required: true, }
    }

}, { timestamps: true });

const Truck = mongoose.model("Truck", truckSchema);

module.exports = { Truck };
