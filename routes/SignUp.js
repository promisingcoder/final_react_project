const express = require('express');
const router = express.Router();
const {User} = require('../models/UserSchema');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            let errors = [];
            if (!username) errors.push("username is required");
            if (!email) errors.push("email is required");
            if (!password) errors.push("password is required");
    
            return res.status(400).json({ message: "Required fields:", errors });
        }
    
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists." });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        delete req.body["password"];
        const user = new User({ ...req.body, passwordHash: hashedPassword });
    
        await user.save();
    
        res.status(200).json({ message: "Registered successfully!" });
    
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Duplicate field value exists.", error: error.keyValue });
        }
    
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
    
}
    
     )
module.exports = router