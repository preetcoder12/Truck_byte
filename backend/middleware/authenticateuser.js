require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    console.log("🔍 Received Token:", token); 
    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded JWT:", decoded); 

        req.user = decoded;  
        next();
    } catch (error) {
        console.error("❌ Invalid Token:", error);
        res.status(401).json({ error: "Invalid token." });
    }
};

module.exports = authenticateUser;
