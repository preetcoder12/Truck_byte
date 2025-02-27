const { Router } = require('express');
const routes = Router();
const { Filldrivedrdetails } = require("../controllers/drivers")

routes.post("/filldetails", Filldrivedrdetails);

module.exports = routes;
