// const fs = require('fs');
const NetworkResponse = require('../models/network_response');

module.exports = async function (request, response, next) {
    try {
        if (!request.files || Object.values(request.files).flat().length === 0) {
            throw Error('No files selected.');
        }
        const files = Object.values(request.files).flat();
        files.forEach((file) => {
            if (
                file.mimetype !== 'image/jpeg' &&
                file.mimetype !== 'image/png' &&
                file.mimetype !== 'image/gif' &&
                file.mimetype !== 'image/webp'
            ) {
                removeTmp(file.tempFilePath);
                throw Error('Unsupported format.');
            }
            if (file.size > 1024 * 1024 * 5) {
                removeTmp(file.tempFilePath);
                throw Error('File size is too large.');
            }
        });
        next();
    } catch (error) {
        console.log(error);
        response.status(200).send(NetworkResponse.fromErrors(error.message));
    }
};

const removeTmp = (path) => {
    fs.unlink(path, (err) => {
        if (err) throw err;
    });
};