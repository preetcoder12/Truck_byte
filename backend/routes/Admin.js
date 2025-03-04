const { Router } = require("express");
const AdminSignUp = require("../controllers/Admin"); // ✅ Correct import

const routes = Router();

routes.post("/signup", AdminSignUp); // ✅ Fixed route name (lowercase)

module.exports = routes;
