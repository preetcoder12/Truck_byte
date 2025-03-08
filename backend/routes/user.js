const express = require("express");
const router = express.Router();
const { userSignup, userLogin, ViewAllUsers } = require("../controllers/user");

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/allusers', ViewAllUsers);

module.exports = router;
