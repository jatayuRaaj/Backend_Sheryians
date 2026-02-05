const mongoose = require('mongoose');

const mobileSchema = new mongoose.Schema({
    model: { type: String, required: true },
    brand: { type: String },
    battery: { type: Number }
})

const mobileModel = mongoose.model("mobile", mobileSchema);

module.exports = mobileModel