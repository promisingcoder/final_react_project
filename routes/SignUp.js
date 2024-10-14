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
        email
    })
    if (userExists){
        throw new Error("user already exists")
    }
    if (userExists){
        throw new Error("email already exists")
    }
    if(!userExists && !emailExists){
    const user = new User({ username, password: hashedPassword });
    }

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
    }
    });
module.exports = router