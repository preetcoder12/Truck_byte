const { Router } = require("express");
const { AdminSignUp, AdminLogin } = require("../controllers/Admin");

const routes = Router();

routes.post("/signup", AdminSignUp); 
routes.post("/login", AdminLogin);   

module.exports = routes;
