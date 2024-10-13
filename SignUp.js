const express = require('express');
const router = express.Router();
const User = require('UserSchema');
const bcrypt = require('bcrypt');
router.post('/register', async (req, res) => {
    try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
    }
    });
module.exports = router