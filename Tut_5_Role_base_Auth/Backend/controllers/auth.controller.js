const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');


async function registerUser(req, res) {
    const { username, email, password, role = "user" } = req.body;
    try {
        const isAlreadyExists = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        })
        if (isAlreadyExists) {
            res.status(409).json({ message: "User already exists" })
        }
        const hash = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            username, email, password: hash, role
        })
        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET_KEY)
        res.cookie("token", token)
        res.status(200).json({
            message: "user registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function loginUser(req, res) {
    try {
        const { username, email, password } = req.body;
        const user = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        })
        if (!user) {
            return res.status(401).json({ message: "User Not Found" })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "invalid password" });
        }
        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET_KEY)
        res.cookie("token", token);
        res.status(200).json({
            message: "user logged in successfully",
            user: {
                username: user.username,
                emial: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message
        })
    }
}

async function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "logged out Successfully" });
}

module.exports = { registerUser, loginUser, logoutUser }