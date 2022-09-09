const {check} = require('express-validator');

module.exports.validLength = (key, length) => this.validateRequired(key).isLength({min: length}).withMessage(`${key}_too_short`);

module.exports.validateRequired = (key) => check(key).notEmpty().withMessage(`${key}_is_required`);

module.exports.validatePhone = (key) => this.validateRequired(key).isMobilePhone().withMessage('phone_invalid');

module.exports.validatePassword = () => this.validateRequired('password').isStrongPassword({minLength: 6, minUppercase: 1, minNumbers: 1}).withMessage('password_invalid');