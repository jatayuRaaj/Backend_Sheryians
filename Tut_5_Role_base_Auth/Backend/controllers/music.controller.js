const musicModel = require('../models/music.model');
const albumModel = require('../models/album.model');
const jwt = require('jsonwebtoken');
const { uploadFile } = require('../services/storage.service');
require('dotenv').config();

async function createMusic(req, res) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "unauthorized at first " });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded.role !== "artist") return res.status(403).json({ message: "you dont access to create music" })
        const { title } = req.body;
        const file = req.file;
        const result = await uploadFile(file.buffer.toString('base64'));

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: decoded.id
        })
        res.status(201).json({
            message: "Music created successfully",
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: error });
    }
}

async function createAlbum(req, res) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "unauthorised" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded.role !== "artist") return res.status(403).json({ message: "U dont have access to create an album" });
        const { title, musicIds } = req.body
        const album = await albumModel.create({
            title,
            music: musicIds,
            artist: decoded.id
        })
        res.status(201).json({
            message: "Album created successfully",
            album: {
                id: album._id,
                title: album.title,
                music: album.musics,
                artist: album.artist
            }
        })
    } catch (error) {
        return res.status(401).json({ message: error })
    }
}

module.exports = { createMusic, createAlbum };