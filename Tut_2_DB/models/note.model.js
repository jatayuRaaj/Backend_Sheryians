const mongoose = require('mogoose');

const noteSchema = new mongoose.Schema({
    title : String,
    description : string
})