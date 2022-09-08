const firebaseService = require("firebase-admin");

const serviceAccount = require("../../love-toghether-firebase-adminsdk-8iztg-6af7957f7e.json");

module.exports.initialized = () => {
    firebaseService.initializeApp(firebaseService.credential.cert(serviceAccount));
}

module.exports.verifyIdToken = async (idToken) => {
    try{
        const data = await firebaseService.auth().verifyIdToken(idToken);
        return data;
    }catch(e){
        return e;
    }
}
