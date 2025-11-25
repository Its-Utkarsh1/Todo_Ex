const express = require("express");
const router = express.Router();

const{ handleUserLogin, handleUserLogout, handleUserRegister }= require("../controller/user");

//------POST Routers------
router.post("/login",handleUserLogin);
router.post("/logout",handleUserLogout);
router.post("/register",handleUserRegister);

module.exports = router;