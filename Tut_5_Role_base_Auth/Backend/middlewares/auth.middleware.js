const jwt = require('jsonwebtoken');
require('dotenv').config();

async function authArtist(req, res, next) {

    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" })
    try {  
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded.role !== "artist") return res.status(403).json({ message: "You dont have access" })
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
}
async function authUser(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" }) 
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded.role !== "user" && decoded.role !== "artist") return res.status(401).json({ message: "Unauthorized" })
        req.user = decoded;       

        next();
    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
}

module.exports = {authArtist , authUser}