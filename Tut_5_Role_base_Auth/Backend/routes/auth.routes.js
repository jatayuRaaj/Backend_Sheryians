const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/auth.controller')

const router = express.Router();

// here we just use router acquired from express to post or get and tell the where to get from or post to like "/home" or "'about" and then tell it which contorller
// to call at this route

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

module.exports = router;
