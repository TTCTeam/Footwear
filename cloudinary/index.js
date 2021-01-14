const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'droruloek',
    api_key: '371123319273617',
    api_secret: 'CbVo3TUfa0KbV_hu9D8P0ZwNy7U'
});

module.exports = cloudinary;