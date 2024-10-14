const { MongoClient, ServerApiVersion } = require('mongodb');
const {mongoose}  =  require("mongoose")
const {Product}  = require("./models/ProductSchema")
async function GetProducts(conn){
await mongoose.connect(conn) 
return Product.find({})
}
module.exports = {GetProducts}