const db = require('../models');
const users = db.users;
const bcrypt = require('bcrypt-nodejs');

exports.login = async function(data){
    try{
        const user = await users.findOne({
            where:{
                username: data.username
            }
        });

        if(!user){
            return {
                wrongUsername: true
            }
        }
        if(bcrypt.compareSync(data.password, user.password)){
            return user
        }
        return {
            wrongPass: true
        }
    }
    catch(err){
        console.log(err);
    }
}