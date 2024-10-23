const mongoose = require('mongoose');
const { User } = require('../models/UserSchema');

async function DeleteFromCart(userId, productID,quantity) {
    const user = await User.findOne({ _id: userId });
    
    // Find the item in the cart
    const cartItemIndex = user.cart.items.findIndex(item => item.productID === productID);
    
    if (cartItemIndex !== -1) {
        const cartItem = user.cart.items[cartItemIndex];
        
        if (cartItem.quantity === 1) {
            // If the product quantity is 1, remove it from the cart
            user.cart.items.splice(cartItemIndex, 1); // Remove the item from the cart
        } else {
            // If more than 1, decrement the quantity
            cartItem.quantity -= quantity;
        }
    }

    // Save the updated user document
    await user.save();
    return user.cart;
}
module.exports = DeleteFromCart