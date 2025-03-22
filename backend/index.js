require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const UserRoutes = require("./routes/user");
const DriverRoutes = require("./routes/drivers");
const TrouckRoutes = require("./routes/trucks")
const AdminRoutes = require("./routes/Admin")
const cookieParser = require("cookie-parser");
const cors = require("cors");


app.use(cookieParser());

app.use(cors({
    origin: [
        'http://localhost:5173', // For local development
        'https://truck-byte-git-main-preets-projects-d62880f1.vercel.app' // Vercel frontend URL
    ],
    credentials: true, // Allows cookies and auth headers
}));


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ MongoDB Connection Failed:", err));


console.log("MONGO_URI:", process.env.MONGO_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use('/user', UserRoutes);
app.use('/driver', DriverRoutes);
app.use('/trucks', TrouckRoutes);
app.use('/admin', AdminRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
