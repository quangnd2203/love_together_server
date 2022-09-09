const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: { type: String, require: [true, 'name is required'], trim: true },
    phoneNumber: { type: String, trim: true, unique: true },
    facebookId: { type: String, trim: true, unique: true },
    googleId: { type: String, trim: true },
    birthDay: { type: Date, require: true },
    gender: { type: Number, require: true },
    avatar: { type: String, trim: true, require: true },
    accessToken: { type: String, trim: true },
    fcmToken: { type: String, trim: true },
    lastLocation: { type: [Number] },
    isNew: { type: Number },
}, {
    timestamps: true,
    statics: {
        fromJson(json) {
            return {
                uid: json._id,
                name: json.name,
                phoneNumber: json.phoneNumber,
                facebookId: json.facebookId,
                googleId: json.googleId,
                birthDay: json.birthDay,
                gender: json.gender,
                avatar: json.avatar,
                lastLocation: json.lastLocation,
                createdAt: json.createdAt,
                updatedAt: json.updatedAt,
                isNew: json.isNew,
            }
        },

        async register(name, phoneNumber, facebookId, googleId, birthDay, gender, avatar, accessToken) {
            try {
                const user = await this.create({
                    name: name,
                    phoneNumber: phoneNumber,
                    facebookId: facebookId || null,
                    googleId: googleId || null,
                    birthDay: birthDay,
                    gender: gender,
                    avatar: avatar,
                    accessToken: accessToken,
                    fcmToken: null,
                    isNew: 1,
                });
                return user;
            } catch (err) {
                console.log(err);
                throw Error('user already exists');
            }
        },

        async validatePhoneNumber(phoneNumber){
            const user = await this.findOne({
                phoneNumber: phoneNumber,
            });
            if(user == null) return false;
            return true;
        },

        async updateFcmToken(_id, fcmToken) {
            await this.updateMany({ fcmToken: fcmToken, }, { fcmToken: null });
            await this.findByIdAndUpdate(_id, { fcmToken: fcmToken })
        }
    }
});

const UserModel = mongoose.model('UserModel', schema);

module.exports = UserModel;