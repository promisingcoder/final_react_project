const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

router.post('/login', async (req, res) => {
    const secret_key = process.env.secret_key
    
    const { username, password } = req.body;
    conn =  process.env.conn_string
    await mongoose.connect(conn)
    const user = await User.findOne({ username });
    if (!user) {
        console.log("entered one")
    return res.status(401).json({ error: 'Authentication failed' });
    }
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
        console.log("entered two")
    return res.status(401).json({ error: 'Authentication failed' });
    }
    const token = jwt.sign({ userId: user._id }, secret_key, {
    expiresIn: '1h',
    });
    res.status(200).json({ token });
    
    res.status(500).json({ error: 'Login failed' });
    
    });
module.exports = router