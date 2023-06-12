const router=require('express').Router({mergeParams:true});

const {to,ReS,ReE}=require('../global_functions');
const UserService=require('../service/user.service');
const {signupValidaor,loginValidator,validateMailId,otpValidator,changePasswordValidator}=require('../routes/validators/user.validator');
const {validate}=require('../middleware/validate-schema');

const signUp=async(req,res)=>{
    let [error,details]=await to(UserService.signUp(req.body));
    if(error) return ReE(res,error,422);
    return ReS(res,details,200);
}

const logIn=async(req,res)=>{
    let [error,details]=await to(UserService.login(req.query.email,req.query.password));
    if(error) return ReE(res,error,422);
    return ReS(res,details,200);
}
const sendOtpMail=async(req,res)=>{
    console.log(req.query.email);
    let [error,otp]=await to (UserService.sendMailOTP(req.query.email));
    if(error) return ReE(res,error,422);
    return ReS(res,'otp sent to the registered mail id',200);
}
const verifyOTP=async(req,res)=>{
    let [err,verified]=await to(UserService.verifyOtp(req.query.otp));
    if(err) return ReE(res,'wrong otp',422);
    if(verified)return ReS(res,verified,200);
}

const changePassword=async(req,res)=>{
    let [err,change]=await to(UserService.changePassword(req.body.newPassword,req.query.email));
    if(err) return ReE(res,err,422);
    return ReS(res,change,200);
}

router.post('/',signupValidaor,validate,signUp);
router.get('/',loginValidator,validate,logIn);
router.get('/v1',validateMailId,validate,sendOtpMail);
router.get('/v2',otpValidator,validate,verifyOTP);
router.put('/',changePasswordValidator,validate,changePassword)


module.exports={router}