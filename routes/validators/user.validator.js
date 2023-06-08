
const {body,query}=require('express-validator');

const signupValidaor=[
    body('userName').isString().trim().notEmpty().withMessage("invalid username"),
    body('email').isEmail().withMessage("invalid email"),
    body('password').isAlphanumeric().trim().notEmpty().withMessage("invlid password")
]
const loginValidator=[
    query('email').isEmail().withMessage('invalid email'),
    query('password').isString().trim().notEmpty().withMessage('invalid password')
]
const validateMailId=[
    query('email').isEmail().withMessage('invalid email')
]
const otpValidator=[query('otp').isNumeric().withMessage('invalid otp')]
const changePasswordValidator=[
    body('newPassword').isAlphanumeric().withMessage("invalid password"),
    query('email').isEmail().withMessage('invalid email')
]

module.exports={signupValidaor,loginValidator,validateMailId,otpValidator,changePasswordValidator};
