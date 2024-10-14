const express = require('express');
const router = express.Router();
const User = require('UserSchema');
const bcrypt = require('bcrypt');
router.post('/register', async (err,req, res) => {
    try {
    const { username, password ,email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    userExists = User.findOne({
        username
    })
    emailExists = User.findOne({
        
    })
    if(!userExists && !emailExists){
    const user = new User({ username, password: hashedPassword });
    }
    else{
        throw new Error("User already exists")
    }
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
    }
    });
module.exports = router