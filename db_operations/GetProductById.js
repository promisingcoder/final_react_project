const { ObjectId} = require('mongodb');
const {Product}  = require("../models/ProductSchema")
async function getItemById(id){
    result  = Product.find({_id : new ObjectId(id)})
    return(result)
    

}
module.exports =  getItemById ;