const { User } = require('../models/UserSchema');
const Product = require("../models/ProductSchema");

async function addToCart(userId, productID, quantity, totalAmount) {

    const user = await User.findOne({ _id: userId }); 

    if (!user) {
        return null; 
    }

    
    const cartItem = user.cart.items.find(item => item.productID.toString() === productID.toString());

    if (cartItem) {
        
        cartItem.quantity += quantity; 
    } else {
        
        user.cart.items.push({ productID: productID, quantity: quantity, totalAmount: totalAmount });
    }

    
    await user.save();

    return user.cart;
}

module.exports = { addToCart };
