const { Router } = require('express');
const routes = Router();
const { FillDriverDetails, upload, DriverDetails, LoginAsDriver } = require("../controllers/drivers")

routes.post("/filldetails", upload.single("photo"), FillDriverDetails);
routes.post("/signindriver", LoginAsDriver);
routes.get("/details/:id", DriverDetails);

module.exports = routes;
