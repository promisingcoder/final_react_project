const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    Name: String,
    Overview  : String,
    Pic : String,
    Bg: String,
    Gallery: [String],
    Category: String,
    Date: Date,
    tags: [String],
    Instock: Boolean,
    Sale : Boolean,
    Purchases : Number,
    tags: [String],
  },{collection  : "DepiProducts"});
const Product = model('product', productSchema);
module.exports = {  Product};
