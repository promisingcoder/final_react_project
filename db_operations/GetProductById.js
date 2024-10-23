const { MongoClient, ServerApiVersion ,ObjectId} = require('mongodb');
const {mongoose}  =  require("mongoose")
const {Product}  = require("../models/ProductSchema")
async function getItemById(id){
    result  = Product.find({_id : new ObjectId(id)})
    return(result)
    

}
module.exports =  getItemById ;