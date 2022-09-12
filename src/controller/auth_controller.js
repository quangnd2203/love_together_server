const { validationResult } = require('express-validator');
const NetworkResponse = require('../models/network_response');
const authRepository = require('../repository/auth_repository');

module.exports.register = async (request, response) => {
    let networkResponse;
    try{
        const errors = validationResult(request);
        if (!errors.isEmpty()) throw Error(errors.array()[0].msg);

        networkResponse = await authRepository.register(
            request.body.name, 
            request.body.phoneNumber,
            request.body.birthDay, 
            request.body.gender, 
            request.body.avatar, 
            request.body.fcmToken,
        );

    } catch(e) {
        console.log(e);
        networkResponse = NetworkResponse.fromErrors(e.message || 'login_invalid');
    }
    response.send(networkResponse);
}

module.exports.validatePhoneNumber = async (request, response) => {
    let networkResponse;
    try{
        const errors = validationResult(request);
        if (!errors.isEmpty()) throw Error(errors.array()[0].msg);

        networkResponse = await authRepository.validatePhoneNumber(request.body.phoneNumber);
        
    } catch(e) {
        console.log(e);
        networkResponse = NetworkResponse.fromErrors(e.message || 'phone_invalid');
    }
    response.send(networkResponse); 
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

// module.exports.loginSocial = async (request) => {
//     try {
//         const errors = validationResult(request);
//         if (!errors.isEmpty()) throw Error(errors.array()[0].msg);

//         const body = request.body;
//         const socialUser = await socialRepository.loginSocial(body.socialToken, body.accountType);
//         const networkResponse = await authRepository.loginSocical(socialUser.name, socialUser.id.toString(), body.accountType, body.fcmToken);
//         return networkResponse;
//     } catch (e) {
//         console.log(e);
//         return NetworkResponse.fromErrors(e.message || 'cant_get_user');
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