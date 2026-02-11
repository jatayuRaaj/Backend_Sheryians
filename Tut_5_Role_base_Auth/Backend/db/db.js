const mongoose = require('mongoose');
require('dotenv').config();


async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected");
    }
    catch (error) {
        console.log("error occured while connecting to DB", error.message);
    }

}

module.exports = connectDB;
