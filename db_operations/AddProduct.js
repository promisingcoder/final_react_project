const { MongoClient, ServerApiVersion } = require('mongodb');
 const {Product}  = require('./ProductSchema');
const {mongoose}  =  require("mongoose")

async function AddProduct(conn,productobj){
  mongoose.connect(conn)

const product = new Product(productobj);

  return await product.save()

}

