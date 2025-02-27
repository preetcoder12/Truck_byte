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
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        default: "https://res.cloudinary.com/dxkufsejm/image/upload/v1625944371/blank-profile-picture-973460_640_ew2z6g.png",
    },
    
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
module.exports = User; 