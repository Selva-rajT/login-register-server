const nodeMailer=require('nodemailer');
const{TE,to}=require('../global_functions');
require('../config/config');


const sendMailToUser=async function (receiver,mailContent,keyObject){
    let sender=nodeMailer.createTransport({
        service:'gmail',
        auth:{
            user:CONFIG.email,
            pass:CONFIG.password
        },
        host:'smtp.gmail.com',
        port:465
    });

    for (let key of Object.keys(keyObject)) {
        console.log(key)
        const replaceText = "%" + key + "%";
        const regExp = new RegExp(replaceText, 'g');
        mailContent = mailContent.replace(regExp, keyObject[key]);
      }
      

    const composeMail={
        from:'abc@gmail.com',
        to:receiver,
        subject:"testing ",
        html:mailContent
    }

    let[err,mail]=await to(sender.sendMail(composeMail));
    if(err) return TE(err.message);
    return mail;
}
module.exports.sendMailToUser=sendMailToUser;