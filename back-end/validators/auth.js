const {check} = require('express-validator');
const validateEmail = require('./validateEmail');
const mongoose = require('mongoose');

const signupValidator = 
[
    //name validation
    check('name')
    .notEmpty()
    .withMessage('Name is required'),

    //email validation
    check('email')
    .isEmail()
    .withMessage('Invalid email')
    .notEmpty()
    .withMessage('Email is required'),

    //password validation
    check('password')
    .isLength({min:5})
    .withMessage('Should be more than 5 characters')
    .notEmpty()
    .withMessage('Password is required')

];

const signinValidator =
[
    //email validation
    check('email')
    .isEmail()
    .withMessage('Invalid Email')
    .notEmpty()
    .withMessage('Email is required'),

    //password validation
    check('password')
    .notEmpty()
    .withMessage('Password is required')
];

const emailValidator =
[
    check('email')
    .isEmail()
    .withMessage('Invalid email')
    .notEmpty()
    .withMessage('Email is required')
];

const verifyUserValidator =
[
    //Email validation
    check('email')
    .isEmail()
    .withMessage('Invalid email')
    .notEmpty()
    .withMessage('Email is required'),

    //code validation
    check('code')
    .notEmpty()
    .withMessage('Code is required')

];

const recoverPasswordValidator =
[
        //Email validation
        check('email')
        .isEmail()
        .withMessage('Invalid email')
        .notEmpty()
        .withMessage('Email is required'),

        //code validation
         check('code')
         .notEmpty()
         .withMessage('Code is required'),

        //password validation
        check('password')
        .isLength({min:5})
        .withMessage('Should be more than 5 characters')
        .notEmpty()
        .withMessage('Password is required')

];

const changePasswordValidator = 
[
    //checking the old password
    check('oldPassword')
    .notEmpty()
    .withMessage('Old password is required'),

    //checking the new password
    check('newPassword')
    .notEmpty()
    .withMessage('New password is required')
    
];

const updateProfileValidator =
[
    check('email').custom( async(email) =>{
        if(email){
            const isValidEmail = validateEmail(email);
            if(!isValidEmail){
                throw "Invalid Email";
            }
        }
    }),

    check('profilePic').custom(async (profilePic) =>{
        if(profilePic && !mongoose.Types.ObjectId.isValid(profilePic)){
            throw 'Invalid profile picture';
        }
    })
];

module.exports = 
{
    signupValidator,
    signinValidator,
    emailValidator,
    verifyUserValidator,
    recoverPasswordValidator,
    changePasswordValidator,
    updateProfileValidator
};