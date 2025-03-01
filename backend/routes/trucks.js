const { Router } = require("express");
const { Addtruck } = require("../controllers/trucks");
const authenticateUser = require("../middleware/authenticateuser");
const { upload } = require("../controllers/trucks");

const routes = Router();

routes.post("/addtruck", authenticateUser, upload.array("images", 5), Addtruck);


module.exports = routes;