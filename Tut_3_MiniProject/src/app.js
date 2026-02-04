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
    console.log(req.body);
    // console.log(req.file);
    const result = await uploadFile(req.file.buffer);

    // console.log(result);
    const post = await postModel.create({
        image : result.url,
        caption :  req.body.caption
    })

    return res.status(201).json({
        message: "posted successfully",
        result : post
    })
})


module.exports = app