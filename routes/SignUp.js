const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema');
const bcrypt = require('bcrypt');
router.post('/register', async (req, res) => {
    console.log(req)
    const { username, password ,email } =  req.body;
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
    }
    await user.save();
    } );
module.exports = router