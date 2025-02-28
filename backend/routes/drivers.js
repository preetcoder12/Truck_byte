const { Router } = require('express');
const routes = Router();
const { FillDriverDetails,upload } = require("../controllers/drivers")

routes.post("/filldetails", upload.single("photo"), FillDriverDetails);

module.exports = routes;
