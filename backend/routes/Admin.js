const { Router } = require("express");
const { AdminSignUp, AdminLogin } = require("../controllers/Admin"); // ✅ Correct Destructuring

const routes = Router();

routes.post("/signup", AdminSignUp); // ✅ Correctly references the function
routes.post("/login", AdminLogin);   // ✅ Correctly references the function

module.exports = routes;
