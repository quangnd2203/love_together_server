const { validationResult } = require('express-validator');
const NetworkResponse = require('../models/network_response');
const authRepository = require('../repository/auth_repository');
const socialRepository = require('../repository/social_repository');
const utils = require('../utils/utils');

function generateJWT(data) {
    let payload;
    if (data.phoneNumber !== null)
        payload = data.phoneNumber;
    else if (data.facebook !== null) {
        payload = data.facebook;
        payload.type = 'facebook';
    } else if (data.google !== null) {
        payload = data.google;
        payload.type = 'google';
    }
    return utils.generateJWT(payload);
}

module.exports.registerNormal = async (request, response) => {
    let networkResponse;
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) throw Error(errors.array()[0].msg);

        const accessToken = generateJWT({ phoneNumber: request.phoneNumber });

        networkResponse = await authRepository.register(
            request.body.name,
            request.body.phoneNumber,
            null,
            null,
            request.body.birthDay,
            request.body.gender,
            request.files.avatar,
            request.body.fcmToken,
            accessToken,
        );
    } catch (e) {
        console.log(e);
        networkResponse = NetworkResponse.fromErrors(e.message || 'register_invalid');
    }
    response.send(networkResponse);
}

module.exports.loginNormal = async (request, response) => {
    let networkResponse;
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) throw Error(errors.array()[0].msg);

        const accessToken = generateJWT({ phoneNumber: request.phoneNumber });

        networkResponse = await authRepository.login(
            request.body.phoneNumber,
            null,
            null,
            request.body.fcmToken,
            accessToken,
        );
    } catch (e) {
        console.log(e);
        networkResponse = NetworkResponse.fromErrors(e.message || 'login_invalid');
    }
    response.send(networkResponse);
}

module.exports.validatePhoneNumber = async (request, response) => {
    let networkResponse;
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) throw Error(errors.array()[0].msg);

        networkResponse = await authRepository.validatePhoneNumber(request.body.phoneNumber);

    } catch (e) {
        console.log(e);
        networkResponse = NetworkResponse.fromErrors(e.message || 'phone_invalid');
    }
    response.send(networkResponse);
}

module.exports.loginSocial = async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) throw Error(errors.array()[0].msg);

        const socialUser = await socialRepository.getSocialInfo(
            request.body.idToken,
            request.body.socialType,
        );

        const networkResponse = await authRepository.loginSocial(
            socialUser.name,
            request.body.phoneNumber,
            facebook,
            google,
            null,
            null,
            socialUser.avatar,
            request.body.fcmToken,
            accessToken,
        );
        return networkResponse;
    } catch (e) {
        // console.log(e);
        // return NetworkResponse.fromErrors(e.message || 'cant_get_user');
    }
}

// module.exports.loginNormal = async (request) => {
//     try {
//         const errors = validationResult(request);
//         if (!errors.isEmpty()) throw Error(errors.array()[0].msg);

//         const body = request.body;
//         const hashPass = utils.hashPassword(body.password);
//         const networkResponse = await authRepository.login(body.email, hashPass, body.fcmToken);
//         return networkResponse;
//     } catch (e) {
//         console.log(e);
//         return NetworkResponse.fromErrors(e.message || 'wrong_email_or_pass');
//     }
// };

// module.exports.register = async (request) => {
//     try {
//         const errors = validationResult(request);
//         if (!errors.isEmpty()) throw Error(errors.array()[0].msg);

//         const body = request.body;
//         let hassPass = null;
//         if (body.password != null) hassPass = utils.hashPassword(body.password);
//         const networkResponse = await authRepository.register(body.name, body.email, hassPass, 'normal', body.fcmToken);
//         return networkResponse;
//     } catch (e) {
//         console.log(e);
//         return NetworkResponse.fromErrors(e.message || 'cant_register');
//     }
// }



// module.exports.authorized = async (user, token) => {
//     return new NetworkResponse(
//         1,
//         null,
//         {
//             user: user,
//             accessToken: token,
//         }
//     );
// }