const cryptoJs=require('crypto-js');


const encrypt=async function(plainText){
    let cipherText=cryptoJs.AES.encrypt(plainText.toString(),CONFIG.secretkey).toString();
    return cipherText;
}
module.exports.encrypt=encrypt;


const decrypt=async function(cipherText){
    let bytes=cryptoJs.AES.decrypt(cipherText.toString(),CONFIG.secretkey);
    let plainText=bytes.toString(cryptoJs.enc.Utf8);
    return plainText;
}
module.exports.decrypt=decrypt;