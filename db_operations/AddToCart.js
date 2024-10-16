const mongoose = require('mongoose');
const {User} = require('../models/UserSchema');

async function addToCart(userId, cartItem, itemPrice, conn) {
    try {
        // Connect to the database
        await mongoose.connect(conn);

        // Check if the item already exists in the cart
        const result = await User.findOneAndUpdate(
            { _id: userId, "cart.items.productID": cartItem.productID }, 
            { 
                $inc: { 
                    "cart.items.$.quantity": cartItem.quantity, 
                    "cart.totalAmount": itemPrice 
                } 
            },
            { new: true }
        );

        // If the item doesn't exist, push it as a new cart item
        if (!result) {
            await User.findByIdAndUpdate(
                userId, 
                { 
                    $push: { "cart.items": cartItem }, 
                    $inc: { "cart.totalAmount": itemPrice } 
                }
            );
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
    } finally {
        // Disconnect from the database
        await mongoose.disconnect();
    }
}

module.exports = { addToCart };
