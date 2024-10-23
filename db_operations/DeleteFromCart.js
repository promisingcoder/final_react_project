const mongoose = require('mongoose');
const { User } = require('../models/UserSchema');

async function DeleteFromCart(userId, productID, quantity) {
    try {
        // Find the user by ID
        const user = await User.findOne({ _id: userId });
        if (!user) {
            throw new Error('User not found');
        }
        
        // Find the item in the cart
        const cartItemIndex = user.cart.items.findIndex(item => item.productID.toString() === productID);
        
        if (cartItemIndex !== -1) {
            const cartItem = user.cart.items[cartItemIndex];

            // Validate the quantity to be removed
            if (quantity <= 0) {
                throw new Error('Invalid quantity');
            }

            if (cartItem.quantity <= quantity) {
                // If the quantity to remove is equal to or greater than the item's quantity, remove it from the cart
                user.cart.items.splice(cartItemIndex, 1);
            } else {
                // If more than the specified quantity, decrement the quantity
                cartItem.quantity -= quantity;
            }
        } else {
            throw new Error('Item not found in cart');
        }

        // Save the updated user document
        await user.save();
        return user.cart; // Return the updated cart
    } catch (error) {
        console.error(`Error in DeleteFromCart: ${error.message}`);
        throw error; // Rethrow the error for further handling
    }
}

module.exports = DeleteFromCart;
