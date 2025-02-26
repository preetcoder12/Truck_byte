require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const UserRoutes = require("./routes/user");
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173', // Allow frontend
    credentials: true, // Allow cookies if needed
}));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ MongoDB Connection Failed:", err));


console.log("MONGO_URI:", process.env.MONGO_URI);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default Route
app.get("/", (req, res) => {
    res.send("Hello World");
});

// User Routes
app.use('/user', UserRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
