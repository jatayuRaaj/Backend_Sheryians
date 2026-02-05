const express = require('express');
const multer = require('multer');
const uploadFile = require('../services/storage.service');
const postModel = require('../models/post.model');

const app = express();
const upload = multer({ storage: multer.memoryStorage() })

app.use(express.json());

app.get("/home", (req, res) => {
    res.send('yo yo');
})

app.post("/create-post", upload.single('image'), async (req, res) => {

    const result = await uploadFile(req.file.buffer);

    const post = await postModel.create({
        image_link : result.url,
        caption: req.body.caption
    })

    return res.status(201).json({
        message: "posted successfully",
        result: post,
        link: result.image
    })
})

app.get("/posts", async (req, res) => {
    const posts = await postModel.find();
    res.status(200).json({
        message: "posts fetched successfully",
        posts: posts,
        link : posts.image
    })
 
})

app.delete("/delete/:id", async (req, res)=>{
    const id = req.params.id;
    await postModel.findOneAndDelete({
        _id : id 
    })
    res.status(200).json({
        message : "post deleted successfully.",
        deleted_id  : id
    })
})
module.exports = app