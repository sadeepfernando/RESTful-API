const {User} = require('../models/index');
const hashPassword = require('../utils/hashPassword');
const comparePassword = require('../utils/comparePassword');
const generateToken = require('../utils/generateToken');
const generateCode = require('../utils/generateCode');
const nodeMailer = require('../utils/sendEmail');
const sendEmail = require('../utils/sendEmail');


const signUpController = async(req,res,next) =>{
    try{

        const {name,email,password,role} = req.body;

        const isEmailExist = await User.findOne({email});
        
        if(isEmailExist){
            res.code = 400
            throw new Error('Email already exists');
        }

        const hashedPassword =  await hashPassword(password);

        const newUser = new User({name,email,password: hashedPassword,role});
        await newUser.save();

        res.status(201).json({code:201, status: true,message :"user registered successfully"});
        
    }catch(error){
        next(error);
    }
}

const signInController = async(req,res,next) =>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            res.code = 401;
            throw new Error('Invalid credentials');
        }

        //matching the password
        const passwordMatch = await comparePassword(password,user.password);
        if(!passwordMatch){
            res.code = 401;
            throw new Error('Invalid credentials');
        }

        //generated token
        const token = generateToken(user);

        res.status(200)
        .json({code:200,status:true,message:'User signIn sucessfully', data:{token}});

    }catch(error){
        next(error);
    }
}

const verifyCode = async(req,res,next) =>{
    try{
        const {email} = req.body;

        const user = await User.findOne({email});
        if(!user){
            res.code = 404;
            throw new Error('user not found')
        }

        //user.isVerified === true is same as user.isVerified
        if(user.isVerified){
            res.code = 400;
            throw new Error('User already verified')
        }

        //storing the generated code
        const code = generateCode(6);
        user.verificationCode = code;
        await user.save();

        //send email
        await sendEmail({
            emailTo : user.email,
            subject:'Email verification code',
            code,
            content:'Verify your account',
        });

        res.status(200).json({code:200,status:true,message:'User verification code send successfully'})
    }catch(error){
        next(error);
    }
}

const verifyUser = async(req, res, next) =>{
    try{
        const {email, code} = req.body;

        const user = await User.findOne({email});
        if(!user){
            res.code = 404;
            throw new Error('User not found');
        }

        if(user.verificationCode !== code){
            res.code =400;
            throw new Error('Verification code is not matched');
        }

        user.isVerified = true;
        user.verificationCode = null;
        await user.save();

        res.status(200)
        .json({code:200,status:true,message:'User verified successfully'});

    }catch(error){
        next(error);
    }
}

const forgotPasswordCode = async(req,res,next) =>{
    try{
        const {email} = req.body;

        const user = await User.findOne({email});
        if(!user){
            res.code = 404;
            throw new Error('User not found')
        }

        const code = generateCode(6);
        user.forgotPasswordCode = code;
        await user.save();

        await sendEmail({
            emailTo: user.email,
            subject:'Forgot password code',
            code,
            content:'Change your password'
        });

        res.status(200)
        .json({code:200, status:true, message:'Forgot password code send successfully'});

        
    }catch(error){
        next(error);
    }
}



module.exports =
 {
    signUpController,
    signInController,
    verifyCode,
    verifyUser,
    forgotPasswordCode
}