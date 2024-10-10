const { MongoClient, ServerApiVersion } = require('mongodb');
 const {Product}  = require('./ProductSchema');
const {mongoose}  =  require("mongoose")

// Create a new blog post object
async function AddProduct(conn,productobj){
  mongoose.connect(conn)

const product = new Product(productobj);

// Insert the article in our MongoDB database 
  return await product.save()

}

