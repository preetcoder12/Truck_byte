const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId; // Only required if not using Google auth
        },
    },
    phone: {
        type: String,
        required: function () {
            return !this.googleId; // Only required if not using Google auth
        },
    },
    googleId: {
        type: String,
        default: null
    },
    dashboardVisibility: {
        type: Object,
        default: {
            dashboard: true,
            Account: true,
            settings: true,
            addTrucks: true,
            becomeDriver: true,
            bookTruck: true
        }
    }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
module.exports = User;