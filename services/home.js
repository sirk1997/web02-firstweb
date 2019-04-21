const db = require('../models');
const products = db.products;

exports.getProducts = async function(data){
    try{
        const lstproduct = await products.findAll({
        });
        return lstproduct;
    }
    catch(err){
        console.log(err);
    }
}