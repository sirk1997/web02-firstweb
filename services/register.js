const db = require('../models');
const users = db.users;
const bcrypt = require('bcrypt-nodejs');

exports.register = async function(data){
    try{
        const check = await users.findOne({
            where: {
                username: data.username
            }
        });

        if(!check){
            data.password = bcrypt.hashSync(data.password, null, null).toString();
            return users.create(data).then(async _user =>{
                return _user
            })
        }

        return null
    }
    catch(err){
        console.log(err);
    }
}
