const express = require('express');
const authController = require('../controller/auth_controller');
const imageUploadMiddleware = require('../middlewares/image_upload_middleware');
const router = express.Router();
const {authorizedServer} = require('../middlewares/authorize_middleware');
const authValidation = require('../validations/authentication_validation');

const firebaseService = require('../services/firebase_service');

router.post('/loginPhone', authValidation.registerValidate(), imageUploadMiddleware, authController.register);

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
    // authController.authorized(request.user, request.token).then((value) => {
    //     response.send(value);
    // });
    firebaseService.verifyIdToken(request.query.idToken).then((value) => {
        response.send(value.firebase.identities);
    });
});

module.exports = router;

