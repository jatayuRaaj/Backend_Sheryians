const mongoose = require('mongoose');

const mobileSchema = new mongoose.Schema({
    model: { type: String, required: true },
    branch: { type: String },
    battery: { type: Number }
})

const mobileModel = mongoose.model("note", mobileModel);

module.exports = mobileModel