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
            artist: req.user.id     // we can use req.user because in middleware we have already set that req.user = decoded 
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
            musics: musicIds,
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
        const musics = await musicModel.find().limit(2).populate("artist", "username email -_id");
        res.status(200).json({
            message: "musics fetched successfully",
            musics: musics
        })
    } catch (error) {
        res.status(409).json({ message: error })
    }
}

async function getAllAlbums(req, res) {
    try {
        const albums = await albumModel.find().populate("artist", "email -_id").populate("musics", "title artish -_id");
        res.status(201).json({
            message: "albums fetched successfully",
            albums : albums
        })
    } catch (error) {
        res.status(400).json({
            message : error.message,
        })
    }
}


module.exports = { createMusic, createAlbum, getAllMusics, getAllAlbums };