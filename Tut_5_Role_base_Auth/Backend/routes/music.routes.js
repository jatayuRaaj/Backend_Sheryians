const express = require('express');
const { createMusic, createAlbum, getAllMusics, getAllAlbums } = require('../controllers/music.controller');
const { authArtist, authUser } = require('../middlewares/auth.middleware');
const multer = require('multer');


const upload = multer({
    storage: multer.memoryStorage()
})

const router = express.Router();

router.post('/upload-music', authArtist, upload.single("music"), createMusic);
router.post('/upload-album', authArtist, createAlbum);
router.get('/', authUser, getAllMusics);
router.get('/albums', authUser, getAllAlbums );

module.exports = router;