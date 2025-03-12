const { Router } = require("express");
const { AddTruck, Alltrucks, GetTruckById, TotalTrucks, OntripTrucks,
    IdleTrucks, UnderMaintenanceTrucks, pendingtrucks } = require("../controllers/trucks");
const authenticateUser = require("../middleware/authenticateuser");
const { upload } = require("../controllers/trucks");

const routes = Router();

routes.post("/addtruck", authenticateUser, upload.array("images", 5), AddTruck);
routes.get("/alltrucks", Alltrucks);
routes.get("/pending_trucks", pendingtrucks);
routes.get("/specifictruck/:id", GetTruckById);
routes.get("/total_trucks", TotalTrucks);
routes.get("/Idle_trucks", IdleTrucks);
routes.get("/on_trip__trucks", OntripTrucks);
routes.get("/undermaintenance_trucks", UnderMaintenanceTrucks);


module.exports = routes;