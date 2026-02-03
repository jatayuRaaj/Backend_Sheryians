const mongoose = require('mongoose');

async function connectDB() {
    await mongoose.connect('mongodb+srv://YT:FHhsxwXoqH0yBHJR@yt-complete-backend.hwmidob.mongodb.net/halley');
    console.log("connected to DB");
}

module.exports = connectDB;