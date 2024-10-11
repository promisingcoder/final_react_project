const { MongoClient, ServerApiVersion ,ObjectId} = require('mongodb');
const {mongoose}  =  require("mongoose")
const {Product}  = require("./ProductSchema")
async function getItemById(conn,id){
    await mongoose.connect(conn) 
    result  = Product.find({_id : new ObjectId(id)})
    return(result)
    

}
module.exports =  getItemById ;