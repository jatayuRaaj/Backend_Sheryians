const musicModel = require('../models/music.model');
const albumModel = require('../models/album.model');
const jwt = require('jsonwebtoken');
const { uploadFile } = require('../services/storage.service');
require('dotenv').config();

async function createMusic(req, res) {
    try {
        const { title } = req.body;
        const file = req.file;
        const result = await uploadFile(file.buffer.toString('base64'));

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: req.user.id
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
    try {
        const { title, musicIds } = req.body
        const album = await albumModel.create({
            title,
            music: musicIds,
            artist: req.user.id
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

async function getAllMusics(req, res) {
    try {
        const musics = await musicModel.find().populate("artist");
        res.status(200).json({
            message: "musics fetched successfully",
            musics: musics
        })
    } catch (error) {
        res.status(409).json({ message: error })
    }
}

module.exports = { createMusic, createAlbum, getAllMusics };