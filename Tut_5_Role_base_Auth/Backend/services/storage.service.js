const { ImageKit } = require('@imagekit/nodejs');
require('dotenv').config();

const ImageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKTI_PRIVATE_KEY
})
// we have set up the image kit above with private_key and now we will make a function that uplaods file and takes three things and upadates in the imageKit
// that is file itself than its name and folder in which it will be set.

async function uploadFile(file) {
    const result = ImageKitClient.files.upload({
        file,
        fileName: "musci_" + Date.now(),
        folder: "YT-Complete-backend"
    })
    return result;
}

module.exports = { uploadFile }
