const { MongoClient, ServerApiVersion ,ObjectId} = require('mongodb');
const {mongoose}  =  require("mongoose")
const {Product}  = require("./ProductSchema")
conn_string  = process.env.conn_string
async function getItemById(conn_string,id){
    await mongoose.connect(conn) 
    return Product.find({_id : ObjectId(id)})

}
export default getItemById;