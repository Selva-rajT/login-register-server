
const createOtp=()=>{
    Otp = Math.floor(Math.random() * 900000)+100000;
    let content='<h2>your otp is - <span style="color:orange"> %otp% </span></h2>';
    let keyObjects={
         otp:Otp
    };
    return {mailContent:content,key:keyObjects}
}
module.exports.createOtp=createOtp;
