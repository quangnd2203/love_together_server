const express = require('express');
const authController = require('../controller/auth_controller');
const imageUploadMiddleware = require('../middlewares/image_upload_middleware');
const router = express.Router();
const {authorizedServer} = require('../middlewares/authorize_middleware');
const authValidation = require('../validations/authentication_validation');

const socialRepository = require('../repository/social_repository');

router.post('/register', authValidation.registerValidate(), imageUploadMiddleware, authController.registerNormal);

router.post('/login', authValidation.validatePhoneNumber(), authController.loginNormal);

router.post('/validatePhone', authValidation.validatePhoneNumber(), authController.validatePhoneNumber);

// router.post('/loginNormal', authValidation.loginValidate(), (request, response) => {
//     authController.loginNormal(request).then((value) => {
//         response.send(value);
//     })
// });

// router.post('/register', authValidation.registerAccountValidate(), (request, response) => {
//     authController.register(request).then((value) => {
//         response.send(value);
//     })
// });

// router.post('/loginSocial', authValidation.loginSocialValidate(), (request, response) => {
//     authController.loginSocial(request).then((value) => {
//         response.send(value);
//     });
// });

// router.get('/authorized', authorizedServer, (request, response) => {
//     authController.authorized(request.user, request.token).then((value) => {
//         response.send(value);
//     });
// });

router.get('/verifyIdToken', (request, response) => {
    socialRepository.getSocialInfo(request.query.idToken, request.query.socialType).then((value) => {
        response.send(value);
    });
});

module.exports = router;

