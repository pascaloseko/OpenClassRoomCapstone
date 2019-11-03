const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'dl9p2uwtw',
    api_key: '223793232477269',
    api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.uploads = (file) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({ url: result.url, id: result.public_id })
        }, { resource_type: "auto"});
    });
}