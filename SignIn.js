const express = require('express');
const router = express.Router();
const User = require('UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
router.post('/login', async (req, res) => {
    const secret_key = process.env.secret_key
    try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
    return res.status(401).json({ error: 'Authentication failed' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
    return res.status(401).json({ error: 'Authentication failed' });
    }
    const token = jwt.sign({ userId: user._id }, secret_key, {
    expiresIn: '1h',
    });
    res.status(200).json({ token });
    } catch (error) {
    res.status(500).json({ error: 'Login failed' });
    }
    });
module.exports = router