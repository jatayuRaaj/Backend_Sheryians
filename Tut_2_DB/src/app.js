const express = require('express');
const noteModel = require("../models/note.model");
const mobileModel = require('../models/mobile.model');


const app = express();
app.use(express.json());

app.post("/notes", async (req, res)=>{
    const data = req.body
    await noteModel.create({
        title : data.title,
        description : data.description
    })
    res.status(201).json({
        message : "posted successfully"
    })
})

app.post("./mobile",async (req, res)=>{
    const data = req.body
    await mobileModel.create({
        model : data.model,
        brand : data.brand,
        battery : data.battery
    })

    res.status(200).json({
        message : "mobile fetched successfully"
    })
})
app.get("/notes", async (req, res)=>{
    // const data = res.body;
    const notes = await noteModel.find()
    const title = await noteModel.findOne({
        title : "test-tile"
    })
    res.status(200).json({
        message : "fetched successfully",
        notes : notes,
        title : title
    })
})

module.exports = app