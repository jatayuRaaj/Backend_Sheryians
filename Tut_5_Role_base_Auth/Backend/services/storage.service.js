const { ImageKit } = require('@imagekit/nodejs');
require('dotenv').config();

const ImageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKTI_PRIVATE_KEY
})

async function uploadFile(file) {
    const result = ImageKitClient.files.upload({
        file,
        fileName: "musci_" + Date.now(),
        folder: "YT-Complete-backend"
    })
    return result;
}

module.exports = { uploadFile }
