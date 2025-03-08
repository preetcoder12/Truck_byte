const { Router } = require("express");
const { AddTruck, Alltrucks, GetTruckById } = require("../controllers/trucks");
const authenticateUser = require("../middleware/authenticateuser");
const { upload } = require("../controllers/trucks");

const routes = Router();

routes.post("/addtruck", authenticateUser, upload.array("images", 5), AddTruck);
routes.get("/alltrucks", Alltrucks);
routes.get("/specifictruck/:id", GetTruckById);


module.exports = routes;