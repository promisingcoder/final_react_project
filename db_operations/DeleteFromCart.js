const mongoose = require('mongoose');
const { User } = require('../models/UserSchema');

async function DeleteFromCart(userId, productID, quantity) {
    try {
      
        const user = await User.findOne({ _id: userId });
        if (!user) {
            throw new Error('User not found');
        }
        
      
        const cartItemIndex = user.cart.items.findIndex(item => item.productID.toString() === productID);
        
        if (cartItemIndex !== -1) {
            const cartItem = user.cart.items[cartItemIndex];

            if (quantity <= 0) {
                throw new Error('Invalid quantity');
            }

            if (cartItem.quantity <= quantity) {
                user.cart.items.splice(cartItemIndex, 1);
            } else {
                cartItem.quantity -= quantity;
            }
        } else {
            throw new Error('Item not found in cart');
        }

        await user.save();
        return user.cart; 
    } catch (error) {
        console.error(`Error in DeleteFromCart: ${error.message}`);
        throw error; 
    }
}

module.exports = DeleteFromCart;
