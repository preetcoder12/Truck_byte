const { Router } = require("express");

const { AdminSignUp, AdminLogin, ViewAllTrucks, ViewAllDrivers,
    RemoveDriver, RemoveUser, RemoveTruck, EditTruckDetails } = require("../controllers/Admin");

const routes = Router();

routes.post("/signup", AdminSignUp);
routes.post("/login", AdminLogin);
routes.get("/alltrucks", ViewAllTrucks);
routes.get("/alldrivers", ViewAllDrivers);
routes.delete("/removedriver/:id", RemoveDriver);
routes.delete("/removeuser/:id", RemoveUser);
routes.delete("/removetruck/:id", RemoveTruck);
routes.put("/updatetruck/:id", EditTruckDetails);

module.exports = routes;
