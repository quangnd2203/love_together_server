const NetworkResponse = require('../models/network_response');
const UserModel = require('../models/user_model');

const utils = require('../utils/utils');

module.exports.register = async (name, phoneNumber, birthDay, gender, avatar, fcmToken) => {
    const accessToken = utils.generateJWT(phoneNumber);
    const user = await UserModel.register(name, phoneNumber, birthDay, gender, avatar, accessToken);
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