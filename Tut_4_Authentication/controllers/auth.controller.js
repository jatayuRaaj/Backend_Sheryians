const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    const { username, email, password } = req.body;   // destructure the vairables

    const isUserAlreadyExists = await userModel.findOne({
        email
    })

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "user already exists"
        })
    }

    const user = await userModel.create({
        username, email, password
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET);
    res.cookie("token", token);
    
    res.status(200).json({
        message: "user Registere successfully",
        user,
    })

}

module.exports = { registerUser };