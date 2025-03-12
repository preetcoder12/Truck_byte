const express = require("express");
const router = express.Router();
const { userSignup, userLogin, ViewAllUsers, GoogleAuth, ViewSpecificUsers } = require("../controllers/user");

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/allusers', ViewAllUsers);
router.get('/usercontrols/:id', ViewSpecificUsers);
router.post('/google-auth', GoogleAuth);

module.exports = router;
