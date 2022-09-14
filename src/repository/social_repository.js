const firebaseService = require('../services/firebase_service');

module.exports.getSocialInfo = async (idToken, type) => {
    try {
        const data = await firebaseService.verifyIdToken(idToken);
        let payload = { name: data.name, avatar: data.picture, email: data.email, type: type, };
        if (type == 'google')
            payload.socialId = data.firebase.identities['google.com'][0];
        else if (type == 'facebook')
            payload.socialId = data.firebase.identities['facebook.com'][0];
        return payload;
    } catch (e) {
        console.log(e);
        throw Error('can not authentication user');
    }
}