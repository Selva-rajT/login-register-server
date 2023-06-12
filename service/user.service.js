
const {to,TE}=require('../global_functions');
const user=require('../models').user;
const bcrypt=require('bcrypt');
const mailService=require('../service/mailService');
const OtpService= require('../service/otpService');

const signUp=async(userDetails)=>{
    let [err,exist]=await to(user.findOne({
        where:{email:userDetails.email}
    }));
    if(err) return TE(err.message);
    if(!exist){
        let [error,Detail]=await to(user.create({
            userName:userDetails.username,
            email:userDetails.email,
            password:userDetails.password
        }));
        if(error) return TE(error.message);
        return Detail;
    }
    return TE("user  email already registered");
    
}
module.exports.signUp=signUp;


const login=async(userEmail,userPassword)=>{
    let [error,detail]=await to(user.findOne({
        where:{
            email:userEmail
        },
        attributes:['id','userName','email','password']
    }))
    if(error) return TE(error.message);

    let token;
    let loginDetails={};
    loginDetails.userDetails=detail.dataValues;

    if(detail){
        let matched=await bcrypt.compare(userPassword,detail.dataValues.password);
        if(!matched) return TE('wrong password');

        [err,token]=await to(detail.getJwt());
        if(err) return TE("error while token generation");
        loginDetails.token=token;
        return loginDetails;
    }
}

module.exports.login=login;


var previousOtp,expiresIn;
const sendMailOTP=async(userEmail)=>{
    let [er,exist]=await to(user.findOne({where:{email:userEmail}}));
    if(er) return TE(er.message);
    if(exist){
        const OtpContent=OtpService.createOtp();
        previousOtp=OtpContent.key.otp;
        expiresIn=Date.now()+(2*60*1000);
        let[errr,mail]=await to(mailService.sendMailToUser(userEmail,OtpContent.mailContent,OtpContent.key));
        if (errr) return TE("failed to send otp");
        return mail;
    }
    return TE("user doesn't exist");
}

module.exports.sendMailOTP=sendMailOTP;


const verifyOtp=async(otp)=>{
    if(Date.now()>expiresIn) return false;
    return new Promise ((resolve,reject)=>{previousOtp==otp?resolve(true):reject(false)});
}
module.exports.verifyOtp=verifyOtp;



const changePassword=async(newPassword,userEmail)=>{
    
    let [error,updated]=await to(user.update({password:newPassword},{where:{email:userEmail},individualHooks:true}));
    if(error) return TE('error while changing the  password');
    return updated;
}
module.exports.changePassword=changePassword;





