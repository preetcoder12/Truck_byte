require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const UserRoutes = require("./routes/user");
const DriverRoutes = require("./routes/drivers");
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

// my middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// default routes
app.get("/", (req, res) => {
    res.send("Hello World");
});

// my Routes
app.use('/user', UserRoutes);
app.use('/driver', DriverRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
