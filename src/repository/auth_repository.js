const NetworkResponse = require('../models/network_response');
const UserModel = require('../models/user_model');

module.exports.register = async (name, phoneNumber, facebook, google, birthDay, gender, avatar, fcmToken, accessToken) => {
    const user = await UserModel.register(name, phoneNumber, facebook, google, birthDay, gender, avatar, accessToken);
    UserModel.updateFcmToken(user._id, fcmToken);
    return new NetworkResponse(
        1,
        null,
        {
            user: UserModel.fromJson(user),
            accessToken: user.accessToken,
        },
    );
}

module.exports.login = async (phoneNumber, facebook, google, fcmToken, accessToken) => {
    const user = await UserModel.login(phoneNumber, facebook, google, accessToken);
    UserModel.updateFcmToken(user._id, fcmToken);
    return new NetworkResponse(
        1,
        null,
        {
            user: UserModel.fromJson(user),
            accessToken: user.accessToken,
        },
    );
}

module.exports.loginSocial = async (name, phoneNumber, facebook, google, birthDay, gender, avatar, fcmToken, accessToken) => {
    let networkResponse;
    try{
        networkResponse = await this.login(null, facebook, google, fcmToken, accessToken);
    } catch (e){
        networkResponse = await this.register(name, phoneNumber, facebook, google, birthDay, gender, avatar, fcmToken, accessToken);
    }
    return networkResponse;
}

module.exports.validatePhoneNumber = async (phoneNumber) => {
    const isUnused = await UserModel.validatePhoneNumber(phoneNumber);
    return new NetworkResponse(
        1,
        isUnused ? 'success' : 'phoneNumber_used',
        isUnused,
    ); 
}



// module.exports.authorized = async (email, token,) => {
//     const user = await UserModel.findOne({email: email, accessToken: token});
//     if (user == null) throw Error('ivalid_user');
//     return new NetworkResponse(
//         1,
//         null,
//         {
//             user: UserModel.fromJson(user),
//             accessToken: user.accessToken,
//         },
//     );
// }

// module.exports.register = async (name, email, password, type, fcmToken) => {
//     const accessToken = utils.generateJWT(email);
//     const user = await UserModel.register(name, email, password, type, accessToken);
//     UserModel.updateFcmToken(user._id, fcmToken);
//     return new NetworkResponse(
//         1,
//         null,
//         {
//             user: UserModel.fromJson(user),
//             accessToken: user.accessToken,
//         },
//     );
// }


// module.exports.loginSocical = async (name, socialId, accountType, fcmToken) => {
//     var response;
//     try{
//         response = await this.login(socialId, null, fcmToken, accountType);
//     }catch(e){
//         response = await this.register(name, socialId, null, accountType, fcmToken);
//     }
//     return response;
// }