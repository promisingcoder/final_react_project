const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const {mongoose}  =  require("mongoose")
const userSchemaFields = {
    userID: { required: false },
    username: { required: true },
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
        if (Object.keys(req.body).indexOf(item) > -1)  {
            items[item] = req.body[item]
         }
        
        else{
            
            if (userSchemaFields[item].required == true && item != "passwordHash"){
                throw new Error(`${item} is required`)
            }
        }

    }
    console.log(Object.keys(req.body))
    if (Object.keys(req.body).filter((item) => item == "password")){
       
        items.password = req.body["password"]
        items["passwordHash"] =  await bcrypt.hash(items.password, 10)
        conn =  process.env.conn_string
        console.log(items)
        await mongoose.connect(conn)
        res.json({"res" : "worked"})
        const user = new User({...items});
        await user.save();
    }
    
    
    } )
module.exports = router