const { Router } = require('express');
const routes = Router();
const { FillDriverDetails, upload, DriverDetails, LoginAsDriver,DriverDetailsupdate } = require("../controllers/drivers")

routes.post("/filldetails", upload.single("photo"), FillDriverDetails);
routes.post("/signindriver", LoginAsDriver);
routes.get("/details/:id", DriverDetails);
routes.put("/update/:id", DriverDetailsupdate);

module.exports = routes;
