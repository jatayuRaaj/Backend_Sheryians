const express = require('express');
// const registerUser = require('../controllers/auth.controller')
const authController = require('../controllers/auth.controller');
const userModel = require('../models/user.model');

const router = express.Router();

router.post("/register", authController.registerUser );
router.get("/test", (req, res)=>{
    console.log("cookie", req.cookies);
    res.json({
        message : "cookies fetched successfully",
        cookies : req.cookies
    })
})

module.exports = router;