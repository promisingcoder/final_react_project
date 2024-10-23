const mongoose = require('mongoose');
const { User } = require('../models/UserSchema');
const Product = require("../models/ProductSchema");

async function addToCart(userId, productID, quantity, totalAmount) {
    console.log(`addToCart called with userId: ${userId}, productID: ${productID}, quantity: ${quantity}, totalAmount: ${totalAmount}`);

    const user = await User.findOne({ _id: userId });
    console.log(`User found: ${user ? 'Yes' : 'No'}`);

    // If user is not found, return early
    if (!user) {
        console.log(`No user found with id: ${userId}`);
        return null; // Or handle the error as needed
    }

    // Find the item in the cart
    const cartItem = user.cart.items.find(item => item.productID.toString() === productID.toString());
    console.log(`Cart item found: ${cartItem ? JSON.stringify(cartItem) : 'No'}`);

    if (cartItem) {
        // If the product exists, increment the quantity
        console.log(`Incrementing quantity of productID: ${productID} from ${cartItem.quantity} by ${quantity}`);
        cartItem.quantity += quantity; // Increment quantity
    } else {
        // If the product does not exist, add it to the cart
        console.log(`Adding new item to cart: productID: ${productID}, quantity: ${quantity}, totalAmount: ${totalAmount}`);
        user.cart.items.push({ productID: productID, quantity: quantity, totalAmount: totalAmount });
    }

    // Save the updated user document
    await user.save();
    console.log(`Cart updated successfully. New cart: ${JSON.stringify(user.cart)}`);

    return user.cart;
}

module.exports = { addToCart };
