const { Router } = require("express");

const { AdminSignUp, AdminLogin, ViewAllTrucks, ViewAllDrivers,
    RemoveDriver, RemoveUser, DeleteTruck, UpdateTruck } = require("../controllers/Admin");

const routes = Router();

routes.post("/signup", AdminSignUp);
routes.post("/login", AdminLogin);
routes.get("/alltrucks", ViewAllTrucks);
routes.get("/alldrivers", ViewAllDrivers);
routes.delete("/removedriver/:id", RemoveDriver);
routes.put("/updatetruck/:id", UpdateTruck);
routes.delete("/removeuser/:id", RemoveUser);
routes.delete("/deletetruck/:id", DeleteTruck);

module.exports = routes;
