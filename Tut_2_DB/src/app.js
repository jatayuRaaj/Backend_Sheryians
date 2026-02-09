const express = require('express');
const noteModel = require("../models/note.model");
const mobileModel = require('../models/mobile.model');


const app = express();
app.use(express.json());

app.post("/notes", async (req, res) => {
    const data = req.body
    await noteModel.create({
        title: data.title,
        description: data.description
    })
    res.status(201).json({
        message: "posted successfully"
    })
})
app.get("/notes", async (req, res) => {
    // const data = res.body;
    const notes = await noteModel.find()
    const title = await noteModel.findOne({
        title: "test-tile"
    })
    res.status(200).json({
        message: "fetched successfully",
        notes: notes,
        title: title
    })
})
app.post("/mobile", async (req, res) => {
    const data = req.body
    await mobileModel.create({
        model: data.model,
        brand: data.brand,
        battery: data.battery
    })

    res.status(200).json({
        message: "mobile posted successfully"
    })
})
app.delete("/notes/:id", async (req, res)=>{
    const id = req.params.id;
    await noteModel.findOneAndDelete({
        _id : id
    })
    res.status(200).json({
        message : "note delted successfully",
        id : id 
    })

})
app.patch("/notes/:id", async(req, res)=>{
    const id = req.params.id ;
    const description = req.body.description;
    await noteModel.findOneAndUpdate({
        _id: id
    },{
        description : description
    })
    res.status(200).json({
        message : "description updated successfully."
    })
})
app.get("/mobile", async (req, res) => {
    // res.send('<h1>mobile page</h1>');
    const data = await mobileModel.find();
    const brand = data.brand;
    res.status(200).json({
        message : "mobile page fetched successfully",
        data : data
    })

})

module.exports = app