const mongoose = require("mongoose");

function UserModelParam(){
    
}

const schema = new mongoose.Schema({
    name: { type: String, require: [true, 'name is required'], trim: true },
    phoneNumber: { type: String, require: [true, 'phoneNumber is required'], trim: true, unique: true },
    facebookId: { type: String, trim: true },
    googleId: { type: String, trim: true },
    birthDay: { type: Date, require: true },
    gender: { type: Number },
    avatar: { type: String, trim: true },
    accessToken: { type: String, trim: true },
    fcmToken: { type: String, trim: true },
    lastLocation: { type: [Number] },
    isNew: { type: Number },
}, {
    timestamps: true,
    statics: {
        statics: {
            fromJson(json) {
                return {
                    uid: json._id,
                    name: json.name,
                    facebookId: json.facebookId,
                    googleId: json.googleId,
                    birthDay: json.birthDay,
                    gender: json.gender,
                    avatar: json.avatar,
                    accessToken: json.accessToken,
                    fcmToken: json.fcmToken,
                    lastLocation: json.lastLocation,
                    createdAt: json.createdAt,
                    updatedAt: json.updatedAt,
                }
            },

            async register(name, phoneNumber, password, type, accessToken) {
                try {
                    const user = await this.create({
                        name: name,
                        email: email,
                        password: password,
                        accountType: type,
                        avatar: null,
                        background: null,
                        accessToken: accessToken,
                        fcmToken: null,
                    });
                    return user;
                } catch (err) {
                    console.log(err);
                    throw Error('user already exists');
                }
            },

            async updateFcmToken(_id, fcmToken) {
                await this.updateMany({ fcmToken: fcmToken, }, { fcmToken: null });
                await this.findByIdAndUpdate(_id, { fcmToken: fcmToken })
            }
        }
    }
});

const UserModel = mongoose.model('UserModel', schema);

module.exports = UserModel;