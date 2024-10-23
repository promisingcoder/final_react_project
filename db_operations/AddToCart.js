const mongoose = require('mongoose');
const {User} = require('../models/UserSchema');
const Product = require("../models/ProductSchema")
async function addToCart(userId, productID,quantity) {
    const user = await User.findOne({ _id: userId });
    
    // Find the item in the cart
    const cartItem = user.cart.items.find(item => item.productID === productID);
    
    if (cartItem) {
        // If the product exists, increment the quantity
        cartItem.quantity += quantity; // Or set to the desired amount
    } else {
        // If the product does not exist, add it to the cart
        user.cart.items.push({ productID: productID, quantity: quantity }); // Set initial quantity to 1
    }

    // Save the updated user document
    await user.save();
    return(user.cart)
}


module.exports = { addToCart };
