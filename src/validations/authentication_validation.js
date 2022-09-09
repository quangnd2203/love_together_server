const validations = require('./validations');

module.exports.registerValidate = () => [
    validations.validLength('name', 6),
    validations.validatePhone('phoneNumber'),
    validations.validateRequired('birthDay'),
    validations.validateRequired('gender'),
    validations.validateRequired('fcmToken'),
];

// module.exports.registerAccountValidate = () => [
//     validations.validateName(),
//     validations.validateEmail(),
//     validations.validatePassword(),
//     validations.validateRequired('fcmToken'),
// ];

// module.exports.loginValidate = () => [
//     validations.validateEmail(),
//     validations.validatePassword(),
//     validations.validateRequired('fcmToken'),
// ];
