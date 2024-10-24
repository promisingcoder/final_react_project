const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
});

const cartItemSchema = new Schema({
    productID: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
});

const userSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, auto: true },
    username: { type: String, unique: true, required: true },
    name: {
        firstName: { type: String }, 
        lastName: { type: String }    
    },
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

    contactInfo: {
        phoneNumber: { type: String }, 
        address: addressSchema        
    },

    cart: {
        items: [cartItemSchema],      
        totalAmount: { type: Number, default: 0 }
    }
}, { collection: "users" });


const User = mongoose.model('User', userSchema);
const Address = mongoose.model("Address",addressSchema)
const CartItem = mongoose.model("CartItem",cartItemSchema)
module.exports = {User,Address,CartItem};
