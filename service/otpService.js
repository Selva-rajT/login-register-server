const fs=require('fs');
const createOtp=()=>{
    Otp = Math.floor(Math.random() * 900000)+100000;
    let content=fs.readFileSync('../mailTemplate.html').toString();
    console.log(content)
    // let content='<html><body><table style="width: 100%; max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;"><tr><td style="backgroundcolor: #f8f8f8; padding: 20px; text-align: center;"><h1 style="margin: 0; color: #333;">OTP Verification</h1></td></tr><tr><td style="padding:20px;"><p style="margin-bottom: 20px;">Dear User,</p><p style="margin-bottom: 20px;">Your OTP for verification is: <strong>%otp%</strong></p><p style="margin-bottom: 20px;">Please enter this OTP on the verification page to complete the process.</p></td></tr><tr><td style="background-color: #f8f8f8; padding: 20px; text-align: center;"><p style="margin: 0;">Thank you for using our service.</p></td></tr></table></body></html>';
    let keyObjects={
         otp:Otp
    };
    return {mailContent:content,key:keyObjects}
}
module.exports.createOtp=createOtp;
