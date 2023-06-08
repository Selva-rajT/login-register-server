const bcrypt=require('bcrypt');
const crypto=require('crypto');
const jwt=require('jsonwebtoken');

const {to,TE}=require('../global_functions');
const cryptoService=require('../service/cryptoService');


module.exports=(db,dataType)=>{
    let Model=db.define('user',{
        id:{
            type:dataType.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        userName:{
            type:dataType.STRING,
            allowNull:false
        },
        email:{
            type:dataType.STRING,
            allowNull:false
        },
        password:{
            type:dataType.STRING,
            allowNull:false
        }
    },{
        tableName:'user'
    });

    Model.beforeSave(async(user,options)=>{
        if(user.changed('password')){
            let error,rounds,salt;
           rounds=crypto.randomInt(0,10);
           [error,salt]=await to(bcrypt.genSalt(rounds));
           if(error) return TE('error while salt generation ');
           [error,hash]=await to(bcrypt.hash(user.password,salt));
           if(error) return TE('error while hashing the password');

           
           user.password=hash;
        }})

        Model.prototype.getJwt=async function(){
            let err,token,encryptedToken;
                token= 'Bearer '+jwt.sign({
                id:this.id,
                email:this.email},CONFIG.jwt_encryption,{expiresIn:CONFIG.jwt_expiration});
                // console.log("token check",token);
                [err,encryptedToken]=await to(cryptoService.encrypt(token));
                if(err) return TE(err.message);
                return encryptedToken;
            }
      
        return Model;
}