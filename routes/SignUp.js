const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const userSchemaFields = {
    userID: { required: false },
    userName: { required: true },
    name: {
      firstName: { required: true },
      lastName: { required: true }
    },
    email: { required: true },
    passwordHash: { required: true },
    role: { required: false },
    createdAt: { required: false },
    updatedAt: { required: false },
    contactInfo: {
      phoneNumber: { required: true },
      address: {
        street: { required: true },
        city: { required: true },
        state: { required: true },
        postalCode: { required: true },
        country: { required: true }
      }
    },
    cart: {
      items: [
        {
          productID: { required: true },
          quantity: { required: true }
        }
      ],
      totalAmount: { required: false }
    }
  };

router.post('/register', async (req, res) => {
    for(item of userSchemaFields){
        if (Object.keys(req.body).indexOf(item) > -1) {
            

         }
        else{
            if (userSchemaFields.item.required == true){
                throw new Error("item is required")
            }
        }

    }
    const hashedPassword = await bcrypt.hash(password, 10);
    userExists = !User.findOne({
        username
    })
    emailExists = !User.findOne({
        email
    }) 
    
    if (userExists && emailExists){
        throw new Error("user and email  already exist")
    }
    if (userExists){
        throw new Error("user already exists")
    }
    if (emailExists){
        throw new Error("email already exists")
    }
    if(!userExists && !emailExists){
    const user = new User({ username, password: hashedPassword });
    await user.save();
    }
    
    } );
module.exports = router