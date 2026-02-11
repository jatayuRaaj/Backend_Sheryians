const express = require('express');
const { createMusic, createAlbum, getAllMusics, getAllAlbums } = require('../controllers/music.controller');
const { authArtist, authUser } = require('../middlewares/auth.middleware');
const multer = require('multer');

// this multer function is used to upload files and keep in memory storage as the code suggests.
const upload = multer({
    storage: multer.memoryStorage()
})


const router = express.Router();
// just like the auth.routes.js here in music.routes.js we have used middleware like to authenticate the artist like is it really 
// an artish to verify via token in req.cookies ,
// first we write route "/honme" and then write the middleware like authartist and auhtuser and write the controllers name 
// which controller to call.

router.post('/upload-music', authArtist, upload.single("music"), createMusic);
router.post('/upload-album', authArtist, createAlbum);
router.get('/', authUser, getAllMusics);
router.get('/albums', authUser, getAllAlbums );

module.exports = router;
