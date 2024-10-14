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
    let items = {}
    for(item in userSchemaFields){
        if (Object.keys(req.body).indexOf(item) > -1) {
            items[item] = req.body[item]

         }
        else{
            
            if (userSchemaFields[item].required == true){
                throw new Error("item is required")
            }
        }

    }
    
    
    const user = new User({...items , passwordHash  : await bcrypt.hash(password, 10)});
    await user.save();
    
    } );
module.exports = router