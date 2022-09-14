const { google } = require("googleapis");
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: { type: String, require: [true, 'name is required'], trim: true },
    phoneNumber: { type: String, trim: true, unique: true },
    facebook: { email: String, socialId: String },
    google: { email: String, socialId: String },
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
                facebook: json.facebook,
                google: json.google,
                birthDay: json.birthDay,
                gender: json.gender,
                avatar: json.avatar,
                lastLocation: json.lastLocation,
                createdAt: json.createdAt,
                updatedAt: json.updatedAt,
                isNew: json.isNew,
            }
        },

        async register(name, phoneNumber, facebook, google, birthDay, gender, avatar, accessToken) {
            try {
                const user = await this.create({
                    name: name,
                    phoneNumber: phoneNumber || null,
                    facebook: facebook || null,
                    google: google || null,
                    birthDay: birthDay || null,
                    gender: gender || 1,
                    avatar: null,
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

        async login(phoneNumber, facebook, google) {
            let user;
            if(phoneNumber !== null)
                user = await this.findOneAndUpdate({phoneNumber: phoneNumber}, {accessToken: accessToken}, {new: true});
            else if (facebook !== null)
                user = await this.findOneAndUpdate({facebook: facebook}, {accessToken: accessToken}, {new: true});
            else if(google !== null)
                user = await this.findOneAndUpdate({google: google}, {accessToken: accessToken}, {new: true});
            if(user === null) 
                throw Error('wrong_infomation');
            return user;
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