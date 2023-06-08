const fs=require('fs');
const path=require('path');

const createOtp=()=>{
    Otp = Math.floor(Math.random() * 900000)+100000;
    const filePath=path.join(__dirname,'template.html');
    let content=fs.readFileSync(filePath,'utf-8').toString();
    let keyObjects={
         otp:Otp
    };
    return {mailContent:content,key:keyObjects}
}
module.exports.createOtp=createOtp;
