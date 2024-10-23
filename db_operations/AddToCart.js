const mongoose = require('mongoose');
const {User} = require('../models/UserSchema');

async function addToCart(userId, cartItems, conn) {
    try {
        // Connect to the database
        await mongoose.connect(conn);

        // Loop through each cart item to either update or add it
        for (let cartItem of cartItems) {
            const result = await User.findOneAndUpdate(
                { _id: userId, "cart.items.productID": cartItem.productID }, 
                {
                    $inc: { "cart.items.$.quantity": cartItem.quantity, "cart.totalAmount": cartItem.price * cartItem.quantity }
                }
            );

            // If the item doesn't exist in the cart, push it as a new item
            if (!result) {
                await User.findByIdAndUpdate(
                    userId, 
                    { 
                        $push: { "cart.items": cartItem }, 
                        $inc: { "cart.totalAmount": cartItem.price * cartItem.quantity } 
                    }
                );
            }
        }

    } catch (error) {
        console.error('Error adding to cart:', error);
    } finally {
        // Disconnect from the database
        await mongoose.disconnect();
    }
}

module.exports = { addToCart };
