const express= require('express');
const { authUser } = require("../middleware/auth.middleware");
const {registerusercontroller,loginusercontroller, logoutusercontroller, getMeController} = require('../controllers/auth.controller');

const authRouter= express.Router();

authRouter.post("/register",registerusercontroller)

authRouter.post("/login",loginusercontroller)

authRouter.get("/logout",logoutusercontroller)

authRouter.get("/getme",authUser, getMeController)

module.exports= authRouter;