const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
});

const cartItemSchema = new Schema({
    productID: { tnype: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
});

const userSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, auto: true },
    userName : {type:String,required : true},
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
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
        phoneNumber: { type: String, required: true },
        address: addressSchema
    },

    cart: {
        items: [cartItemSchema],
        totalAmount: { type: Number, default: 0 }
    }
},{collection  : "users"});

const User = mongoose.model('User', userSchema);

module.exports = User;
