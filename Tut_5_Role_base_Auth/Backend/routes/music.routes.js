const express = require('express');
const { createMusic, createAlbum } = require('../controllers/music.controller');
// const createAlbum = require('../controllers/music.controller')
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage()
})

const router = express.Router();

router.post('/upload-music', upload.single("music"), createMusic);
router.post('/upload-album',createAlbum);

module.exports = router;